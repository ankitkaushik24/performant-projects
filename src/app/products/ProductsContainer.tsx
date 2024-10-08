"use client";

import { FC } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSignal } from "@preact/signals-react";
import { useProductSerivce } from "./ProductServiceProvider";
import { CartItem } from "./product.model";
import Image from "next/image";
import { useSignals } from "@preact/signals-react/runtime";

const QuantityInput = ({ item }: { item: CartItem }) => {
  return (
    <Input
      type="number"
      value={item.quantity.value}
      onChange={(e) => {
        item.quantity.value = parseInt(e.target.value);
      }}
      className="w-16 text-center"
    />
  );
};

const Cart: FC = () => {
  useSignals();
  const isCartOpen = useSignal(false);
  const { cartItems, totalQuantity, removeItem, totalPrice } =
    useProductSerivce();

  return (
    <Dialog
      open={isCartOpen.value}
      onOpenChange={(isOpen) => (isCartOpen.value = isOpen)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShoppingCart className="mr-2 h-5 w-5" />
          <Badge variant="secondary" className="ml-2">
            {totalQuantity}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogDescription>
            Review your items and proceed to checkout
          </DialogDescription>
        </DialogHeader>
        {cartItems.value.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.value.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.discountPercentage}%</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            item.quantity.value -= 1;
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <QuantityInput item={item} />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            item.quantity.value += 1;
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${item.finalPrice}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex flex-col items-end">
              <p className="text-2xl font-bold">Total: ${totalPrice}</p>
              <Button className="mt-4">Proceed to Checkout</Button>
            </div>
          </>
        ) : (
          <p className="text-center py-4">Your cart is empty</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

const QuantityCountDisplay = ({ item }: { item: CartItem }) => {
  useSignals();
  if (item.quantity.value > 0) {
    return (
      <Badge variant="secondary" className="ml-auto">
        {item.quantity.value}
      </Badge>
    );
  }

  return null;
};

const ProductsContainer = () => {
  const { products, addToCart } = useProductSerivce();

  console.log("ProductsContainer rendered!");

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Product List</h1>
        <div className="flex-1"></div>
        <Cart />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={200}
                height={200}
                priority={idx <= 6}
                className="w-full h-48 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.title}</CardTitle>
              <div className="flex justify-between items-center mt-2">
                <p className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </p>
                {product.discountPercentage > 0 && (
                  <Badge variant="destructive">
                    {product.discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Cart <QuantityCountDisplay item={product} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductsContainer;
