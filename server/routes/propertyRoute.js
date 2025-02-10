const express = require("express");
const router = express.Router();
const {
  createProperty,
  getProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

router.post("/create", createProperty);
router.get("/fetch", getAllProperties);
router.get("/fetch/:id", getProperty);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);

module.exports = router;
