const {prisma} = require("../config/db");

exports.getSuKien = async (req, res) => {
    try {
      const suKien = await prisma.suKien.findMany();
      res.json(suKien);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sự kiện:", error.message);
      res.status(500).json({ error: "Không thể lấy danh sách sự kiện" });
    }
  };
  exports.addSuKien = async (req, res) => {
    try {
      const {
        sMaSuKien,
        sTenSuKien,
        dThoiGian,
        sDiaDiem,
        sNoiDung,
        sTenDienGia,
        sKinhPhi,
        sMaLoaiSuKien,
        sMaLoaiToChuc,
      } = req.body;
  
      const newSuKien = await prisma.suKien.create({
        data: {
          sMaSuKien,
          sTenSuKien,
          dThoiGian: new Date(dThoiGian),
          sDiaDiem,
          sNoiDung,
          sTenDienGia,
          sKinhPhi,
          sMaLoaiSuKien,
          sMaLoaiToChuc,
        },
      });
  
      res.json({ message: "Thêm sự kiện thành công!", suKien: newSuKien });
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error.message);
      res.status(500).json({ error: "Không thể thêm sự kiện" });
    }
  };
  exports.updateSuKien = async (req, res) => {
    try {
      const { sMaSuKien } = req.params;
      const {
        sTenSuKien,
        dThoiGian,
        sDiaDiem,
        sNoiDung,
        sTenDienGia,
        sKinhPhi,
        sMaLoaiSuKien,
        sMaLoaiToChuc,
      } = req.body;
  
      const updatedSuKien = await prisma.suKien.update({
        where: { sMaSuKien },
        data: {
          sTenSuKien,
          dThoiGian: dThoiGian ? new Date(dThoiGian) : undefined,
          sDiaDiem,
          sNoiDung,
          sTenDienGia,
          sKinhPhi,
          sMaLoaiSuKien,
          sMaLoaiToChuc,
        },
      });
  
      res.json({ message: "Cập nhật sự kiện thành công!", suKien: updatedSuKien });
    } catch (error) {
      console.error("Lỗi khi cập nhật sự kiện:", error.message);
      res.status(500).json({ error: "Không thể cập nhật sự kiện" });
    }
  };
  exports.deleteSuKien = async (req, res) => {
    try {
      const { sMaSuKien } = req.params;
  
      await prisma.suKien.delete({
        where: { sMaSuKien },
      });
  
      res.json({ message: "Xóa sự kiện thành công!" });
    } catch (error) {
      console.error("Lỗi khi xóa sự kiện:", error.message);
      res.status(500).json({ error: "Không thể xóa sự kiện" });
    }
  };