"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useProductContext } from "@/app/context/ProductContext/ProductContext";
import { usePathname } from "next/navigation";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Image from "next/image";

const ProductDetail = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { paramCase, selectedProducts, products } = useProductContext();
  const router = usePathname();
  const getTitle = router.split("/").pop();

  const selectedProduct = products.find(
    (p: any) => paramCase(p.templateName) === getTitle
  );

  const handleDownload = () => {
    setIsOpen(true);
    setTimeout(function () {
      window.open(selectedProduct.details);
    }, 2000);
  };

  const getGithubUsername = (items: any) => {
    return items.split("/")[3];
  };
  const getGithubUrl = (items: any) => {
    return items.split("/")[2];
  };
  const getGithubrepo = (items: any) => {
    return items.split("/")[4];
  };

  const hosturl = selectedProducts?.imageSrc
    ? selectedProducts?.imageSrc
    : "https://adminmart.com";
  const { hostname } = new URL(hosturl);

  return (
    <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link href="/">
          <div className="text-sm text-white bg-dark dark:bg-primary rounded-full text-center inline-block py-1 px-3">
            Back
          </div>
        </Link>
        {selectedProduct ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-10">
              <div>
                <Image
                  src={selectedProduct.imageSrc}
                  width={564}
                  height={395}
                  alt={selectedProduct.imageAlt}
                  className="h-auto w-full object-cover rounded-lg object-center lg:w-full"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-70px font-bold mb-4">
                  {selectedProduct.templateName}
                </h1>
                <h5 className="mb-6 mt-3">{selectedProduct.subtitle}</h5>
                <div className="flex gap-4 mb-10">
                  <Link href={selectedProduct.livePreview} target="_blank">
                    <button className="text-sm border border-primary text-primary  hover:text-white hover:bg-primary py-3 px-7 rounded">
                      Live Preview
                    </button>
                  </Link>
                  <button
                    onClick={handleDownload}
                    title="Download"
                    className="text-sm flex align-middle gap-1 bg-primary rounded py-3 px-7  hover:bg-darkpurple text-white "
                  >
                    Download
                  </button>
                </div>
                <h3 className="font-bold mb-3">Theme Information</h3>
                <table className="table-auto text-sm w-6/12">
                  <tbody>
                    <tr>
                      <td className="py-3">Price</td>
                      <td className="font-bold">
                        :{" "}
                        {selectedProduct.price === 0 ? (
                          <span className="rounded bg-primary mx-3 px-2 py-1 text-white">
                            Free
                          </span>
                        ) : (
                          <span className="rounded bg-dark mx-3 px-2 py-1 text-white">
                            {"$" + selectedProduct.price}
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className=" py-3">Built With</td>
                      <td className="font-bold">
                        :{" "}
                        <div className="mx-3 border border-grey rounded-full text-center inline-block py-1 px-3">
                          {selectedProduct.category}
                        </div>
                      </td>
                    </tr>
                    {selectedProduct.price === 0 ? (
                      <>
                        {getGithubUrl(selectedProduct.details) ===
                          "github.com" ? (
                          <tr>
                            <td className=" py-3">Git Stars : </td>
                            <td className="font-bold">
                              <div>
                                <iframe
                                  src={`https://ghbtns.com/github-btn.html?user=${getGithubUsername(
                                    selectedProduct.details
                                  )}&repo=${getGithubrepo(
                                    selectedProduct.details
                                  )}&type=star&count=true`}
                                  width="150"
                                  height="20"
                                  title="GitHub"
                                ></iframe>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    <tr>
                      <td className=" py-3">Share</td>
                      <td className="font-bold flex items-center mt-[2px]">
                        :
                        <div className="mx-3 rounded-full text-center inline-block py-1 px-1">
                          <div className="flex gap-1">
                            <FacebookShareButton url={selectedProduct?.details}>
                              <FacebookIcon
                                size={30}
                                className="rounded-full"
                              />
                            </FacebookShareButton>
                            <TwitterShareButton url={selectedProduct?.details}>
                              <XIcon size={30} className="rounded-full" />
                            </TwitterShareButton>
                            <LinkedinShareButton url={selectedProduct?.details}>
                              <LinkedinIcon
                                size={30}
                                className="rounded-full"
                              />
                            </LinkedinShareButton>
                            <WhatsappShareButton url={selectedProduct?.details}>
                              <WhatsappIcon
                                size={30}
                                className="rounded-full"
                              />
                            </WhatsappShareButton>
                            <EmailShareButton url={selectedProduct?.details}>
                              <EmailIcon size={30} className="rounded-full" />
                            </EmailShareButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-10">
              {selectedProduct.description ? (
                <h2 className="text-3xl md:text-70px font-bold mb-4">
                  Description
                </h2>
              ) : (
                ""
              )}
              <p>{selectedProduct.description}</p>
              {selectedProduct.features ? (
                <h2 className="text-3xl md:text-70px font-bold mb-4 mt-10">
                  Features
                </h2>
              ) : (
                ""
              )}
              <ul>
                {selectedProduct.features?.map(
                  (feature: string, index: number) => {
                    return (
                      <li key={index} className="flex gap-2 items-center my-1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </>
        ) : (
          "No"
        )}
      </div>

      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between py-3 px-4 border-b border-solid border-lightpurple rounded-t">
                  <h3 className="text-lg font-semibold text-green">
                    Thanks for Downloading
                  </h3>
                  <button onClick={() => setIsOpen(false)}>X</button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <h3 className="flex text-lg font-semibold">
                    To keep us supporting share or follow!
                  </h3>
                  <div className="mt-5 flex gap-2 items-center">
                    <span>Share : </span>
                    <div className="flex gap-1 ml-[6px]">
                      <FacebookShareButton url={selectedProduct?.details}>
                        <FacebookIcon size={30} className="rounded-full" />
                      </FacebookShareButton>
                      <TwitterShareButton url={selectedProduct?.details}>
                        <XIcon size={30} className="rounded-full" />
                      </TwitterShareButton>
                      <LinkedinShareButton url={selectedProduct?.details}>
                        <LinkedinIcon size={30} className="rounded-full" />
                      </LinkedinShareButton>
                      <WhatsappShareButton url={selectedProduct?.details}>
                        <WhatsappIcon size={30} className="rounded-full" />
                      </WhatsappShareButton>
                      <EmailShareButton url={selectedProduct?.details}>
                        <EmailIcon size={30} className="rounded-full" />
                      </EmailShareButton>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2 items-center">
                    <span>Follow : </span>
                    {hostname === "adminmart.com" ? (
                      <div className="flex gap-1">
                        <Link
                          target="_blank"
                          href={`https://www.facebook.com/official.adminmart`}
                        >
                          <FacebookIcon size={30} className="rounded-full" />
                        </Link>
                        <Link target="_blank" href={`#`}>
                          <XIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.linkedin.com/in/admin-mart-5ba892249/`}
                        >
                          <LinkedinIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.instagram.com/adminmart.official/`}
                        >
                          <InstapaperIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.reddit.com/user/adminmart`}
                        >
                          <RedditIcon size={30} className="rounded-full" />
                        </Link>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <Link
                          target="_blank"
                          href={`https://www.facebook.com/wrappixel/`}
                        >
                          <FacebookIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://twitter.com/wrappixel`}
                        >
                          <XIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.linkedin.com/in/admin-mart-5ba892249/`}
                        >
                          <LinkedinIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.instagram.com/adminmart.official/`}
                        >
                          <InstapaperIcon size={30} className="rounded-full" />
                        </Link>
                        <Link
                          target="_blank"
                          href={`https://www.reddit.com/user/adminmart`}
                        >
                          <RedditIcon size={30} className="rounded-full" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ProductDetail;
