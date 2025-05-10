"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerscript = void 0;
const express_1 = __importDefault(require("express"));
const Creatscript_1 = require("../services/scripts/Creatscript");
const Getscripts_1 = require("../services/scripts/Getscripts");
const GetscriptByCategoria_1 = require("../services/scripts/GetscriptByCategoria");
const EditPscript_1 = require("../services/scripts/EditPscript");
const Deletescript_1 = require("../services/scripts/Deletescript");
exports.routerscript = express_1.default.Router();
exports.routerscript.post("/", Creatscript_1.createScript);
exports.routerscript.get("/", Getscripts_1.getScripts);
exports.routerscript.get("/:categoria", GetscriptByCategoria_1.getScriptByCategoria);
exports.routerscript.patch("/:id", EditPscript_1.editpScript);
exports.routerscript.delete("/:id", Deletescript_1.deleteScript);
