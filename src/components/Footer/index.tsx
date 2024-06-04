import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-8 border-t border-dark/10">
      <h3 className="text-center font-semibold opacity-75 text-sm md:text-base">
        All rights reserved by <Link href="/"> tailwindcsstemplates.com </Link>
      </h3>
    </div>
  );
};

export default Footer;
