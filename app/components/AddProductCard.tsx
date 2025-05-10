import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function AddProductCard({
  setProductCardOpen,
}: {
  setProductCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading } = useQuery<
    {
      category: string;
      description: string;
      id: number;
      image: string;
      price: number;
      rating: { rate: number; count: number };
      title: string;
      variants:
        | {
            size: string;
            color: string;
            price: string;
          }[]
        | null;
    }[]
  >({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    },
  });
  const [product, setProduct] = useState<{
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;
    variants: {
      size: string;
      color: string;
      price: string;
    } | null;
  } | null>(null);

  return (
    <Card className="max-w-[450px] w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-[18px]">Add Product</p>
          <Button
            onClick={() => {
              setProductCardOpen(false);
            }}
            variant="icon"
          >
            <X color="#ccc" />
          </Button>
        </CardTitle>
        <CardDescription className="text-[#ccc]">
          Create a new product to add variants to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 w-full overflow-x-auto">
              <Label htmlFor="name">Name</Label>
              <Select
                onValueChange={(v) => {
                  setProduct(JSON.parse(v));
                }}
              >
                <SelectTrigger id="name" className="w-full !h-10">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className={`bg-[#030712] ${!isLoading && "-translate-[25%]"}`}
                >
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    data?.map((e, i: number) => (
                      <SelectItem key={i} value={JSON.stringify(e)}>
                        {e.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5 w-full overflow-x-auto">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                disabled
                className="placeholder:text-white"
                placeholder={
                  product === null
                    ? "Brief description of the product"
                    : product.description
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => {
            const products:
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
                        size: string;
                        color: string;
                        price: string;
                      }[]
                    | null;
                }[]
              | string =
              localStorage.getItem("products") &&
              localStorage.getItem("products") !== ""
                ? JSON.parse(localStorage.getItem("products")!)
                : "";
            if (products && typeof products !== "string") {
              if (products.every((e) => product?.title !== e.title))
                localStorage.setItem(
                  "products",
                  JSON.stringify([...products, product])
                );
            } else {
              localStorage.setItem("products", JSON.stringify([product]));
            }
            setProductCardOpen(false);
          }}
        >
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddProductCard;
