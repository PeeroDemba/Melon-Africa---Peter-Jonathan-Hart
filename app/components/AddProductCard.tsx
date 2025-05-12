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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
            index: number;
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
      index: number;
      size: string;
      color: string;
      price: string;
    } | null;
  } | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
    },
    reValidateMode: "onChange",
  });

  const name = watch("name");

  useEffect(() => {
    if (name !== "") {
      setProduct(JSON.parse(name));
    }
  }, [name]);

  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        setProductCardOpen(true);
      }}
      className="max-w-[450px] w-full"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-[18px]">Add Product</p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
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
        <form
          id="add"
          onSubmit={handleSubmit(() => {
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
                        index: number;
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
              if (products.every((e) => product?.title !== e.title)) {
                toast.success("New Product Added Successfully");
                localStorage.setItem(
                  "products",
                  JSON.stringify([...products, product])
                );
                localStorage.setItem(
                  "tempProducts",
                  JSON.stringify([...products, product])
                );
              } else {
                toast.error("Product already exists");
              }
            } else {
              toast.success("New Product Added Successfully");
              localStorage.setItem("products", JSON.stringify([product]));
              localStorage.setItem("tempProducts", JSON.stringify([product]));
            }

            setProductCardOpen(false);
          })}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 w-full overflow-x-auto">
              <Label htmlFor="name">Name</Label>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: {
                    value: true,
                    message: "Please select from the provided options above",
                  },
                }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id="name" className="w-full !h-10">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-[#030712] w-min"
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
                )}
              />
            </div>
            {errors.name ? (
              <p className="text-[14px] font-semibold -mt-4 text-red-600">
                {errors.name?.message}
              </p>
            ) : undefined}
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
        <Button type="submit" form="add">
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddProductCard;
