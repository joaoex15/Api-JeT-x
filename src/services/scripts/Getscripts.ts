// src/routes/GetScripts.ts
import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData"; 
import { Script } from "../../models/script";

export const getScripts = async (req: Request, res: Response): Promise<void> => {

  const { data, error } = await supabase
    .from("scripts") 
    .select(); 

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const scripts: Script[] = data as Script[];

  res.status(200).json({ message: "Scripts encontrados com sucesso!", data: scripts });
};
