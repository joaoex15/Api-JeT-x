import express from "express";
import cors from "cors";
import { routerscript } from "./routes/routes_script.js";
import { routeragente } from "./routes/routes_agent.js";

const app = express();
const port = 4000;

// Configurações importantes
app.use(cors()); // Habilita CORS
app.use(express.json()); // Para parsear JSON

// Rotas
app.use('/scripts', routerscript);
app.use('/chatbase', routeragente);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Scripts funcionando!');
});

// Inicia o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});