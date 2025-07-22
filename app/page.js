import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Welcome to Smart POS</h1>
        <p className="mt-2 text-gray-600">Manage sales and inventory with ease.</p>
      </main>
    </>
  );
}
