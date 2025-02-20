const express = require("express");
const { getProperties, addProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.post("/", addProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
