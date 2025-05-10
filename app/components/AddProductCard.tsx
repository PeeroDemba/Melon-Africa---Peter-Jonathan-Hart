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
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { Textarea } from "./ui/textarea";

function AddProductCard({
  setProductCardOpen,
}: {
  setProductCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="e.g. Sneakers, Shirt" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the product"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => {
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
