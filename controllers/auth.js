import { User } from '../models/User.js'


export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });
        await user.save();
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: error.message,
        });
    }

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, user: "Por favor ingresar email y password " })
    }

    try {
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            res.status(404).json({ success: false, error: "Credenciales invalidas" });
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            res.status(404).json({ success: false, error: "Credenciales invalidas" });
        }

        res.status(200).json({
            success: true,
            token: "asd1234",
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: error.message,
        });
    }
};

export const forgotPassword = (req, res, next) => {
    res.send("Forgot password Route")
};

export const resetPassword = (req, res, next) => {
    res.send("Reset password Route")
};