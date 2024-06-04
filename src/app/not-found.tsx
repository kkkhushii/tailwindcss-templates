import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 Page | The page you are looking for is not available try again after some time",
};

const ErrorPage = () => {
    return (
        <>
            <NotFound />
        </>
    );
};

export default ErrorPage;
