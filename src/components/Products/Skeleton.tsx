const Skeleton = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 xl-px-8 2xl:px-20">
      <div className="mt-6 my-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-8">
        {[1, 2, 3, 4].map((index: any) => (
          <div key={index} className="space-y-8 text-center animate-pulse md:space-y-0  border box-shadow  border-grey dark:border-darkgrey rounded-lg overflow-hidden">
            <div className="h-[190px] flex items-center justify-center w-full overflow-hidden imageContainer relative">
              <svg
                className="w-24 h-24 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="flex items-center gap-3 p-3">
              <div className="w-[70%] no-wrap truncate">
                <div className="h-2 bg-dark/10 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2.5 bg-dark/10 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Skeleton;
