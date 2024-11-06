import bcrypt from 'bcryptjs';
import { conmysql } from '../db.js';
import jwt from 'jsonwebtoken'

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('select * from usuarios');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar usuarios" });
    }
};

export const getUsuariosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('select * from usuarios where usr_id=?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            usr_id: 0,
            message: "Usuario no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postUsuario = async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10); // Genera un "salt" para aumentar la seguridad
        const hashedPassword = await bcrypt.hash(usr_clave, salt); // Hashea la contraseña

        // Guardar el usuario con la contraseña encriptada
        const [rows] = await conmysql.query(
            'insert into usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) values(?,?,?,?,?,?)',
            [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]
        );

        res.send({
            id: rows.insertId
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;
        const [result] = await conmysql.query(
            'update usuarios set usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? where usr_id=?', 
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const [rows] = await conmysql.query('select * from usuarios where usr_id=?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchUsuario =  
async(req, res)=> {
    try {
        const {id}= req.params
        //console.log(req.body)
    const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
    console.log(usr_nombre)
    const [result]=await conmysql.query('update usuarios set usr_usuario=IFNULL(?,usr_usuario), usr_clave=IFNULL(?,usr_clave), usr_nombre=IFNULL(?,usr_nombre), usr_telefono=IFNULL(?,usr_telefono), usr_correo=IFNULL(?,usr_correo), usr_activo=IFNULL(?,usr_activo) where usr_id=?', 
        [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from usuarios where usr_id=?', [id])
        res.json(rows[0])
        

    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteUsuario = 
async(req, res)=> {
    try {
        const [rows]=await conmysql.query('delete from usuarios where usr_id=?', [req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message:"No pudo eliminar al usuario"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Eror del lado del servidor"})
    }
}


export const login = async (req, res) => {
    const { usr_usuario, usr_clave } = req.body;

    try {
        const [user] = await conmysql.query('SELECT * FROM usuarios WHERE usr_usuario = ?', [usr_usuario]);
        
        if (!user.length) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(usr_clave, user[0].usr_clave);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña inválida' });
        }

        const token = jwt.sign({ id: user[0].usr_id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ auth: true, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};