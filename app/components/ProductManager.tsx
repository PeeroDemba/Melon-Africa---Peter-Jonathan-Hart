import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { SearchAndFilterBar } from "./SearchAndFilterBar";

function ProductManager() {
  const [products, setProducts] = useState<
    | {
        category: string;
        description: string;
        id: number;
        image: string;
        price: number;
        rating: { rate: number; count: number };
        title: string;
      }[]
    | null
  >(() =>
    localStorage.getItem("products") && localStorage.getItem("products") !== ""
      ? JSON.parse(localStorage.getItem("products")!)
      : null
  );

  // useEffect(() => {
  //   setProducts(() =>
  //     localStorage.getItem("products") &&
  //     localStorage.getItem("products") !== ""
  //       ? JSON.parse(localStorage.getItem("products")!)
  //       : null
  //   );
  // });

  return (
    <>
      {products === null ? (
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
            {products.map((e, i) => (
              <ProductCard key={i} data={e} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductManager;
