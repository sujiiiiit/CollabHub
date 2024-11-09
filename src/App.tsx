import { Route, Routes } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthRoute from "@/components/AuthRoute";
import Header from "./components/Header";
import CreateRole from "@/pages/CreateRole";
import Repos from "@/pages/Repos";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Activity from "@/pages/Activity/activity";
import AI from "@/pages/ai/ai"

function App() {
  return (
    <ScrollArea className="relative w-full h-dvh">
      <Header />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/activity" element={<AuthRoute component={Activity} />} />
        {/* <Route path="/create" element={<CreateRole/>} /> */}
        <Route path="/repo" element={<Repos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<AuthRoute component={CreateRole} />} />
        <Route path="/ai" element={<AI/>} />
      </Routes>
    </ScrollArea>
  );
}

export default App;
