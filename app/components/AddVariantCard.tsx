import {
  Card,
  CardContent,
  CardDescription,
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
import { useState } from "react";

function AddVariantCard({
  setVariantCardOpen,
  data,
  index,
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
          size: string;
          color: string;
          price: string;
        }[]
      | null;
  };
  index: number;
}) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Card className="max-w-[450px] w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p className="text-[18px]">Add Variant</p>
          <Button
            onClick={() => {
              setVariantCardOpen(false);
            }}
            variant="icon"
          >
            <X color="#ccc" />
          </Button>
        </CardTitle>
        <CardDescription className="text-[#ccc]">
          Add a new variant for {data.title}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="size">Size</Label>
              <Select
                onValueChange={(v) => {
                  setSize(v);
                }}
              >
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
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="color">Color</Label>
              <Select
                onValueChange={(v) => {
                  setColor(v);
                }}
              >
                <SelectTrigger id="color" className="w-full !h-10">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-[#030712]">
                  <SelectItem value="red" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-red-600 rounded-full"></span>
                    <span>Red</span>
                  </SelectItem>
                  <SelectItem value="blue" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-blue-600 rounded-full"></span>
                    <span>Blue</span>
                  </SelectItem>
                  <SelectItem value="green" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-green-600 rounded-full"></span>
                    <span>Green</span>
                  </SelectItem>
                  <SelectItem value="black" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-black rounded-full"></span>
                    <span>Black</span>
                  </SelectItem>
                  <SelectItem value="white" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-white rounded-full"></span>
                    <span>White</span>
                  </SelectItem>
                  <SelectItem
                    value="yellow"
                    className="flex items-center gap-2"
                  >
                    <span className="h-[20px] w-[20px] bg-yellow-600 rounded-full"></span>
                    <span>Yellow</span>
                  </SelectItem>
                  <SelectItem
                    value="purple"
                    className="flex items-center gap-2"
                  >
                    <span className="h-[20px] w-[20px] bg-purple-600 rounded-full"></span>
                    <span>Purple</span>
                  </SelectItem>
                  <SelectItem
                    value="orange"
                    className="flex items-center gap-2"
                  >
                    <span className="h-[20px] w-[20px] bg-orange-600 rounded-full"></span>
                    <span>Orange</span>
                  </SelectItem>
                  <SelectItem value="pink" className="flex items-center gap-2">
                    <span className="h-[20px] w-[20px] bg-pink-600 rounded-full"></span>
                    <span>Pink</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                placeholder="0"
                type="number"
                min={0}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
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
              const exact = products.some((e) => e.id === index);
              if (exact) {
                const filteredProducts = products.map((e) => {
                  if (e.id === index) {
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
                                size,
                                color,
                                price,
                              },
                            ]
                          : [
                              {
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
              }
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
