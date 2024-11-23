import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar/>
      <Hero />
    </div>
  );
}
