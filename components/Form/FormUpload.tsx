"use client";

import supabase from "@/lib/supabase/server";
import Image from "next/image";
import React, { useState } from "react";
import { FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { FormBase, FormControlProps } from "./BaseForm";
import { useFieldContext } from "./hooks";

const FormUpload = (
  props: FormControlProps & React.ComponentProps<"input">
) => {
  const field = useFieldContext<string[]>();
  const [uploading, setUploading] = useState(false);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  
  const handleUpload = async (file: File) => {
    setUploading(true);
    const selectedFile = file;
    if (selectedFile.size > 100 * 1024 * 1024) {
      // 100mb
      alert("الملف كبير جدًا، الحد الأقصى 100 ميجابايت.");
      return;
    }
    const companyName =
      field.form.getFieldValue("company.company_name") || "unknown-company";
    const droneName =
      field.form.getFieldValue("BasicInfo.drone_name") || "unknown-drone";
    const bucket = field.name.replace("files.", ""); // ضع اسم الباكيت الصحيح
    const filePath = `${companyName.toLowerCase()}/${droneName.toLowerCase()}/${Date.now()}-${
      file.name
    }`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, 600000000000);
    // append new URL
    field.handleChange([
      ...(field.state.value || []),
      urlData?.signedUrl || "",
    ]);

    setUploading(false);
  };

  return (
    <FormBase {...props}>
      <FieldLabel>
        {props.label}

        <span className="text-red-500">*</span>
        <span className="text-red-400">اقصي حجم 100MB </span>
      </FieldLabel>

      <Input
        {...props}
        type="file"
        multiple
        id={field.name}
        name={field.name}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach((file) => handleUpload(file));
          }
        }}
        onBlur={field.handleBlur}
        autoComplete="off"
        aria-invalid={isInvalid}
      />

      {/* Loader */}
      {uploading && (
        <p className="text-blue-600 animate-pulse mt-2">Uploading...</p>
      )}

      {/* Preview Images */}
      {field.name === "files.images" && field.state.value?.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {field.state.value.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`uploaded-${i}`}
              width={120}
              height={120}
              className="object-cover rounded-md border"
            />
          ))}
        </div>
      )}
    </FormBase>
  );
};

export default FormUpload;
