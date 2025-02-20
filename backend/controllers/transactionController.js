const db = require("../config/db");

exports.getTransactions = (req, res) => {
    db.query("SELECT * FROM transactions WHERE user_id = ?", [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addTransaction = (req, res) => {
    const { category, amount, description } = req.body;
    const sql = "INSERT INTO transactions (user_id, category, amount, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.user.id, category, amount, description], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Transaction added successfully" });
    });
};

exports.updateTransaction = (req, res) => {
    const { category, amount, description } = req.body;
    const sql = "UPDATE transactions SET category=?, amount=?, description=? WHERE id=? AND user_id=?";
    db.query(sql, [category, amount, description, req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Transaction updated successfully" });
    });
};

exports.deleteTransaction = (req, res) => {
    const sql = "DELETE FROM transactions WHERE id=? AND user_id=?";
    db.query(sql, [req.params.id, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Transaction deleted successfully" });
    });
};
