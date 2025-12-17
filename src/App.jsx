import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import Process from "./pages/Process";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:id" element={<BrandDetail />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
