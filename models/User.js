import crypto from 'crypto';
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Por favor ingresar nombre usuario"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Por favor ingresar email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Por favor ingresar un email valido"]
    },
    password: {
        type: String,
        required: [true, "contraseña es requerida"],
        minlenngth: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();

});

userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedTokens = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES, });
}

userSchema.methods.getResetPasswordsToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);


    return resetToken;
};

export const User = mongoose.model('User', userSchema);

