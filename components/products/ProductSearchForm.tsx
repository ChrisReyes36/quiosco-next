"use client";

import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { SearchSchema } from "@/src/schema";

export default function ProductSearchForm() {
  const handleSearchForm = (formData: FormData) => {
    const data = { search: formData.get("search") };
    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    redirect(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Buscar Productos"
        className="p-2 placeholder-gray-400 w-full"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  );
}
