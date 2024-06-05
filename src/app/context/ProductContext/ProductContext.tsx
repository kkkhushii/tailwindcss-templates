"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface ProductType {
  id?: number;
  templateName?: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  subtitle?: string;
  livePreview?: string;
  details?: string;
  price?: number;
  popularity?: number;
  createdOn?: string;
  appType?: string;
}

// Define the type for your context
export interface ProductContextType {
  products?: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const ProductContext = createContext<any>(null);

const config = {
  products: [],
  selectedCategory: "All",
  sortBy: "popularity",
  loading: true,
  selectedProduct: null,
  filteredProducts: [],
  selectedType: "all",
  searchTerm: "",

};
// eslint-disable-next-line react/prop-types
export const ProductContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any>(config.products);
  const [searchTerm, setSearchTerm] = useState(config.searchTerm);
  const [loading, setLoading] = useState(config.loading);
  const [sortBy, setSortBy] = useState(config.sortBy);
  const [selectedType, setSelectedType] = useState(config.selectedType);
  const [filteredProducts, setFilteredProducts] = useState<any>(config.filteredProducts);

  // Fetch Products data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const res = await fetch(
        "https://adminmart.github.io/template_api/react.json"
      );
      setLoading(false); // End loading
      const result = await res.json();
      setProducts(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on selected type
    let filtered = products.filter((product: ProductType) =>
      selectedType === "all" ? true : product.appType === selectedType
    );
    // Filter by price if sortBy is "free" or "paid"
    if (sortBy === "free" || sortBy === "paid") {
      filtered = filtered.filter((product: ProductType) =>
        sortBy === "free" ? product.price === 0 : product.price !== 0
      );
    }
    // Apply sorting based on sortBy value
    if (sortBy === "popularity") {
      // Sort by popularity in ascending order
      filtered.sort((a: ProductType, b: ProductType) =>
        (a.popularity || 0) - (b.popularity || 0)
      );
    } else if (sortBy === "newest") {
      // Reverse the array to display the latest data first
      filtered.reverse();
    }
    setFilteredProducts(filtered);
  }, [products, selectedType, sortBy]);

  const paramCase = (t: string) =>
    t
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchTerm,
        setSearchTerm,
        paramCase,
        sortBy,
        setSortBy,
        setProducts,
        selectedType,
        setSelectedType,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

//export default ProductContext;
export const useProductContext = () => useContext(ProductContext);
