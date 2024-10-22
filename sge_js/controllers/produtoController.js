const Produto = require('../models/produto');
// const alterarProduto = require('./alterarProduto');
// const excluirProduto = require ('../excluirProduto');

// Exemplo de uma função para criar um produto
exports.criarProduto = async (req, res) => {
    try {
        const { nome, preco } = req.body;
        const novoProduto = await Produto.create({ nome, preco });
        res.status(201).json(novoProduto);
    } catch (erro) {
        console.error('Erro ao criar produto', erro)
        res.status(500).json({ erro: "Erro ao criar produto" });
    }
};


exports.todosProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json({
            mensagem: 'Lista de produtos:',
            produtos
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar produtos',
            erro: error.message
        });
    }
};

exports.alterarProduto = async (req, res) => {
    try{
        const { id } = req.params;
        const { nome } = req.body;
        const [ update ] = await Produto.update({nome}, {where: {id}});
         
        if (update){
            const produtoAtualizado = await Produto.findByPk(id); //recupera produto atualizado
            res.status(200).json(produtoAtualizado);
        }else{
            res.status(404).json({error: "Produto não encontrado!"});
        }
 
    }catch (error){
        res.status(500).json({error: "Erro ao alterar produto!"})
    }
};

exports.excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const excluir = await Produto.destroy({ where: { id } });

        if (excluir) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ error: "Produto não encontrado" });
        }

    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir o produto: " + error.message });
    }
};



