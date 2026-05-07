# 👗 Virtual Try-On — Try Before You Buy, Virtually

> An AI-powered web application that lets users virtually try on clothing from a catalogue by overlaying selected garments onto their uploaded photo, with intelligent style feedback powered by Llama 3.3.

---

## 📖 Project Overview

Shopping for clothes online often leads to uncertainty — *"Will this look good on me?"* Buyers frequently order items that don't match their expectations, leading to returns and dissatisfaction.

**Virtual Try-On** solves this by letting users:
1. Browse a clothing catalogue.
2. Upload their own photo.
3. See the selected clothing overlaid on their photo instantly.
4. Receive AI-generated style feedback — covering fit, style, occasion suitability, and recommended color pairings.

This eliminates guesswork, reduces returns, and provides a personalized shopping experience — all from a browser.

---

## ⚙️ How It Works

### Simple Version (Non-Technical)

1. You open the app and browse through a catalogue of clothes.
2. You pick a clothing item you like.
3. You upload a photo of yourself.
4. The app places the clothing image onto your photo so you can see how it looks.
5. Below the result, an AI assistant gives you style tips — whether the fit suits you, what occasions it's good for, and what colors go well with it.

### Technical Version

1. **Frontend (React + TypeScript + Vite):** The user interface renders a product catalogue from a local data file (`products.ts`). When a user navigates to the Try-On page (`/try-on/:id`), they can upload an image via a file input. The uploaded image is read as a Base64-encoded data URL using the `FileReader` API.

2. **Clothing Overlay:** The selected product image and the user's uploaded photo are processed client-side. The overlay is achieved through **image positioning and compositing logic** — no AI model, no pose estimation, and no body detection is involved in this step.

3. **AI Style Feedback (Groq API — Llama 3.3 70B):** After the try-on result is generated, the frontend sends a non-blocking `POST` request to the backend endpoint `/ai-suggestions` with product metadata (name, category, material, color). The backend constructs a structured prompt and sends it to the **Groq API** running the **Llama 3.3 70B Versatile** model. The model returns style feedback parsed into four fields: Fit, Style, Occasion, and Suggested Colors.

4. **Authentication (MySQL + bcryptjs):** User registration and login are handled through `/api/register` and `/api/login` endpoints. Passwords are hashed using `bcryptjs` before storage. MySQL is used **strictly** for storing user credentials (name, email, hashed password) — no other application data is stored in the database.

5. **Cart System:** Basic add-to-cart and retrieve-cart functionality is handled via `/api/cart/add` and `/api/cart/:userId` endpoints, stored in a MySQL `cart` table.

---

## ✨ Key Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Clothing Catalogue** | Browse a curated list of clothing items with images, categories, sizes, and colors |
| 2 | **Photo Upload** | Upload a personal photo directly from your device (static image — no webcam) |
| 3 | **Virtual Try-On** | See the selected clothing overlaid on your uploaded photo using image positioning logic |
| 4 | **AI Style Feedback** | Receive personalized style tips (fit, style, occasion, color pairings) powered by Llama 3.3 70B |
| 5 | **User Authentication** | Secure signup and login system with bcrypt-hashed passwords stored in MySQL |
| 6 | **Shopping Cart** | Add try-on items to a cart and proceed to a checkout page |
| 7 | **Product Detail Page** | View detailed information about each clothing item before trying it on |
| 8 | **Size Guide** | A dedicated page to help users understand sizing across different products |
| 9 | **Responsive UI** | Modern, mobile-friendly interface built with React and Tailwind CSS |
| 10 | **Fallback Handling** | If the AI API is unavailable, the app serves graceful fallback style suggestions |

---

## 🛠️ Tech Stack

| Technology | Purpose | Why Used |
|------------|---------|----------|
| **React 18** | Frontend UI framework | Component-based architecture for building interactive, reusable UI elements |
| **TypeScript** | Type-safe JavaScript | Catches bugs at compile-time, improves code readability and maintainability |
| **Vite** | Build tool & dev server | Extremely fast hot-module replacement (HMR) for a smooth development experience |
| **Tailwind CSS** | Utility-first CSS framework | Rapid styling with consistent design tokens, responsive by default |
| **React Router v7** | Client-side routing | Enables SPA navigation between pages (catalogue, try-on, cart, auth) without full page reloads |
| **Node.js + Express** | Backend server | Lightweight, fast, and widely-supported runtime for building REST APIs |
| **MySQL** | Relational database | Used **only** for user authentication (login/signup) and cart storage — reliable and well-supported |
| **mysql2** | MySQL driver for Node.js | Promise-based driver with connection pooling for efficient database access |
| **bcryptjs** | Password hashing | Industry-standard hashing algorithm to securely store user passwords |
| **Groq API** | LLM inference platform | Provides ultra-fast inference for the Llama 3.3 70B model used for style feedback |
| **Llama 3.3 70B** | Large Language Model | Generates natural-language style suggestions (fit, occasion, color) — used for text only, not image generation |
| **Axios** | HTTP client | Clean, promise-based HTTP requests from the frontend to the backend |
| **Lucide React** | Icon library | Lightweight, modern SVG icons used throughout the interface |

