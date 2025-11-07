const mongoose = require("mongoose");

const uri = "mongodb+srv://joydeep:Joydeep123@cluster0.icnwq9p.mongodb.net/ecommerce?retryWrites=true&w=majority";

console.log("🔍 Trying to connect to MongoDB Atlas...");

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("⚠️ Connection Event Error:", err.message);
});
