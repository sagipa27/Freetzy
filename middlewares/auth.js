import jwt from 'jsonwebtoken';

import { User } from '../models/User.js';

import { ErrorResponse } from '../utils/errorResponse.js'

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("No autorizado para acceder a esta ruta", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("NO se encontro usuario con este id", 404));
        }

        req.user = user;

        next();
    } catch (err) {
        return next(new ErrorResponse("No autorizado para acceder a esta ruta", 401));
    }
};