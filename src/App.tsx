import { Route, Routes, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthRoute from "@/components/AuthRoute";
import Header from "./components/Header";
import CreateRole from "@/pages/CreateRole";
import Repos from "@/pages/Repos";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Activity from "@/pages/Activity/activity";
import AI from "@/pages/ai/ai"
import Resume from "@/pages/Activity/Resume"

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/resume"];

  return (
    <ScrollArea className="relative w-full h-dvh">
      {!hideHeaderRoutes.some(route => location.pathname.startsWith(route)) && <Header />}

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/activity" element={<AuthRoute component={Activity} />} />
        {/* <Route path="/create" element={<CreateRole/>} /> */}
        <Route path="/repo" element={<Repos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<AuthRoute component={CreateRole} />} />
        <Route path="/ai" element={<AI/>} />
        <Route path="/resume/:id" element={<Resume />} />
      </Routes>
    </ScrollArea>
  );
}

export default App;
