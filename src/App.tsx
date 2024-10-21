import { Route, Routes } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Home from "./pages/Home";
import Header from "./components/Header";
import CreateRole from "@/pages/CreateRole";
import Repos from "@/pages/Repos";

function App() {
  return (
    <ScrollArea className="relative w-full h-dvh">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRole/>} />
        <Route path="/repo" element={<Repos/>} />
      </Routes>
    </ScrollArea>
  );
}

export default App;
