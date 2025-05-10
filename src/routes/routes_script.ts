import express from "express";
import { createScript } from "../services/scripts/Creatscript";
import { getScripts } from "../services/scripts/Getscripts";
import { getScriptByCategoria } from "../services/scripts/GetscriptByCategoria";
import { editpScript } from "../services/scripts/EditPscript";
import { deleteScript } from "../services/scripts/Deletescript";
export const routerscript = express.Router();
routerscript.post("/",createScript)
routerscript.get("/",getScripts)
routerscript.get("/:categoria",getScriptByCategoria)
routerscript.patch("/:id",editpScript)
routerscript.delete("/:id",deleteScript)

