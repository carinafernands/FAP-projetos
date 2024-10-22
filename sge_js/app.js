const express = require('express');
const bodyParser = require('body-parser');
const produtoRoutes = require ('./routes/produtoRoutes');
const sequelize = require ('./config/database');

const app = express();
app.use(express.json());
app.use('/api', produtoRoutes);

const startServer = async () => {
    try{
        await sequelize.sync();
        console.log("Banco de dados conectado!");
        app.listen(3001, () => {
            console.log("Servidor rodando na porta 3001");
        });
    } catch (erro) {
        console.error("Erro ao conectar ao banco de dados:", erro);
    }
};

startServer();