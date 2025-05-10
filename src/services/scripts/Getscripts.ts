// src/routes/GetScripts.ts
import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData"; // Supondo que o supabase está configurado corretamente
import { Script } from "../../models/script"; // Importando o modelo Script

export const getScripts = async (req: Request, res: Response): Promise<void> => {
  // Fazendo uma consulta para obter todos os scripts
  const { data, error } = await supabase
    .from("scripts") // Nome da tabela no Supabase
    .select(); // Retorna todos os campos da tabela "scripts"

  // Verifica se houve erro na consulta
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // Garantindo que os dados retornados sigam a estrutura do modelo Script
  const scripts: Script[] = data as Script[];

  // Se a consulta for bem-sucedida, retorna os scripts encontrados
  res.status(200).json({ message: "Scripts encontrados com sucesso!", data: scripts });
};
