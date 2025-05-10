import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Plus, SquarePen, Trash2, Trash2Icon, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import AddVariantCard from "./AddVariantCard";
import EditVariantCard from "./EditVariantCard";

function ProductCard() {
  const [variantCardOpen, setVariantCardOpen] = useState(false);
  const [editVariantCardOpen, setEditVariantCardOpen] = useState(false);
  const [variants, setVariants] = useState<any[]>([
    {
      name: "Food",
    },
    {
      name: "Food",
    },
  ]);

  return (
    <>
      {variantCardOpen && (
        <div className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/50 flex justify-center items-center">
          <AddVariantCard setVariantCardOpen={setVariantCardOpen} />
        </div>
      )}
      {editVariantCardOpen && (
        <div className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/50 flex justify-center items-center">
          <EditVariantCard setEditVariantCardOpen={setEditVariantCardOpen} />
        </div>
      )}
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <p className="text-[18px] text-white">Add Product</p>
            <Button variant="icon">
              <Trash2 color="#ccc" />
            </Button>
          </CardTitle>
          <CardDescription className="text-[#ccc]">
            Create a new product to add variants to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 text-[14px]">
            <div className="flex font-medium justify-between items-center gap-4 text-white">
              <p>Variants</p>
              <div className="border rounded-full py-[2px] px-4">
                <p>0</p>
              </div>
            </div>
            {variants.length < 1 ? (
              <div className="text-[#ccc] border border-white p-4 mt-1 border-dashed rounded-lg h-20 flex justify-center items-center">
                <p>No variants yet</p>
              </div>
            ) : (
              <div className="mt-1 flex flex-col gap-2">
                {variants.map((_, i) => (
                  <div
                    key={i}
                    className="text-white hover:bg-white/30 border border-white p-4 mt-1 rounded-lg h-16 flex justify-between gap-4 items-center"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold rounded-full py-[2px] px-2 text-[14px] bg-white/20">
                          XS
                        </p>
                        <p className="h-[20px] w-[20px] bg-blue-600 rounded-full"></p>
                      </div>
                      <p>₦2.00</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => {
                          setEditVariantCardOpen(true);
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
