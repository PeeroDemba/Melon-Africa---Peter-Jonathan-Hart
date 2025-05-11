"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, SquarePen, Trash2, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";
import AddVariantCard from "./AddVariantCard";
import EditVariantCard from "./EditVariantCard";

function ProductCard({
  data,
  editVariantCardOpen,
  setEditVariantCardOpen,
  variantCardOpen,
  setVariantCardOpen,
}: {
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
  variantCardOpen: boolean;
  setVariantCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editVariantCardOpen: boolean;
  setEditVariantCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [variantIndex, setVariantIndex] = useState(0);

  return (
    <>
      {variantCardOpen && (
        <div className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/50 flex justify-center items-center">
          <AddVariantCard data={data} setVariantCardOpen={setVariantCardOpen} />
        </div>
      )}
      {editVariantCardOpen && (
        <div className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/50 flex justify-center items-center">
          <EditVariantCard
            data={data}
            setEditVariantCardOpen={setEditVariantCardOpen}
          />
        </div>
      )}
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p className="text-[18px] text-white leading-[24px]">
              {data.title}
            </p>
            <Button variant="icon">
              <Trash2 color="#ccc" />
            </Button>
          </CardTitle>
          <CardDescription className="text-[#ccc]">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 text-[14px]">
            <div>
              <img src={data.image} alt={data.title} width="100%" />
            </div>
            <div className="flex font-medium justify-between items-center gap-4 text-white">
              <p>Variants</p>
              <div className="border rounded-full py-[2px] px-4">
                <p>
                  {data.variants && data.variants.length > 0
                    ? data.variants.length
                    : 0}
                </p>
              </div>
            </div>
            {data.variants === undefined || data.variants === null ? (
              <div className="text-[#ccc] border border-white p-4 mt-1 border-dashed rounded-lg h-20 flex justify-center items-center">
                <p>No variants yet</p>
              </div>
            ) : (
              <div className="mt-1 flex flex-col gap-2">
                {data.variants &&
                  data.variants.length > 0 &&
                  data.variants.map((e, i) => (
                    <div
                      key={i}
                      className="text-white hover:bg-white/30 border border-white p-4 mt-1 rounded-lg h-16 flex justify-between gap-4 items-center"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold rounded-full py-[2px] px-2 text-[14px] bg-white/20">
                            {e.size}
                          </p>
                          <p
                            className="h-[20px] w-[20px] rounded-full"
                            style={{
                              backgroundColor: e.color,
                            }}
                          ></p>
                        </div>
                        <p>₦{e.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => {
                            setEditVariantCardOpen(() => true);
                            setVariantIndex(() => e.index);
                            localStorage.setItem(
                              "variantIndex",
                              String(e.index)
                            );
                            localStorage.setItem(
                              "productIndex",
                              String(data.id)
                            );
                          }}
                          variant="icon"
                        >
                          <SquarePen />
                        </Button>
                        <Button variant="icon">
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => {
              setVariantCardOpen(true);
              localStorage.setItem("productIndex", String(data.id));
            }}
            className="w-full"
            variant="secondary"
            size="lg"
          >
            <div className="h-[20px] w-[20px] text-[20px] rounded-full border-2 border-white flex justify-center items-center">
              <Plus size={16} color="white" />
            </div>
            <span>Add Variant</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;
