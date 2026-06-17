import Hero from "./components/Hero";
import Counter from "./components/Counter";
import Progress from "./components/Progress";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Counter />
      <Progress />
    </main>
  );
}