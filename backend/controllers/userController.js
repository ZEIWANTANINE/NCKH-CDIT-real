const {prisma} = require("../config/db");

exports.getUsers = async (req, res) => {
  try {
    console.log("Đang kết nối đến cơ sở dữ liệu...");

    const { page = 1, limit = 10 } = req.query; // Lấy `page` và `limit` từ query params
    const offset = (page - 1) * limit;

    // Lấy danh sách người dùng từ cơ sở dữ liệu
    const users = await prisma.user.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });
    // Đếm tổng số người dùng
    const totalUsers = await prisma.user.count();

    console.log("Danh sách người dùng:", users);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    console.error("Chi tiết lỗi:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
  }
};
exports.getTeachers = async (req, res) => {
  try {
    console.log("Đang kết nối đến cơ sở dữ liệu...");

    const { page = 1, limit = 10 } = req.query; // Lấy `page` và `limit` từ query params
    const offset = (page - 1) * limit;

    // Lấy danh sách người dùng từ cơ sở dữ liệu
    const teachers = await prisma.teacher.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        userId: true,
        sChucVu: true,
        sDonVi: true,
        sGioiTinh: true,
        sKhoa: true,
        sMaTrinhDoHocVan: true,
        sQuyenHan: true,
        sTenGiangVien: true,
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    // Đếm tổng số người dùng
    const totalTeachers = await prisma.teacher.count();

    console.log("Danh sách giảng viên:", teachers);

    res.json({
      teachers,
      totalPages: Math.ceil(totalTeachers / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    console.error("Chi tiết lỗi:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
  }
};
exports.getResearchers = async (req, res) => {
  try {
    console.log("Đang kết nối đến cơ sở dữ liệu...");

    const { page = 1, limit = 10 } = req.query; // Lấy `page` và `limit` từ query params
    const offset = (page - 1) * limit;

    // Lấy danh sách người dùng từ cơ sở dữ liệu
    const researcher = await prisma.researcher.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        userId: true,
        sChucVu: true,
        sDonViCongTac: true,
        sGioiTinh: true,
        sMaTrinhDoHocVan: true,
        sQuyenHan: true,
        sTenNhaNghienCuu: true,
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    // Đếm tổng số người dùng
    const totalResearchers = await prisma.researcher.count();

    console.log("Danh sách nhà nghiên cứu:", researcher);

    res.json({
      researcher,
      totalPages: Math.ceil(totalResearchers / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    console.error("Chi tiết lỗi:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
  }
};
exports.getStudents = async (req, res) => {
  try {
    console.log("Đang kết nối đến cơ sở dữ liệu...");

    const { page = 1, limit = 10 } = req.query; // Lấy `page` và `limit` từ query params
    const offset = (page - 1) * limit;

    // Lấy danh sách người dùng từ cơ sở dữ liệu
    const sinhVien = await prisma.sinhVien.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        sMaSinhVien: true,
        sTenSinhVien: true,
        sGioiTinh: true,
        sEmail: true,
        sNganhHoc: true,
        sNienKhoa: true,
        sMaTrinhDoHocVan: true,
        sQuyenHan: true,
        
      },
    });

    // Đếm tổng số người dùng
    const totalSinhViens = await prisma.sinhVien.count();

    console.log("Danh sách nhà nghiên cứu:", sinhVien);

    res.json({
      sinhVien,
      totalPages: Math.ceil(totalSinhViens / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    console.error("Chi tiết lỗi:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
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
    console.error("Lỗi khi lấy thông tin người dùng:", error.message);
    res.status(500).json({ error: "Không thể lấy thông tin người dùng" });
  }
};