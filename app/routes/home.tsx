import ProductManager from "~/components/ProductManager";
import type { Route } from "./+types/home";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import AddProductCard from "~/components/AddProductCard";
import { ToastContainer } from "react-toastify";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Melon Africa" },
    {
      name: "description",
      content: "Melon Africa Frontend Development Assessment",
    },
  ];
}

export default function Home() {
  const [productCardOpen, setProductCardOpen] = useState(false);
  const [variantCardOpen, setVariantCardOpen] = useState(false);
  const [editVariantCardOpen, setEditVariantCardOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  return (
    <>
      {" "}
      <ToastContainer />
      <main className="container mx-auto py-8 px-4 ">
        <h1 className="text-3xl font-bold mb-8">Product Manager</h1>
        <div className="flex justify-between gap-4 items-center">
          <p className="font-semibold">Products</p>
          <Button
            onClick={() => {
              setProductCardOpen(true);
            }}
          >
            <div className="h-[20px] w-[20px] rounded-full border-2 border-black flex justify-center items-center">
              <Plus size={16} />
            </div>
            <span>Add Product</span>
          </Button>
        </div>

        <ProductManager
          productCardOpen={productCardOpen}
          editVariantCardOpen={editVariantCardOpen}
          setEditVariantCardOpen={setEditVariantCardOpen}
          variantCardOpen={variantCardOpen}
          setVariantCardOpen={setVariantCardOpen}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          isCleared={isCleared}
          setIsCleared={setIsCleared}
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          search={search}
          setSearch={setSearch}
          filterCount={filterCount}
          setFilterCount={setFilterCount}
        />
        {productCardOpen && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setProductCardOpen(false);
            }}
            className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/30 flex justify-center items-center"
          >
            <AddProductCard setProductCardOpen={setProductCardOpen} />
          </div>
        )}
      </main>
    </>
  );
}
