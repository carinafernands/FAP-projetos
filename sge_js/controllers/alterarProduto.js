// const Produto = require("../models/produto");

// exports.alterarProduto = async (req, res) => {
//     try{
//         const { id } = req.params;
//         const { nome } = req.body;
//         const [ update ] = await Produto.update({nome}, {where: {id}});
         
//         if (update){
//             const produtoAtualizado = await Produto.findByPk(id); //recupera produto atualizado
//             res.status(200).json(produtoAtualizado);
//         }else{
//             res.status(404).json({error: "Produto não encontrado!"});
//         }
 
//     }catch (error){
//         res.status(500).json({error: "Erro ao alterar produto!"})
//     }
// };

