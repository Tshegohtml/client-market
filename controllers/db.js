// /backend/controllers/db.js
const { collection, addDoc, getDocs, deleteDoc, doc } = require("firebase/firestore");
const { db } = require('../config/firebase'); // Import Firestore db

// POST: Add a new item
const addClient = async (req, res) => {
    const { title, price, size, color } = req.body;

    if (!title || !price || !size || !color) {
        return res.status(400).json({ message: "All fields (title, price, size, color) are required." });
    }

    try {
        const docRef = await addDoc(collection(db, "items"), { title, price, size, color });
        res.json({ message: "Item added successfully", docId: docRef.id });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: `Error adding item: ${error.message}` });
    }
};

// GET: Retrieve all items
const getClient = async (req, res) => {
    try {
        const itemCollection = collection(db, "items");
        const snapshot = await getDocs(itemCollection);

        if (snapshot.empty) {
            return res.status(404).json({ message: "No items found." });
        }

        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json(items);
    } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).json({ message: `Error retrieving items: ${error.message}` });
    }
};

// DELETE: Delete an item by ID
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteDoc(doc(db, "items", id));
        res.json({ message: `Item with ID ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: `Error deleting item: ${error.message}` });
    }
};

module.exports = {
    addClient,
    getClient,
    deleteClient,
};
