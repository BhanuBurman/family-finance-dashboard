const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.registerUser = (req, res) => {
    const { name, email, password, role } = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role || "family_member"], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "User registered successfully" });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
};
