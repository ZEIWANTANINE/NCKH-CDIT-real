const {prisma} = require("../config/db");

exports.getTopics = async (req, res) => {
    try {
      console.log("Đang kết nối đến cơ sở dữ liệu...");
  
      const { page = 1, limit = 10 } = req.query; // Lấy `page` và `limit` từ query params
      const offset = (page - 1) * limit;
  
      // Lấy danh sách người dùng từ cơ sở dữ liệu
      const deTai = await prisma.deTai.findMany({
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
      const totalTopic = await prisma.deTai.count();
  
      console.log("Danh sách người dùng:", deTai);
  
      res.json({
        deTai,
        totalPages: Math.ceil(totalTopic / limit),
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error.message);
      console.error("Chi tiết lỗi:", error);
      res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
    }
  };
  exports.addTopic = async (req, res) => {
    try {
      const {
        sMaDeTai,
        sTenDeTai,
        sLinhVuc,
        sMaLoaiDeTai,
        sMaNhaNghienCuu,
        sTrangThai,
        sMoTa,
        dNgayBatDau,
        dNgayKetThuc,
        sLoaiToChuc,
      } = req.body;
  
      // Kiểm tra dữ liệu đầu vào
      if (
        !sMaDeTai ||
        !sTenDeTai ||
        !sLinhVuc ||
        !sMaLoaiDeTai ||
        !sMaNhaNghienCuu ||
        !sTrangThai ||
        !dNgayBatDau ||
        !dNgayKetThuc ||
        !sLoaiToChuc
      ) {
        return res.status(400).json({ error: "Thiếu thông tin cần thiết để thêm đề tài" });
      }
  
      // Thêm đề tài vào cơ sở dữ liệu
      const newTopic = await prisma.deTai.create({
        data: {
          sMaDeTai,
          sTenDeTai,
          sLinhVuc,
          sMaLoaiDeTai,
          sMaNhaNghienCuu,
          sTrangThai,
          sMoTa,
          dNgayBatDau: new Date(dNgayBatDau),
          dNgayKetThuc: new Date(dNgayKetThuc),
          sLoaiToChuc,
        },
      });
  
      res.json({ message: "Thêm đề tài thành công!", topic: newTopic });
    } catch (error) {
      console.error("Lỗi khi thêm đề tài:", error.message);
      res.status(500).json({ error: "Lỗi khi thêm đề tài" });
    }
  };
  exports.updateTopic = async (req, res) => {
    try {
      const { sMaDeTai } = req.params; // Lấy mã đề tài từ URL
      const {
        sTenDeTai,
        sLinhVuc,
        sMaLoaiDeTai,
        sMaNhaNghienCuu,
        sTrangThai,
        sMoTa,
        dNgayBatDau,
        dNgayKetThuc,
        sLoaiToChuc,
      } = req.body;
  
      // Kiểm tra xem đề tài có tồn tại không
      const existingTopic = await prisma.deTai.findUnique({
        where: { sMaDeTai },
      });
  
      if (!existingTopic) {
        return res.status(404).json({ error: "Đề tài không tồn tại" });
      }
  
      // Cập nhật đề tài
      const updatedTopic = await prisma.deTai.update({
        where: { sMaDeTai },
        data: {
          sTenDeTai,
          sLinhVuc,
          sMaLoaiDeTai,
          sMaNhaNghienCuu,
          sTrangThai,
          sMoTa,
          dNgayBatDau: dNgayBatDau ? new Date(dNgayBatDau) : undefined,
          dNgayKetThuc: dNgayKetThuc ? new Date(dNgayKetThuc) : undefined,
          sLoaiToChuc,
        },
      });
  
      res.json({ message: "Cập nhật đề tài thành công!", topic: updatedTopic });
    } catch (error) {
      console.error("Lỗi khi cập nhật đề tài:", error.message);
      res.status(500).json({ error: "Lỗi khi cập nhật đề tài" });
    }
  };
  exports.deleteTopic = async (req, res) => {
    try {
      const { sMaDeTai } = req.params; // Lấy mã đề tài từ URL
  
      // Kiểm tra xem đề tài có tồn tại không
      const existingTopic = await prisma.deTai.findUnique({
        where: { sMaDeTai },
      });
  
      if (!existingTopic) {
        return res.status(404).json({ error: "Đề tài không tồn tại" });
      }
  
      // Xóa đề tài
      await prisma.deTai.delete({
        where: { sMaDeTai },
      });
  
      res.json({ message: "Xóa đề tài thành công!" });
    } catch (error) {
      console.error("Lỗi khi xóa đề tài:", error.message);
      res.status(500).json({ error: "Lỗi khi xóa đề tài" });
    }
  };