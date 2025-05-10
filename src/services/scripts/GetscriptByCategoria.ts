// src/routes/GetScriptByCategoria.ts
import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData"; // Supondo que o supabase está configurado corretamente
import { Script } from "../../models/script"; // Importando o modelo Script

export const getScriptByCategoria = async (req: Request, res: Response): Promise<void> => {
  const { categoria } = req.params;
  const { data, error } = await supabase.from("scripts") .select() .eq("categoria", categoria); 
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  const scripts: Script[] = data as Script[];
  res.status(200).json({ message: `Scripts encontrados para a categoria ${categoria}!`, data: scripts });
};
