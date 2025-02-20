const express = require("express");
const { getBusinesses, addBusiness, updateBusiness, deleteBusiness } = require("../controllers/businessController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getBusinesses);
router.post("/", verifyToken, addBusiness);
router.put("/:id", verifyToken, updateBusiness);
router.delete("/:id", verifyToken, deleteBusiness);

module.exports = router;
