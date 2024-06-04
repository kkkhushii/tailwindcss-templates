// import React, { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useProductContext} from '../../app/context/ProductContext/ProductContext'

// interface ProfileData {
//   filter: any;
//   map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
//   id: number;
//   templateName: string;
//   imageSrc: string;
//   imageAlt: string;
//   category: string;
//   producType: string;
//   livePreview: string;
//   details: string;
//   price: number;
// }

// const Search = (): JSX.Element => {
//   const { searchTerm, setSearchTerm } = useProductContext();
//   const [searchText, setSearchText] = useState("");
//   const [products, setProducts] = useState([]);

//   const handleSearchTextChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSearchText(event.target.value);
//   };
//   // ...............


//   const searchBoxRef = useRef<HTMLDivElement>(null);


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchBoxRef.current &&
//         !searchBoxRef.current.contains(event.target as Node)
//       ) {
//         setSearchText("");
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [searchBoxRef]);

//   // ...............

//   const filteredData = products?.filter((item: ProfileData) =>
//     ["NextJs", "React"].includes(item.category)
//   );

//   const paramCase = (t: string) =>
//     t
//       .toLowerCase()
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");



//   return (
//     <>
//       <div className="hidden relative md:block">
//         <input
//           type="text"
//           id="hs-trailing-icon"
//           name="hs-trailing-icon"
//           value={searchTerm}
//           onChange={handleSearchTextChange}
//           className="py-2 px-4 pe-11 block w-full border border-dark/10 shadow-sm rounded-lg text-sm focus:z-10 focus:border-dark focus:ring-blue-500  dark:bg-white/05 dark:border-white/10 "
//           placeholder="Search"
//         />
//         <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
//           <svg
//             className="flex-shrink-0 size-4"
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="11" cy="11" r="8"></circle>
//             <path d="m21 21-4.3-4.3"></path>
//           </svg>
//         </div>
//       </div>

//       {/* COMPONENT to Render On Search */}

//       {searchText !== "" && (
//         <div
//           className="searchBoxResult shadowproduct py-2 px-5 rounded-lg"
//           ref={searchBoxRef}
//           style={{ zIndex: "1000" }}
//         >
//           {filteredData ? (
//             <div className="mx-auto max-w-3xl">
//               <h2 className="font-semibold pt-2">Search Results</h2>
//               <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//                 {filteredData
//                   .filter((items: ProfileData) =>
//                     items.templateName
//                       .toLowerCase()
//                       .includes(searchText.toLowerCase())
//                   )
//                   .map((items: ProfileData) => (
//                     <div key={items.id}>
//                       <Link href={`/product/${paramCase(items.templateName)}`}>
//                         <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-50">
//                           <div className="imageContainer">
//                             <Image
//                               src={items.imageSrc}
//                               alt={items.imageAlt}
//                               className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                             />
//                           </div>
//                         </div>

//                         <div className="mt-1 flex justify-between">
//                           <h3 className="text-sm font-semibold text-black">
//                             {items.templateName}
//                           </h3>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 {filteredData.filter((items: { templateName: string }) =>
//                   items.templateName
//                     .toLowerCase()
//                     .includes(searchText.toLowerCase())
//                 ).length === 0 && (
//                     <div className="my-2">
//                       <p className="text-sm text-darkgrey md:text-lg font-semibold">
//                         Sorry No Results found
//                       </p>
//                     </div>
//                   )}
//               </div>
//             </div>
//           ) : (
//             "No Data Found"
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Search;


import React, { useEffect, useRef } from "react";
import { useProductContext } from "../../app/context/ProductContext/ProductContext";
import Link from "next/link";
import Image from "next/image";

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