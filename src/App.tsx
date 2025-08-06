import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import CameraCapture from "./pages/CameraCapture";
import AnalyzePlant from "./pages/AnalyzePlant";
import DiagnoseResults from "./pages/DiagnoseResults";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Treatments from "./pages/Treatments";
import Guides from "./pages/Guides";
import NearbyShops from "./pages/NearbyShops";
import SellProduce from "./pages/SellProduce";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/diagnose/capture" element={<CameraCapture />} />
          <Route path="/diagnose/analyze" element={<AnalyzePlant />} />
          <Route path="/diagnose/results" element={<DiagnoseResults />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/shops" element={<NearbyShops />} />
          <Route path="/sell" element={<SellProduce />} />
          <Route path="/sell/new" element={<SellProduce />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
