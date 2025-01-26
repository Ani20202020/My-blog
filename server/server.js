const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json()); // JSON-ի փոխանցման համար

// MongoDB-ի կապը
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Եթե չհաջողվեց կապվել MongoDB-ին, փակել ծրագրի գործարկումը
  });

// Մոդել (օգտվող)
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
}));

// Գրանցման ավարտված կոդը
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Խնդրում ենք լրացնել բոլոր դաշտերը" });
    }

    // Գտնել, եթե արդեն կա նույն էլեկտրոնային հասցեն
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Այս էլեկտրոնային հասցեն արդեն գրանցված է" });
    }

    // Խառնել գաղտնաբառը
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Ստեղծել նոր օգտատեր
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "Գրանցումը հաջողվեց։" });
  } catch (err) {
    console.error("Error during registration:", err); // Տպեք ամբողջական սխալը կոնսոլում
    res.status(500).json({ message: "Գրանցումը ձախողվեց։", error: err.message });
  }
});

// Սերվերի գործարկում
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
