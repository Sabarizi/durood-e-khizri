export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">
        🌙 Durood-e-Khizri
      </h1>

      <p className="mt-4 text-gray-300 max-w-xl mx-auto">
        Durood-e-Shareef ek azeem ibadat hai jisse Allah rehmat aur barkat nazil farmata hai.
      </p>

      <div className="mt-8 flex justify-center">
        <img
          src="/droodpic.jpg"
          alt="Durood"
          className="w-72 md:w-96 rounded-2xl shadow-2xl border border-yellow-500"
        />
      </div>
    </section>
  );
}