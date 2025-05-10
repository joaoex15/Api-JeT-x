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
exports.editpScript = void 0;
const superbaseData_1 = require("../../Data/superbaseData");
const editpScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    if (!titulo && !conteudo) {
        res.status(400).json({ error: "Nenhum campo para atualização fornecido!" });
        return;
    }
    const { data, error } = yield superbaseData_1.supabase
        .from("scripts") // A tabela "scripts" não precisa de tipos explícitos aqui
        .update({ titulo, conteudo })
        .eq("id", id)
        .select();
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    if (!data || data.length === 0) {
        res.status(404).json({ message: "Script não encontrado!" });
        return;
    }
    res.status(200).json({
        message: "Script atualizado com sucesso!",
        data: data[0] // Acessando o primeiro item da resposta
    });
});
exports.editpScript = editpScript;
