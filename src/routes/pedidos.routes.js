import { Router } from 'express';
import { getPedido, getPedidoxId, postPedido, putPedido, patchPedido, deletePedido } from '../controladores/pedidoCtrl.js';

const router = Router();

// Definir rutas
router.get('/pedido', getPedido); // Obtener todos los detalles
router.get('/pedido/:id', getPedidoxId); // Obtener detalle por ID
router.post('/pedido', postPedido); // Insertar un nuevo detalle
router.put('/pedido/:id', putPedido); // Actualizar un detalle completo
router.patch('/pedido/:id', patchPedido); // Actualizar parcialmente un detalle
router.delete('/pedido/:id', deletePedido); // Eliminar un detalle

export default router;
