import React, { useEffect, useRef } from "react";
import { useProductContext } from "../../app/context/ProductContext/ProductContext";
import Link from "next/link";

const Search = (): JSX.Element => {
  const { searchTerm, setSearchTerm, products, paramCase } = useProductContext();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchBoxRef]);

  const filteredData = products.filter(
    (item) =>
      item.templateName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ["NextJs", "React"].includes(item.category)
  );

  return (
    <>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTextChange}
          placeholder="Search"
          className="py-2 px-4 block w-full border rounded-lg"
        />
        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>
      {searchTerm && (
        <div className="absolute top-[70px] right-[70px] max-w-4xl w-full bg-white shadow-lg rounded-lg z-50 py-2 px-5 " ref={searchBoxRef}>
          {filteredData.length > 0 ? (
            <div className="mx-auto ">
              <h2 className="font-semibold pt-2">Search Results</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredData.map((item) => (
                  <div key={item.id}>
                    <Link href={`/product/${paramCase(item.templateName)}`}>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
                        <div className="imageContainer">
                          <img
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            width={0}
                            height={0}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <h3 className="text-sm font-semibold text-black">
                          {item.templateName}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="p-4">No Data Found</p>
          )}
        </div>
      )}
    </>
  );
};
export default Search;