"use server";
import { supabase } from "@/lib/supabase/server";
import { DroneForm } from "@/lib/validation";
import z from "zod";

const handleSubmit = async (formData: DroneForm) => {
  const { error } = z.any().safeParse(formData);
  if (error) {
    throw new Error(error.message);
  }
  try {
    const { data, error } = await supabase
      .from("drones")
      .insert([formData])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Submit Error:", err);
    return { success: false, error: err };
  }
};

export { handleSubmit };
