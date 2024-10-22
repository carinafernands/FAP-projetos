// const Produto = require("../models/produto");

// exports.excluirProduto = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const excluir = await Produto.destroy({ where: { id } });

//         if (excluir) {
//             res.status(204).send(); // 204 No Content
//         } else {
//             res.status(404).json({ error: "Produto não encontrado" });
//         }

//     } catch (error) {
//         res.status(500).json({ error: "Erro ao excluir o produto: " + error.message });
//     }
// };
