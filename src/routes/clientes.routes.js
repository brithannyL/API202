import { Router } from 'express'
import {getClientes, getClientesxid, postCliente, putCliente, patchCliente, deleteCliente} from '../controladores/clientesCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/clientes', getClientes) //select
router.get('/clientes/:id', getClientesxid) //select x id
router.post('/clientes', postCliente)  //insert
router.put('/clientes/:id', putCliente) //update
router.patch('/clientes/:id', patchCliente)//update
router.delete('/clientes/:id', deleteCliente)//delete

export default router