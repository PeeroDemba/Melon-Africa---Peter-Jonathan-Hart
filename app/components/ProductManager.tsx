"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { SearchAndFilterBar } from "./SearchAndFilterBar";

function ProductManager({
  productCardOpen,
  editVariantCardOpen,
  setEditVariantCardOpen,
  variantCardOpen,
  setVariantCardOpen,
  deleteProduct,
  setDeleteProduct,
  search,
  setSearch,
}: {
  productCardOpen: boolean;
  variantCardOpen: boolean;
  setVariantCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProduct: boolean;
  setDeleteProduct: React.Dispatch<React.SetStateAction<boolean>>;
  editVariantCardOpen: boolean;
  setEditVariantCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [products, setProducts] = useState<
    | {
        category: string;
        description: string;
        id: number;
        image: string;
        price: number;
        rating: { rate: number; count: number };
        title: string;
        variants:
          | {
              index: number;
              size: string;
              color: string;
              price: string;
            }[]
          | null;
      }[]
    | null
  >(() =>
    localStorage.getItem("products") && localStorage.getItem("products") !== ""
      ? JSON.parse(localStorage.getItem("products")!)
      : null
  );

  useEffect(() => {
    setProducts(() =>
      localStorage.getItem("products") &&
      localStorage.getItem("products") !== ""
        ? JSON.parse(localStorage.getItem("products")!)
        : null
    );
  }, [
    productCardOpen,
    variantCardOpen,
    editVariantCardOpen,
    deleteProduct,
    search,
  ]);

  return (
    <>
      <SearchAndFilterBar
        onSearchChange={() => {}}
        availableSizes={["XS", "S", "M", "L", "XL", "XXL"]}
        availableColors={[
          "Red",
          "Blue",
          "Green",
          "Black",
          "White",
          "Yellow",
          "Purple",
          "Orange",
          "Pink",
        ]}
        onFilterChange={() => {}}
        minMaxPrice={[0, 9999999]}
        setSearch={setSearch}
      />
      {products === null ? (
        <div className="text-white border border-white mt-8 border-dashed rounded-lg h-40 flex justify-center items-center">
          <p>No products yet. Add your first product to get started.</p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mt-8 flex gap-x-12 gap-y-8 flex-wrap justify-evenly">
            {products.map((e, i) => (
              <ProductCard
                key={i}
                data={e}
                editVariantCardOpen={editVariantCardOpen}
                setEditVariantCardOpen={setEditVariantCardOpen}
                variantCardOpen={variantCardOpen}
                setVariantCardOpen={setVariantCardOpen}
                setDeleteProduct={setDeleteProduct}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductManager;
