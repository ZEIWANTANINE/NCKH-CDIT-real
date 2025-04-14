const express = require("express");
const { getTopics,addTopic,updateTopic,deleteTopic} = require("../controllers/topiccontroller");
const { getUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/topics", authMiddleware, getTopics);
router.post("/topics", authMiddleware, addTopic);
router.put("/topics/:sMaDeTai", authMiddleware, updateTopic);
router.delete("/topics/:sMaDeTai", authMiddleware, deleteTopic);
module.exports = router;