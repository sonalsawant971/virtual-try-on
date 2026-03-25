console.log("THIS IS THE ACTIVE SERVER FILE");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import pool from "./config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

/* ==========================
   HEALTH CHECK
========================== */
app.get("/", (req, res) => {
  res.json({ status: "JS backend running" });
});

/* ==========================
   DATABASE TEST
========================== */
app.get("/test-db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ message: "Database connected successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   USER REGISTRATION
========================== */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email already exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

/* ==========================
   USER LOGIN
========================== */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

/* ==========================
   AI SUGGESTIONS (UNCHANGED)
========================== */
app.post("/ai-suggestions", async (req, res) => {
  const {
    productName = "this outfit",
    category = "clothing",
    material = "fabric",
    color = "neutral",
  } = req.body || {};

  const fallback = {
    fit: "The fit looks balanced on you.",
    style: "The style feels clean and modern.",
    occasion: "Suitable for everyday wear.",
    recommendedColors: ["Black", "Navy", "Grey"],
  };

  if (!process.env.GROQ_API_KEY) {
    return res.json(fallback);
  }

  const prompt = `
You are a professional fashion stylist.

Clothing details:
Name: ${productName}
Category: ${category}
Material: ${material}
Color: ${color}

Respond in EXACTLY this format:

Fit: <one short sentence>
Style: <one short sentence>
Occasion: <one short sentence>
Suggestions: <three colors, comma separated>
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const lines = completion.choices[0].message.content
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    const fit = lines[0]?.replace("Fit:", "").trim() || fallback.fit;
    const style = lines[1]?.replace("Style:", "").trim() || fallback.style;
    const occasion = lines[2]?.replace("Occasion:", "").trim() || fallback.occasion;

    const colorsRaw =
      lines[3]?.replace("Suggestions:", "").trim() || "";

    const recommendedColors =
      colorsRaw
        ? colorsRaw.split(",").map(c => c.trim())
        : fallback.recommendedColors;

    res.json({
      fit,
      style,
      occasion,
      recommendedColors,
    });
  } catch (err) {
    console.error("AI error:", err.message);
    res.json(fallback);
  }
});

/* ==========================
   ADD TO CART
========================== */
app.post("/api/cart/add", async (req, res) => {
  try {
    const { userId, productId, price } = req.body;

    if (!userId || !productId || !price) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const [existing] = await pool.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [userId, productId, 1, price]
      );
    }

    res.json({ message: "Product added to cart" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

/* ==========================
   GET CART ITEMS
========================== */
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await pool.query(
      "SELECT * FROM cart WHERE user_id = ?",
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ==========================
   START SERVER
========================== */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});