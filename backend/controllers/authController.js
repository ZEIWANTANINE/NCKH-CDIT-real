const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma }  = require("../config/db");
const { v4: uuidv4 } = require("uuid");
exports.register = async (req, res) => {
  try {
    const { email, password, role, additionalInfo } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Thiếu thông tin email, password hoặc role" });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được sử dụng!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const jwtSecret = uuidv4();
    console.log("jwtSecret khi đăng ký:", jwtSecret);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, role, jwtSecret },
    });
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      jwtSecret,
      { expiresIn: "1d" }
    );
    res.json({ message: "Đăng ký thành công!", userId: newUser.id,token });
    console.log("New User ID:", newUser.id);
    // Thêm thông tin bổ sung vào bảng tương ứng
    if (role === "TEACHER" && additionalInfo) {
      await prisma.teacher.create({
        data: { userId: newUser.id, ...additionalInfo },
      });
    } else if (role === "RESEARCHER" && additionalInfo) {
      await prisma.researcher.create({
        data: { userId: newUser.id, ...additionalInfo },
      });
    } 
console.log("Additional Info:", additionalInfo);
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ error: "Lỗi đăng ký tài khoản!" });
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Thiếu thông tin email hoặc password!" });
      }
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(400).json({ error: "Tài khoản không tồn tại!" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu!" });
  
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        user.jwtSecret,
        { expiresIn: "1d" }
      );
      let hasDetails = false;
    if (user.role === "TEACHER") {
      const teacher = await prisma.teacher.findUnique({ where: { userId: user.id } });
      hasDetails = !!teacher;
    } else if (user.role === "RESEARCHER") {
      const researcher = await prisma.researcher.findUnique({ where: { userId: user.id } });
      hasDetails = !!researcher;
    }
      res.json({ token, role: user.role });
      console.log('Đăng nhập thành công!');
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ error: "Lỗi đăng nhập!" });
    }
  };
  exports.addTeacherInfo = async (req, res) => {
    try {
      const { sTenGiangVien, sKhoa, sChucVu, sMaTrinhDoHocVan, sDonVi, sGioiTinh, sQuyenHan } = req.body;
      const userId = req.user.id;
      // Kiểm tra xem user có tồn tại và có role là TEACHER không
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || user.role !== "TEACHER") {
        return res.status(400).json({ error: "Người dùng không hợp lệ hoặc không phải TEACHER" });
      }
      // Thêm thông tin vào bảng Teacher
      const teacher = await prisma.teacher.create({
        data: {
          userId,
          sTenGiangVien,
          sKhoa,
          sChucVu,
          sMaTrinhDoHocVan,
          sDonVi,
          sGioiTinh,
          sQuyenHan,
        },
      });
  
      res.json({ message: "Thêm thông tin TEACHER thành công!", teacher });
    } catch (error) {
      console.error("Lỗi thêm thông tin TEACHER:", error);
      res.status(500).json({ error: "Lỗi thêm thông tin TEACHER!" });
    }
  };
  exports.addResearcherInfo = async (req, res) => {
    try {
      const {sTenNhaNghienCuu, sDonViCongTac, sMaTrinhDoHocVan, sChucVu, sGioiTinh, sQuyenHan } = req.body;
      const userId = req.user.id;
      console.log("User ID từ middleware:", userId);
    console.log("Dữ liệu nhận được từ frontend:", req.body);
      // Kiểm tra xem user có tồn tại và có role là RESEARCHER không
      const user = await prisma.user.findUnique({ where: { id: userId } });
      console.log("Thông tin người dùng từ database:", user);
      if (!user || user.role !== "RESEARCHER") {
        return res.status(400).json({ error: "Người dùng không hợp lệ hoặc không phải RESEARCHER" });
      }
  
      // Thêm thông tin vào bảng Researcher
      const researcher = await prisma.researcher.create({
        data: {
          userId,
          sTenNhaNghienCuu,
          sDonViCongTac,
          sMaTrinhDoHocVan,
          sChucVu,
          sGioiTinh,
          sQuyenHan,
        },
      });
      const newToken = jwt.sign(
        { userId: user.id, role: user.role },
        user.jwtSecret,
        { expiresIn: "1d" }
      );
      res.json({ message: "Thêm thông tin RESEARCHER thành công!", researcher,token:newToken });
    } catch (error) {
      console.error("Lỗi thêm thông tin RESEARCHER:", error);
      res.status(500).json({ error: "Lỗi thêm thông tin RESEARCHER!" });
    }
  };
  exports.getUserInfo = async (req, res) => {
    try {
      const userId = req.user.id; // Lấy userId từ middleware
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      res.status(500).json({ error: "Không thể lấy thông tin người dùng" });
    }
  };