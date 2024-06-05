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
      let popularityFiltered = filtered.filter((product: ProductType) => product.popularity >= 101 && product.popularity <= 399);

      // Sort by exact popularity in ascending order (101, 102, ..., 399)
      popularityFiltered = popularityFiltered.sort((a: ProductType, b: ProductType) => a.popularity - b.popularity);

      // Get the remaining products that are not in the 101-399 popularity range
      let otherProducts = filtered.filter((product: ProductType) => product.popularity < 101 || product.popularity > 399);

      // Sort the remaining products by popularity in ascending order
      otherProducts = otherProducts.sort((a: ProductType, b: ProductType) => a.popularity - b.popularity);

      // Combine the sorted popularityFiltered products with the rest
      filtered = [...popularityFiltered, ...otherProducts];
    } else if (sortBy === "newest") {
      // Reverse the array to display the last data first
      filtered = filtered.reverse();
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
