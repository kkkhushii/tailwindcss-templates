import ProductDetail from "@/components/Products/ProductDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detail | TailwindcssTemplates.com",
};

const ProductDetailPage = () => {
    return (
        <>
            <main className="pt-[65px]">
                <ProductDetail />
            </main>
        </>
    );
};

export default ProductDetailPage;
