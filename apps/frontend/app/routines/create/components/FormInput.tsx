
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Control, FieldError } from "react-hook-form";
import Image from "next/image";

interface Props {
  name: string;
  placeholder?: string;
  control: Control<any>;
  labelStyle?: string;
  inputStyle?: string;
  containerStyle?: string;
  label: string;
  type: string;
  error?: FieldError;
  accept?: string;
}

function FormInput({
  name,
  placeholder,
  control,
  labelStyle,
  inputStyle,
  containerStyle,
  label,
  type,
  error,
  accept,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <p className={`flex flex-col w-full ${containerStyle}`}>
            <label className={`flex flex-col text-xs gap-2 ${labelStyle}`}>
              {label}
              <input
                className={`bg-transparent border rounded-md h-12 p-2 
                ${inputStyle} ${error ? "border-red-400" : "border-whiteGray"}`}
                type={type}
                placeholder={placeholder}
                accept={accept}
                onChange={(e) => {
                  if (type === "file") {
                    const files = (e.target as HTMLInputElement).files;
                    setSelectedFile(files?.[0] || null); 
                    field.onChange(files?.[0] || null); 
                  } else {
                    field.onChange(e.target.value); 
                  }
                }}
              />
            </label>

            {previewUrl && (
              <div className="mt-2">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="rounded-md"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </p>
        )}
      />
      {error && <p className="text-red-400 text-xs">{error.message}</p>}
    </div>
  );
}

export default FormInput;
