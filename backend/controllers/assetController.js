const db = require("../config/db");

exports.getAssets = (req, res) => {
    db.query("SELECT * FROM assets WHERE user_id = ?", [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addAsset = (req, res) => {
    const { type, value, description } = req.body;
    const sql = "INSERT INTO assets (user_id, type, value, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.user.id, type, value, description], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Asset added successfully" });
    });
};

exports.updateAsset = (req, res) => {
    const { type, value, description } = req.body;
    const sql = "UPDATE assets SET type=?, value=?, description=? WHERE id=? AND user_id=?";
    db.query(sql, [type, value, description, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Asset updated successfully" });
    });
};

exports.deleteAsset = (req, res) => {
    const sql = "DELETE FROM assets WHERE id=? AND user_id=?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Asset deleted successfully" });
    });
};
