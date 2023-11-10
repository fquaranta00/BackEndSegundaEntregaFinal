import { Router } from 'express';
import ProductManager from '../dao/productManager.js';


const router = Router();


router.get('/', async (req, res) => {
  try {
    const products = await ProductManager.getJSONFromFile();
    res.render('home', { products }); // Pasamos los productos como contexto para la vista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductManager.getJSONFromFile();
    res.render('realTimeProducts', { products }); // Pasamos los productos como contexto para la vista
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;