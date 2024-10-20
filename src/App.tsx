import { Route, Routes } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <ScrollArea className="relative w-full h-dvh">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ScrollArea>
  );
}

export default App;
