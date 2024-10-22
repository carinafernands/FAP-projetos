import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>{
    res.send("Olá mundo!")
});

app.get('/api/mensagem', (req: Request, res: Response) =>{
    res.json({mensagem: 'Resposta com JSON'})
}); 

app.post('/api/mensagem', (req: Request, res: Response) =>{
   const {seu_nome} = req.body;
   if (!seu_nome){
    return res.status(400).json({mensgem: 'Nome não fornecido!'});
   }
    res.json({mensagem: `Olá, ${seu_nome}! Seja bem-vindx!`});
}); 

app.listen(3000, () => {console.log('Server is running on http://localhost:3000')});

