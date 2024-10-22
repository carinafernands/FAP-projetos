const Produto = require('./models/produto'); // Ajuste o caminho se necessário
const sequelize = require('./config/database'); // Ajuste o caminho se necessário

(async () => {
    try {
        // Conectando ao banco de dados
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida.');

        // Tentando criar um novo produto
        const novoProduto = await Produto.create({ nome: 'Teste', preco: 50 });
        console.log('Produto criado:', novoProduto);
    } catch (erro) {
        console.error('Erro ao criar produto:', erro);
    } finally {
        // Fechar a conexão
        await sequelize.close();
    }
})();

