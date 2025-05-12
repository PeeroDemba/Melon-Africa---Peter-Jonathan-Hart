import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

function AddVariantCard({
  setVariantCardOpen,
  data,
}: {
  setVariantCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
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
  };
}) {
  let {
    register,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      size: "",
      color: "",
      price: "",
    },
    reValidateMode: "onChange",
  });

  const size = watch("size");
  const color = watch("color");
  const price = watch("price");

  return (
    <Card
      onClick={(e) => {
        e.stopPropagation();
        setVariantCardOpen(true);
      }}
      className="max-w-[450px] w-full"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-[18px]">Add Variant</p>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setVariantCardOpen(false);
            }}
            variant="icon"
          >
            <X color="#ccc" />
          </Button>
        </CardTitle>
        {/* <CardDescription className="text-[#ccc]">
          Add a new variant for {data.title}.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form id="addv">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="size">Size</Label>
              <Controller
                control={control}
                name="size"
                rules={{
                  required: {
                    value: true,
                    message: "Please select from the provided options above",
                  },
                }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id="size" className="w-full !h-10">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-[#030712]">
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.size || size === "" ? (
              <p className="text-[14px] font-semibold -mt-4 text-red-600">
                {errors.size?.message
                  ? errors.size?.message
                  : "Please select from the provided options above"}
              </p>
            ) : undefined}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="color">Color</Label>
              <Controller
                control={control}
                name="color"
                rules={{
                  required: {
                    value: true,
                    message: "Please select from the provided options above",
                  },
                }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger id="color" className="w-full !h-10">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-[#030712]">
                      <SelectItem
                        value="red"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "red",
                          }}
                        ></span>
                        <span>Red</span>
                      </SelectItem>
                      <SelectItem
                        value="blue"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "blue",
                          }}
                        ></span>
                        <span>Blue</span>
                      </SelectItem>
                      <SelectItem
                        value="green"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "green",
                          }}
                        ></span>
                        <span>Green</span>
                      </SelectItem>
                      <SelectItem
                        value="black"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "black",
                          }}
                        ></span>
                        <span>Black</span>
                      </SelectItem>
                      <SelectItem
                        value="white"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "white",
                          }}
                        ></span>
                        <span>White</span>
                      </SelectItem>
                      <SelectItem
                        value="yellow"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "yellow",
                          }}
                        ></span>
                        <span>Yellow</span>
                      </SelectItem>
                      <SelectItem
                        value="purple"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "purple",
                          }}
                        ></span>
                        <span>Purple</span>
                      </SelectItem>
                      <SelectItem
                        value="orange"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "orange",
                          }}
                        ></span>
                        <span>Orange</span>
                      </SelectItem>
                      <SelectItem
                        value="pink"
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-[20px] w-[20px] rounded-full"
                          style={{
                            backgroundColor: "pink",
                          }}
                        ></span>
                        <span>Pink</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.color || color === "" ? (
              <p className="text-[14px] font-semibold -mt-4 text-red-600">
                {errors.color?.message
                  ? errors.color?.message
                  : "Please select from the provided options above"}
              </p>
            ) : undefined}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                placeholder="0"
                type="number"
                min={0}
                {...register("price", {
                  max: {
                    value: 9999999,
                    message: "Please input value lesser than ₦9,999,999",
                  },
                  min: {
                    value: 0,
                    message: "Please input value not less than ₦0",
                  },
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
            </div>
            {errors.price?.type === "required" || price === "" ? (
              <p className="text-[14px] font-semibold -mt-2 text-red-600">
                {errors.price?.message
                  ? errors.price?.message
                  : "This field is required"}
              </p>
            ) : undefined}
            {errors.price?.type === "max" || Number(price) > 9999999 ? (
              <p className="text-[14px] font-semibold -mt-2 text-red-600">
                {errors.price?.message
                  ? errors.price?.message
                  : "Please input value lesser than ₦9,999,999"}
              </p>
            ) : undefined}
            {errors.price?.type === "min" || Number(price) < 0 ? (
              <p className="text-[14px] font-semibold -mt-2 text-red-600">
                {errors.price?.message
                  ? errors.price?.message
                  : "Please input value not less than ₦0"}
              </p>
            ) : undefined}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          form="addv"
          disabled={size === "" || color === "" || price === ""}
          onClick={(e) => {
            e.stopPropagation();
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
              const filteredProducts = products.map((e) => {
                if (e.id === Number(localStorage.getItem("productIndex"))) {
                  return {
                    category: e.category,
                    description: e.description,
                    id: e.id,
                    image: e.image,
                    price: e.price,
                    rating: {
                      rate: e.rating.rate,
                      count: e.rating.count,
                    },
                    title: e.title,
                    variants:
                      e.variants && e.variants.length > 0
                        ? [
                            ...e.variants,
                            {
                              index: e.variants.length + 1,
                              size,
                              color,
                              price,
                            },
                          ]
                        : [
                            {
                              index: 1,
                              size,
                              color,
                              price,
                            },
                          ],
                  };
                } else {
                  return e;
                }
              });

              localStorage.setItem(
                "products",
                JSON.stringify([...filteredProducts])
              );
              localStorage.setItem(
                "tempProducts",
                JSON.stringify([...filteredProducts])
              );
            }

            setVariantCardOpen(false);
          }}
        >
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddVariantCard;
