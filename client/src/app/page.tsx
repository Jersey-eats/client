import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RecentOrders } from "@/components/home/RecentOrders";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecentOrders />
      <HowItWorks />
    </>
  );
}
