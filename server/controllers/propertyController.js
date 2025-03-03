const propertyModel = require("../models/propertryModel");

const createProperty = async (req, res) => {
  try {
    const newProperty = new propertyModel(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await propertyModel.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await propertyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await propertyModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.json(deletedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProperty,
  getProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
};
