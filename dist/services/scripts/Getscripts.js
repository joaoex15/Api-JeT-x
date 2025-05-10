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
exports.getScripts = void 0;
const superbaseData_1 = require("../../Data/superbaseData"); // Supondo que o supabase está configurado corretamente
const getScripts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fazendo uma consulta para obter todos os scripts
    const { data, error } = yield superbaseData_1.supabase
        .from("scripts") // Nome da tabela no Supabase
        .select(); // Retorna todos os campos da tabela "scripts"
    // Verifica se houve erro na consulta
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    // Garantindo que os dados retornados sigam a estrutura do modelo Script
    const scripts = data;
    // Se a consulta for bem-sucedida, retorna os scripts encontrados
    res.status(200).json({ message: "Scripts encontrados com sucesso!", data: scripts });
});
exports.getScripts = getScripts;
