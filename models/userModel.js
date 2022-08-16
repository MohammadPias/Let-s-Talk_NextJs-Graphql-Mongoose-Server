const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String },
}, { timestamps: true });

module.exports = new mongoose.model("User", userSchema)