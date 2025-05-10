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
exports.getScriptByCategoria = void 0;
const superbaseData_1 = require("../../Data/superbaseData"); // Supondo que o supabase está configurado corretamente
const getScriptByCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria } = req.params;
    const { data, error } = yield superbaseData_1.supabase.from("scripts").select().eq("categoria", categoria);
    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }
    const scripts = data;
    res.status(200).json({ message: `Scripts encontrados para a categoria ${categoria}!`, data: scripts });
});
exports.getScriptByCategoria = getScriptByCategoria;