---

## 📁 Project Folder Structure

```
Virtual-try-on/
├── app-7xi695mybpj5/              # Frontend (React + TypeScript + Vite)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # Header, Footer, PageMeta
│   │   │   ├── products/          # ProductCard component
│   │   │   └── ui/                # Reusable UI components (Button, Card, etc.)
│   │   ├── contexts/              # React context providers
│   │   ├── data/
│   │   │   └── products.ts        # Clothing catalogue data (static)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility libraries
│   │   ├── pages/
│   │   │   ├── Auth.tsx           # Combined auth page
│   │   │   ├── Register.tsx       # User registration
│   │   │   ├── Login.tsx          # User login
│   │   │   ├── Landing.tsx        # Welcome / landing page
│   │   │   ├── Home.tsx           # Main home page
│   │   │   ├── Catalog.tsx        # Product catalogue listing
│   │   │   ├── ProductDetail.tsx  # Individual product details
│   │   │   ├── TryOn.tsx          # ⭐ Core try-on page (upload + overlay + AI feedback)
│   │   │   ├── SizeGuide.tsx      # Size guide reference
│   │   │   ├── Cart.tsx           # Shopping cart
│   │   │   └── Checkout.tsx       # Checkout page
│   │   ├── services/
│   │   │   └── tryOnApi.ts        # Try-on API service (image processing helpers)
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── utils/                 # Utility functions
│   │   ├── App.tsx                # Root application component
│   │   ├── routes.tsx             # Route definitions
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.ts             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   └── tsconfig.json              # TypeScript configuration
│
├── backend/                       # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                  # MySQL connection pool configuration
│   ├── server.js                  # ⭐ Single backend file (all API routes)
│   ├── .env                       # Environment variables (GROQ_API_KEY, PORT)
│   └── package.json               # Backend dependencies
│
└── .gitignore
```

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js** (v18 or above) — [Download](https://nodejs.org/)
- **MySQL** installed and running locally
- **Groq API Key** — [Get one free at groq.com](https://console.groq.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/virtual-try-on.git
cd virtual-try-on
```

### Step 2: Set Up the MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE virtual_tryon;

USE virtual_tryon;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  quantity INT DEFAULT 1,
  price DECIMAL(10,2) NOT NULL
);
```

### Step 3: Configure the Backend

```bash
cd backend
npm install
```

Create or edit the `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Update `config/db.js` if your MySQL credentials are different:

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "virtual_tryon",
});
```

### Step 4: Start the Backend Server

```bash
npm start
```

The backend will run at `http://localhost:5000`.

### Step 5: Set Up and Start the Frontend

Open a **new terminal**:

```bash
cd app-7xi695mybpj5
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` (default Vite port).

### Step 6: Open the App

Visit `http://localhost:5173` in your browser. Register an account, browse the catalogue, select a product, upload your photo, and try it on!

---

## 🔮 Future Scope

| # | Enhancement | Description |
|---|-------------|-------------|
| 1 | **AI-Powered Body Detection** | Integrate pose estimation models (e.g., MediaPipe, OpenPose) to accurately map clothing onto the user's body shape and posture |
| 2 | **Live Webcam Try-On** | Enable real-time virtual try-on using the device camera for an interactive, mirror-like experience |
| 3 | **Multi-Angle Preview** | Allow users to see how clothing looks from front, side, and back views |
| 4 | **Recommendation Engine** | Build a personalized recommendation system based on user preferences, past try-ons, and AI analysis |
| 5 | **Social Sharing** | Let users share their virtual try-on results directly to social media platforms |
| 6 | **E-Commerce Integration** | Connect with real e-commerce platforms (Shopify, WooCommerce) so users can directly purchase items they've tried on |
| 7 | **Payment Gateway** | Integrate Razorpay or Stripe for real payment processing in the checkout flow |
| 8 | **Mobile App** | Build a cross-platform mobile app using React Native for a native try-on experience |

---

## 🎓 Viva Questions & Answers

### 1. What is the main objective of your project?
**Answer:** The main objective is to allow users to virtually try on clothing from a catalogue by uploading their photo. The app overlays the selected clothing onto the user's image and uses AI to provide style feedback — helping users make better purchasing decisions without physically trying on clothes.

### 2. How does the clothing overlay work? Is it AI-based?
**Answer:** No, the clothing overlay is **not AI-based**. It uses simple image positioning and compositing logic on the frontend. The selected clothing image is placed on top of the user's uploaded photo at an appropriate position. No pose estimation, body detection, or AI model is used for the overlay step.

### 3. What role does AI play in your project?
**Answer:** AI is used **only** for generating text-based style feedback. After the try-on result is displayed, the app sends the product's metadata (name, category, material, color) to our backend, which calls the Groq API running the Llama 3.3 70B model. The model returns style suggestions covering fit, style, occasion, and recommended colors. AI is **not** used for generating or manipulating images.

### 4. Which AI model are you using and why?
**Answer:** We use **Llama 3.3 70B Versatile**, hosted on the **Groq API**. We chose this because Groq provides extremely fast inference speeds (tokens per second), the model is open-source and capable of high-quality text generation, and the API is free for development use — making it ideal for a college project.

### 5. Why did you use MySQL, and what is it used for?
**Answer:** MySQL is used **strictly** for user authentication — storing user names, emails, and bcrypt-hashed passwords. It also stores cart data (user ID, product ID, quantity, price). We chose MySQL because it is a reliable, widely-used relational database that's simple to set up for structured data like user accounts.

### 6. How are user passwords stored securely?
**Answer:** Passwords are hashed using the `bcryptjs` library with a salt factor of 10 before being stored in the database. During login, the entered password is compared against the stored hash using `bcrypt.compare()`. We never store passwords in plain text.

### 7. What is the tech stack of your frontend?
**Answer:** The frontend uses **React 18** with **TypeScript**, built using **Vite** as the development server and bundler. Styling is done with **Tailwind CSS**. Routing is handled by **React Router v7**, and the UI uses **Radix UI** components for accessible, reusable interface elements.

### 8. What is Vite, and why did you use it instead of Create React App?
**Answer:** Vite is a modern frontend build tool that provides extremely fast hot module replacement (HMR) during development. Unlike Create React App, which uses Webpack and can be slow for larger projects, Vite uses native ES modules for instant server start and updates. This makes development significantly faster.

### 9. Explain the backend architecture.
**Answer:** The backend is a single `server.js` file built with **Node.js** and **Express**. It has five main responsibilities:
1. Health check endpoint (`GET /`)
2. User registration (`POST /api/register`) with bcrypt hashing
3. User login (`POST /api/login`) with password comparison
4. AI style suggestions (`POST /ai-suggestions`) via Groq API
5. Cart management (`POST /api/cart/add`, `GET /api/cart/:userId`)

It connects to MySQL through a connection pool defined in `config/db.js`.

### 10. Does your app use a webcam or live camera?
**Answer:** No. The app only works with **static uploaded images**. The user selects a photo from their device using a standard file input. There is no webcam access, no live camera feed, and no real-time video processing.

### 11. What happens if the Groq API is down or the API key is missing?
**Answer:** The backend has **fallback handling** built in. If the `GROQ_API_KEY` environment variable is not set, or if the API call fails, the server returns a default set of style suggestions (e.g., "The fit looks balanced on you", recommended colors: Black, Navy, Grey). The app continues to function normally — the try-on result is still displayed.

### 12. How does the frontend communicate with the backend?
**Answer:** The frontend sends HTTP requests to the backend using the `fetch` API. For example, when the try-on result is generated, the frontend sends a `POST` request to `http://localhost:5000/ai-suggestions` with product metadata in the JSON body. The backend processes this, calls the Groq API, parses the response, and returns structured JSON back to the frontend.

### 13. What is the purpose of the `products.ts` file?
**Answer:** The `products.ts` file in `src/data/` contains the static clothing catalogue data. Each product object includes properties like `id`, `name`, `image`, `category`, `material`, `colors`, `sizes`, and `price`. This data is used to render the catalogue, product detail pages, and the try-on page. The data is hardcoded — it is not fetched from a database.

### 14. Can multiple users use the app simultaneously?
**Answer:** Yes. The backend uses a MySQL **connection pool** (configured with a limit of 10 concurrent connections) to handle multiple simultaneous database queries. The Express server handles concurrent HTTP requests asynchronously. Each user's session is independent.

### 15. What is the difference between your app and an AI image generator like DALL·E?
**Answer:** AI image generators like DALL·E create entirely new images from text prompts. Our app does **not** generate new images — it takes the user's existing photo and overlays a catalogue clothing image onto it using positioning logic. The AI in our project (Llama 3.3) only generates **text** (style suggestions), not images. These are fundamentally different approaches.

---

## 🧠 Tough Judge Questions & Answers

### Q1: "Why not just use ChatGPT to generate an outfit image instead of your app?"

**Answer:** This is a great question, and the answer comes down to **purpose and practicality**.

ChatGPT (or DALL·E) generates **entirely fictional images** from text descriptions. If you tell it "show me wearing a blue jacket," it will create an imaginary person in an imaginary jacket. That image has **no connection to your real body, your real proportions, or the actual product** being sold.

Our app does something fundamentally different:
- **Real user photo** — the user uploads their actual photo, so they see themselves, not a generated person.
- **Real product image** — the clothing overlaid is the exact product from the catalogue, not an AI interpretation of it.
- **Style feedback, not image hallucination** — we use AI (Llama 3.3) only for generating text-based style advice. The visual overlay is deterministic — what you see is the actual product on your actual photo.

In a real e-commerce context, a customer doesn't want to see a hallucinated image. They want to see **the exact shirt they're buying** on **their own body**. That's what our app delivers. ChatGPT cannot do this because it has no concept of "this specific product" or "this specific user."

Additionally, using ChatGPT for image generation would require paid API access to DALL·E 3, adds latency, and introduces unpredictability (the generated image may not look like the actual product). Our approach is **faster, cheaper, more accurate, and more practical** for the e-commerce use case.

---

### Q2: "Your overlay is just image positioning — isn't that too simple to call a project?"

**Answer:** The overlay is intentionally simple because the **focus of this project is the complete end-to-end user experience**, not just one algorithm. Consider what the project actually delivers:

1. A full-stack web application with a React + TypeScript frontend and Node.js backend.
2. A clothing catalogue with product pages, detail views, and a size guide.
3. User authentication with secure password hashing and MySQL storage.
4. Shopping cart functionality with database persistence.
5. Integration with a state-of-the-art LLM (Llama 3.3 70B) via the Groq API for intelligent style feedback.
6. Graceful error handling and fallback mechanisms.

The overlay is one component of a much larger system. In industry, even companies like Amazon and Myntra started their virtual try-on features with basic overlay techniques before investing in advanced AR. The value of this project lies in **system integration** — connecting frontend, backend, database, and AI into a cohesive, working product.

---

### Q3: "If MySQL is only used for login, why not just use localStorage or session storage?"

**Answer:** Using localStorage for authentication is a **security anti-pattern**. Here's why MySQL is the correct choice:

1. **Password security:** Passwords must be hashed before storage. With MySQL + bcryptjs, passwords are hashed server-side and stored securely. With localStorage, passwords would exist in plain text on the client and could be accessed by any JavaScript running on the page (XSS vulnerability).

2. **Persistence across devices:** MySQL stores user accounts on the server. A user can log in from any device or browser. localStorage is tied to a single browser on a single device — if you clear browser data, the account is gone.

3. **Data integrity:** MySQL enforces constraints (e.g., unique emails) at the database level, preventing duplicate registrations. localStorage has no such mechanism.

4. **Scalability:** If this project were to scale (e.g., adding order history, wishlists, or recommendations), the MySQL database is already in place. Starting with a proper database, even for a simple use case, is a best practice.

Using localStorage for sensitive data like user credentials would be a fundamental flaw. MySQL is the right tool for this job, even if it's used only for authentication.

---

## 📝 Conclusion

**Virtual Try-On** is a full-stack web application that bridges the gap between online shopping and the in-store experience. By combining a modern React frontend, a lightweight Node.js backend, secure MySQL authentication, and AI-powered style suggestions via Llama 3.3 70B, the project delivers a practical, working solution to a real-world problem. It demonstrates end-to-end system integration — from user interface design to API development, database management, and third-party AI integration — making it a comprehensive college project that reflects industry-relevant skills.

---

<p align="center">
  Built with ❤️ using React, Node.js, MySQL, and Llama 3.3
</p>
