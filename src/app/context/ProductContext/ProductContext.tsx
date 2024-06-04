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
  searchProduct: "",
  selectedCategory: "All",
  sortBy: "popularity",
  loading: true,
  selectedProduct: null,
  filteredProducts: [],
  selectedType: "all"

};
// eslint-disable-next-line react/prop-types
export const ProductContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any>([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedType, setSelectedType] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<any>([]);


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
    if (sortBy === "free") {
      filtered = filtered.filter((product: ProductType) => product.price === 0);
    } else if (sortBy === "paid") {
      filtered = filtered.filter((product: ProductType) => product.price !== 0);
    } else if (sortBy === "popularity") {
      // Filter products within the popularity range of 101 to 399
      filtered = filtered.filter((product: ProductType) => product.popularity >= 101 && product.popularity <= 399);

      // Sort by popularity within the range
      filtered = filtered.sort((a: ProductType, b: ProductType) => b.popularity - a.popularity);

      // Reverse the array to display the newest data first
    }
    filtered.reverse();
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