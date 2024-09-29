import { SkeletonCard } from "@/components/SkeletonCard";
import React from "react";

const ProductsLoading = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      {Array(10)
        .fill(null)
        .map((_, idx) => (
          <SkeletonCard key={idx} size={"30%"} />
        ))}
    </div>
  );
};

export default ProductsLoading;
