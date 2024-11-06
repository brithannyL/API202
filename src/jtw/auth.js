// src/middlewares/verifyToken.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js'; // Asegúrate de que la variable JWT_SECRET esté definida en tu archivo de configuración

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Obtiene el token del encabezado de autorización
    if (!token) return res.status(403).send({ message: 'Token no proporcionado' }); // Si no hay token, devuelve un error

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Token no válido' }); // Si el token no es válido, devuelve un error
        req.userId = decoded.id; // Guarda el ID del usuario en la solicitud
        next(); // Continúa con el siguiente middleware o ruta
    });
};