import React from "react";
import { useProductContext } from "../../app/context/ProductContext/ProductContext";

const ProductFilter = () => {

  const { selectedType, sortBy, setSelectedType, setSortBy } = useProductContext();

  const handleTypeChange = (e: { target: { value: any; }; }) => {
    setSelectedType(e.target.value);
    setSortBy("all");
    setSortBy("popularity");
  };
  const handleSortChange = (e: { target: { value: any; }; }) => {
    setSortBy(e.target.value);
  };
  const handleSortByNewest = () => {
    setSortBy("newest");
  };
  const handleSortByPopularity = () => {
    setSortBy("popularity");
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 xl-px-8 2xl:px-20">
      <div className="lg:flex md:flex justify-between p-2 bg-grey bg-opacity-30 max-w-7xl mx-auto rounded-lg">
        <div className="flex justify-start items-center  p-2">
          <h4 className="mr-2">Type by:</h4>
          <select className="firstselect border border-opacity-50 rounded-lg border-grey dark:border-0 focus:border-primary px-2 py-1"
            value={selectedType}
            onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="website">Website</option>
            <option value="admin-template">Admin Template</option>
            <option value="landingpage">Landingpage</option>
          </select>
        </div>
        <div className="flex lg:justify-end items-center gap-3 p-2">
          <h4 className="mr-2">Sort by:</h4>
          <select className="select border border-grey dark:border-0 px-2 py-1 rounded-lg focus:border-primary "
            value={sortBy}
            onChange={handleSortChange}>
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
          <div className="inline-flex bg-white dark:bg-dark rounded-lg shadow-sm">
            <button
              onClick={handleSortByNewest}
              type="button"
              className={`py-2 px-3 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-xs ${sortBy === 'newest' ? 'bg-primary text-white' : null
                }`}
            >
              Newest
            </button>
            <button
              onClick={handleSortByPopularity}
              type="button"
              className={`py-2 px-3 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-xs ${sortBy === 'popularity' ? 'bg-primary text-white' : null
                }`}
            >
              Popular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFilter;
