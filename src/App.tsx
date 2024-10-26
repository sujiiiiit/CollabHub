import { Route, Routes } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import Home from "./pages/Home";
import AuthRoute from "@/components/AuthRoute";
import Header from "./components/Header";
import CreateRole from "@/pages/CreateRole";
import Repos from "@/pages/Repos";
import Profile from "@/pages/Profile";


function App() {
  return (
    <ScrollArea className="relative w-full h-dvh">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity" element={<Home />} />
        {/* <Route path="/create" element={<CreateRole/>} /> */}
        <Route path="/repo" element={<Repos/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<AuthRoute component={CreateRole} />} />

      </Routes>
    </ScrollArea>
  );
}

export default App;
