// routes/passcode.js
const router = require("express").Router();
const Passcode = require("../models/passcode");

// ---------------- CREATE PASSCODE ----------------
router.post("/", async (req, res) => {
  try {
    const { email, phone, code } = req.body;
    const newPasscode = new Passcode({ email, phone, code });
    const savedPasscode = await newPasscode.save();
    res.json(savedPasscode);
  } catch (err) {
    res.status(500).json({ error: "Failed to create passcode", details: err });
  }
});

// ---------------- GET ALL PASSCODES ----------------
router.get("/", async (req, res) => {
  try {
    const passcodes = await Passcode.find();
    res.json(passcodes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch passcodes", details: err });
  }
});

// ---------------- GET SINGLE PASSCODE ----------------
router.get("/:id", async (req, res) => {
  try {
    const passcode = await Passcode.findById(req.params.id);
    if (!passcode) return res.status(404).json({ error: "Passcode not found" });
    res.json(passcode);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch passcode", details: err });
  }
});

// ---------------- UPDATE PASSCODE ----------------
router.put("/:id", async (req, res) => {
  try {
    const updatedPasscode = await Passcode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedPasscode)
      return res.status(404).json({ error: "Passcode not found" });
    res.json(updatedPasscode);
  } catch (err) {
    res.status(500).json({ error: "Failed to update passcode", details: err });
  }
});

// ---------------- DELETE PASSCODE ----------------
router.delete("/:id", async (req, res) => {
  try {
    const deletedPasscode = await Passcode.findByIdAndDelete(req.params.id);
    if (!deletedPasscode)
      return res.status(404).json({ error: "Passcode not found" });
    res.json({ message: "Passcode deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete passcode", details: err });
  }
});

module.exports = router;
