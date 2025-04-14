const {prisma} = require("../config/db");

exports.getTaiLieu = async (req, res) => {
    try {
      const taiLieu = await prisma.taiLieu.findMany();
      res.json(taiLieu);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tài liệu:", error.message);
      res.status(500).json({ error: "Không thể lấy danh sách tài liệu" });
    }
  };
  exports.addTaiLieu = async (req, res) => {
    try {
      const {
        sMaLoaiTaiLieu,
        sTenTaiLieu,
        sTenTacGia,
        dNgayXuatBan,
        sLinhVuc,
        sMaDeTai,
        sMaLoaiDeTai,
      } = req.body;
  
      const newTaiLieu = await prisma.taiLieu.create({
        data: {
          sMaLoaiTaiLieu,
          sTenTaiLieu,
          sTenTacGia,
          dNgayXuatBan: new Date(dNgayXuatBan),
          sLinhVuc,
          sMaDeTai,
          sMaLoaiDeTai,
        },
      });
  
      res.json({ message: "Thêm tài liệu thành công!", taiLieu: newTaiLieu });
    } catch (error) {
      console.error("Lỗi khi thêm tài liệu:", error.message);
      res.status(500).json({ error: "Không thể thêm tài liệu" });
    }
  };
  exports.updateTaiLieu = async (req, res) => {
    try {
      const { sMaLoaiTaiLieu } = req.params;
      const {
        sTenTaiLieu,
        sTenTacGia,
        dNgayXuatBan,
        sLinhVuc,
        sMaDeTai,
        sMaLoaiDeTai,
      } = req.body;
  
      const updatedTaiLieu = await prisma.taiLieu.update({
        where: { sMaLoaiTaiLieu },
        data: {
          sTenTaiLieu,
          sTenTacGia,
          dNgayXuatBan: dNgayXuatBan ? new Date(dNgayXuatBan) : undefined,
          sLinhVuc,
          sMaDeTai,
          sMaLoaiDeTai,
        },
      });
  
      res.json({ message: "Cập nhật tài liệu thành công!", taiLieu: updatedTaiLieu });
    } catch (error) {
      console.error("Lỗi khi cập nhật tài liệu:", error.message);
      res.status(500).json({ error: "Không thể cập nhật tài liệu" });
    }
  };
  exports.deleteTaiLieu = async (req, res) => {
    try {
      const { sMaLoaiTaiLieu } = req.params;
  
      await prisma.taiLieu.delete({
        where: { sMaLoaiTaiLieu },
      });
  
      res.json({ message: "Xóa tài liệu thành công!" });
    } catch (error) {
      console.error("Lỗi khi xóa tài liệu:", error.message);
      res.status(500).json({ error: "Không thể xóa tài liệu" });
    }
  };