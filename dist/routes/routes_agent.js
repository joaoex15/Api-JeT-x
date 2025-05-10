"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeragente = void 0;
const express_1 = __importDefault(require("express"));
const Gererate_script_1 = require("../services/Agente/Gererate-script");
exports.routeragente = express_1.default.Router();
exports.routeragente.post("/", Gererate_script_1.generateScript);
