"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useProductContext } from "@/app/context/ProductContext/ProductContext";
import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import ProductFilter from "./ProductFilter";
import Skeleton from "./Skeleton";

export const paginate = (items: any, pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(0, startIndex + pageSize); // 0, 9
};
const Productpage = () => {
  const { products, paramCase, loading, filteredProducts } = useProductContext();
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const handelInfiniteScroll = async () => {
    setPage((prev) => prev + 1);
  };
  const paginatedPosts = paginate(filteredProducts, page, pageSize);
  return (
    <>
      <ProductFilter />
      {loading ? (
        <Skeleton />
      ) : (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl-px-8 2xl:px-20">
          {filteredProducts.length === 0 ? ( // Check if filteredProducts is empty
            <div className="text-center mt-8 text-gray-600">
              No data found.
            </div>
          ) : (
            <div className="mt-6 my-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-8">
              {paginatedPosts.map((items: any) => (
                <div
                  key={items.id + items.templateName}
                  className="rounded-lg overflow-hidden"
                >
                  <div className="w-full overflow-hidden imageContainer relative">
                    <Link href={`/products/${paramCase(items.templateName)}`}>
                      <Image
                        src={items.imageSrc}
                        width={564}
                        height={395}
                        title="Live Preview"
                        alt={items.imageAlt}
                        className="h-full w-full object-cover object-center lg:w-full"
                      />
                    </Link>
                    <div className="absolute top-2 right-2">
                      {items.price === 0 ? (
                        <span className="rounded bg-green px-2 py-1 text-white">
                          Free
                        </span>
                      ) : (
                        <span className="rounded bg-dark px-2 py-1 text-white">
                          {"$" + items.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 py-3">
                    <div className="w-[70%] no-wrap truncate">
                      <h3 className="text-sm font-semibold truncate ">
                        {items.templateName}
                      </h3>
                      <small className="opacity-75">{items.subtitle}</small>
                    </div>
                    <div className="text-sm bottom-1 w-25 font-medium  shrink-0">
                      <div className="rounded-x flex gap-2">
                        <Link href={`/products/${paramCase(items.templateName)}`}>
                          <button
                            title="Download"
                            className="text-sm px-2 border border-primary flex items-center gap-1 bg-primary/10 text-primary rounded p-1 hover:bg-primary hover:text-white "
                          >
                            Get <IconDownload className="h-3 w-3" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>)}
          <div className="text-center">
            {filteredProducts.length > paginatedPosts.length ? (
              <button
                className="bg-primary mb-5 hover:bg-primary/90 text-white py-3 px-7 rounded"
                onClick={handelInfiniteScroll}
              >
                Load More
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Productpage;
