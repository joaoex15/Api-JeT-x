// src/routes/CreateScript.ts
import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData"; // Supondo que o supabaseClient está em ../supabaseClient
import { Script } from "../../models/script"; // Modelo Script que você criou

export const createScript = async (req: Request, res: Response): Promise<void> => {
  const { titulo, conteudo, categoria }: Script = req.body;

  // Verifica se os campos são fornecidos
  if (!titulo || !conteudo || !categoria) {
    res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    return;
  }

  // Insere os dados na tabela 'scripts'
  const { data, error } = await supabase
    .from("scripts")
    .insert([{ titulo, conteudo, categoria }])
    .select(); // O '.select()' garante que os dados inseridos sejam retornados

  // Verifica se houve erro
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // Retorna os dados inseridos (script criado)
  res.status(201).json({
    message: "Script criado com sucesso!",
    data: data ? data[0] : null, // Retorna o primeiro item do array de dados inseridos
  });
};
