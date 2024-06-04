import Productpage from "@/components/Products/Product";
import Banner from "../components/Banner/index";

export default function Home() {
  return (
    <main className="pt-[65px]">
      <Banner />
      <Productpage />
    </main>
  );
}
