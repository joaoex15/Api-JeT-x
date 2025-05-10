import { Request, Response } from "express";
import { supabase } from "../../Data/superbaseData";

export const deleteScript = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase
    .from("scripts")
    .delete()
    .eq("id", id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: "Script deletado com sucesso!" });
};