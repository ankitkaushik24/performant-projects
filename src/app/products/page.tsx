import axiosInstance from "@/lib/axiosInstance";
import React from "react";
import ProductServiceProvider from "./ProductServiceProvider";
import ProductsContainer from "./ProductsContainer";

const ProductsPage = async () => {
  const response = await axiosInstance.get("/products");
  const { products } = await response.data;

  if (products) {
    return (
      <ProductServiceProvider products={products}>
        <ProductsContainer />
      </ProductServiceProvider>
    );
  }
  return <div>ProductsPage</div>;
};

export default ProductsPage;
