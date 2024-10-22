const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sge', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexão com o bando de dados foi bem-sucedida!");
    } catch(error){
        console.error("Não foi possível conectar com o bando de dados", error);
    }
})();

module.exports = sequelize;

