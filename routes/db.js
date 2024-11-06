const express = require("express");
const { addClient, getClient, deleteClient } = require("../controllers/db");
const router = express.Router();

// POST: Add a new item
router.post("/addclient", addClient);

// GET: Retrieve all items
router.get("/getclient", getClient);

// DELETE: Delete an item by ID
router.delete("/deleteclient/:id", deleteClient);


module.exports = router;
