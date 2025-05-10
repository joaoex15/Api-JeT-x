"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScript = void 0;
const superbaseData_1 = require("../../Data/superbaseData"); // Supondo que o supabaseClient está em ../supabaseClient
const createScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, conteudo, categoria } = req.body;
    // Verifica se os campos são fornecidos
    if (!titulo || !conteudo || !categoria) {
        res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        return;
    }
    // Insere os dados na tabela 'scripts'
    const { data, error } = yield superbaseData_1.supabase
        .from("scripts")
        .insert([{ titulo, conteudo, categoria }])
        .select(); // O '.select()' garante que os dados inseridos sejam retornados
    // Verifica se houve erro
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    // Retorna os dados inseridos (script criado)
    res.status(201).json({
        message: "Script criado com sucesso!",
        data: data ? data[0] : null, // Retorna o primeiro item do array de dados inseridos
    });
});
exports.createScript = createScript;
