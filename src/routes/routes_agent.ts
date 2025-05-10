import express from "express";
import {   generateScript } from "../services/Agente/Gererate-script";

export const routeragente = express.Router();
routeragente.post("/",generateScript)
