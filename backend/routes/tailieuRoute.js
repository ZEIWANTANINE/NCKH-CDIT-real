const express = require("express");
const {
  getTaiLieu,
  addTaiLieu,
  updateTaiLieu,
  deleteTaiLieu,
} = require("../controllers/tailieuController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Hiển thị danh sách tài liệu
router.get("/tailieu", authMiddleware, getTaiLieu);

// Thêm tài liệu
router.post("/addTaiLieu", authMiddleware, addTaiLieu);

// Sửa tài liệu
router.put("/updateTaiLieu/:sMaLoaiTaiLieu", authMiddleware, updateTaiLieu);

// Xóa tài liệu
router.delete("/deleteTaiLieu/:sMaLoaiTaiLieu", authMiddleware, deleteTaiLieu);

module.exports = router;