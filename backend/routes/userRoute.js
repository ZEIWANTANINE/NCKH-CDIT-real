const express = require("express");
const { getUsers, getTeachers,getResearchers,getStudents,getUserInfo } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.get("/teachers", authMiddleware, getTeachers);
router.get("/researchers", authMiddleware, getResearchers);
router.get("/students", authMiddleware, getStudents);
router.get("/user-info", authMiddleware, getUserInfo);

module.exports = router;
