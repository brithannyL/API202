import { Router } from 'express'
import { getUsuarios, getUsuariosxid, postUsuario, putUsuario, patchUsuario, deleteUsuario, login } from '../controladores/usuariosCtrl.js'
import {verifyToken} from '../jtw/auth.js'

const router=Router()

router.get('/usuarios', verifyToken, getUsuarios) //select
router.get('/usuarios/:id',verifyToken, getUsuariosxid) //select x id
router.post('/usuarios', postUsuario)  //insert
router.put('/usuarios/:id',verifyToken, putUsuario) //update
router.patch('/usuarios/:id',verifyToken, patchUsuario)//update
router.delete('/usuarios/:id',verifyToken, deleteUsuario)//delete
router.post('/login', login)  //insert

export default router

