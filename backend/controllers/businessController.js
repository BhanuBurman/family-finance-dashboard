const db = require("../config/db");

exports.getBusinesses = (req, res) => {
    db.query("SELECT * FROM businesses WHERE user_id = ?", [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addBusiness = (req, res) => {
    const { name, industry, revenue } = req.body;
    const sql = "INSERT INTO businesses (user_id, name, industry, revenue) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.user.id, name, industry, revenue], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Business added successfully" });
    });
};

exports.updateBusiness = (req, res) => {
    const { name, industry, revenue } = req.body;
    const sql = "UPDATE businesses SET name=?, industry=?, revenue=? WHERE id=? AND user_id=?";
    db.query(sql, [name, industry, revenue, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Business updated successfully" });
    });
};

exports.deleteBusiness = (req, res) => {
    const sql = "DELETE FROM businesses WHERE id=? AND user_id=?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Business deleted successfully" });
    });
};
