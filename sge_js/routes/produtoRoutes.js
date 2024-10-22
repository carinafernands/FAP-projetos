const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// rotas produtos
router.post('/produtos', produtoController.criarProduto);
router.get('/produtos', produtoController.todosProdutos);
router.put('/produtos/:id', produtoController.alterarProduto); // A rota PUT deve estar assim
router.delete('/produto/:id', produtoController.excluirProduto);

module.exports = router;
