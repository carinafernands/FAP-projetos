const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajuste o caminho conforme necessário

class Produto extends Model {}

Produto.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // Adicione outros campos conforme necessário
}, {
    sequelize,
    modelName: 'Produtos', // Nome da tabela no banco de dados
});

module.exports = Produto;
