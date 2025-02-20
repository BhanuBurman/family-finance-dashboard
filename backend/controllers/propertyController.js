const db = require("../config/db");

exports.getProperties = (req, res) => {
    db.query("SELECT * FROM properties WHERE user_id = ?", [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addProperty = (req, res) => {
    const { name, location, value } = req.body;
    const sql = "INSERT INTO properties (user_id, name, location, value) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.user.id, name, location, value], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Property added successfully" });
    });
};

exports.updateProperty = (req, res) => {
    const { name, location, value } = req.body;
    const sql = "UPDATE properties SET name=?, location=?, value=? WHERE id=? AND user_id=?";
    db.query(sql, [name, location, value, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Property updated successfully" });
    });
};

exports.deleteProperty = (req, res) => {
    const sql = "DELETE FROM properties WHERE id=? AND user_id=?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Property deleted successfully" });
    });
};
