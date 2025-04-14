const express = require("express");
const {getSuKien,addSuKien,updateSuKien,deleteSuKien} = require("../controllers/sukienController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Hiển thị tất cả sự kiện
router.get("/sukien", authMiddleware, getSuKien);

// Thêm sự kiện
router.post("/addSuKien", authMiddleware, addSuKien);

// Sửa sự kiện
router.put("/updateSuKien/:sMaSuKien", authMiddleware, updateSuKien);

// Xóa sự kiện
router.delete("/deleteSuKien/:sMaSuKien", authMiddleware, deleteSuKien);

module.exports = router;