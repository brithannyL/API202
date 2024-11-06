import { Router } from 'express';
import { getDetalles, getDetallexid, postDetalle, putDetalle, patchDetalle, deleteDetalle } from '../controladores/pedidos_detalleCtrl.js';

const router = Router();

// Armar nuestras rutas
router.get('/pedidos_detalle', getDetalles); // Select
router.get('/pedidos_detalle/:id', getDetallexid); // Select por ID
router.post('/pedidos_detalle', postDetalle); // Insert
router.put('/pedidos_detalle/:id', putDetalle); // Update
router.patch('/pedidos_detalle/:id', patchDetalle); // Update parcial
router.delete('/pedidos_detalle/:id', deleteDetalle); // Delete

export default router;