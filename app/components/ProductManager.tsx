import { useState } from "react";
import ProductCard from "./ProductCard";
import { SearchAndFilterBar } from "./SearchAndFilterBar";

function ProductManager() {
  const [products, setProducts] = useState<any[]>([
    {
      name: "Food",
    },
    {
      name: "Food",
    },
    {
      name: "Food",
    },
    {
      name: "Food",
    },
    {
      name: "Food",
    },
    {
      name: "Food",
    },
  ]);

  return (
    <>
      {products.length < 1 ? (
        <div className="text-white border border-white mt-8 border-dashed rounded-lg h-40 flex justify-center items-center">
          <p>No products yet. Add your first product to get started.</p>
        </div>
      ) : (
        <div className="mt-8">
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
          />
          <div className="mt-8 flex gap-x-12 gap-y-8 flex-wrap justify-evenly">
            {products.map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductManager;
