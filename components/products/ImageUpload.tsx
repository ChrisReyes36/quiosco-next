/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // @ts-ignore
          setImageUrl(result.info?.secure_url);
        }
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div className="space-y-2">
          <label className="text-slate-800">Imagen Producto</label>

          <button
            type="button"
            onClick={() => open()}
            className="relative w-full cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
          >
            <TbPhotoPlus size={50} />
            <span className="text-lg font-semibold">Agregar Imagen</span>
            {imageUrl && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2.5rem), 728px"
                  className="object-contain"
                  src={imageUrl}
                  alt="Imagen de Producto"
                />
              </div>
            )}
          </button>
          <input type="hidden" name="image" value={imageUrl} />
        </div>
      )}
    </CldUploadWidget>
  );
}
