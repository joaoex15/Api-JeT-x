"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_script_js_1 = require("./routes/routes_script.js");
const routes_agent_js_1 = require("./routes/routes_agent.js");
const app = (0, express_1.default)();
const port = 4000;
// Configurações importantes
app.use((0, cors_1.default)()); // Habilita CORS
app.use(express_1.default.json()); // Para parsear JSON
// Rotas
app.use('/scripts', routes_script_js_1.routerscript);
app.use('/chatbase', routes_agent_js_1.routeragente);
// Rota de teste
app.get('/', (req, res) => {
    res.send('API de Scripts funcionando!');
});
// Inicia o servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
