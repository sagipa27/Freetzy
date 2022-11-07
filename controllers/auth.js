import { User } from '../models/User.js'
import { ErrorResponse } from '../utils/errorResponse.js';
import { sendEmail } from '../utils/sendEmail.js';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });
        await user.save();
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }

};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Por favor ingresar email y password", 400));
    }

    try {
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Credenciales invalidas", 401));
        }


        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Credenciales invalidas", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await user.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No se puedo enviar el email", 404));
        }

        const resetToken = user.getResetPasswordsToken();

        await user.save();

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
         <h1> Has solicitado un contraseña nueva</h1>
         <p> Ir a este link para restablecer la contraseña</p>
         < href=${resetURL} clickTraking=off>${resetURL}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password resete request",
                text: message,
            });
            res.status(200).json({ success: true, data: "Email sent" })
        } catch (error) {
            user.resetPasswordsToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email no se puede enviar", 500))
        }
    } catch (error) {
        next(error);
    }
};

export const resetPassword = (req, res, next) => {
    res.send("Reset password Route")
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedTokens();

    res.status(statusCode).json({ sucess: true, token });
    console.log(token);
};