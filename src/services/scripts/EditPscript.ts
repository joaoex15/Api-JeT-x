import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData";
import { Script } from "../../models/script";

export const editpScript = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { titulo, conteudo }: Partial<Script> = req.body;

  if (!titulo && !conteudo) {
    res.status(400).json({ error: "Nenhum campo para atualização fornecido!" });
    return;
  }

  const { data, error } = await supabase
    .from("scripts")  // A tabela "scripts" não precisa de tipos explícitos aqui
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
};
