import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { id: "profile", label: "Profile" },

  { id: "contributions", label: "Contributions" },
];

type UserProfileSidebarProps = {
  selectedTab: string;
  onTabChange: (tabId: string) => void;
};

export default function UserProfileSidebar({
  selectedTab,
  onTabChange,
}: UserProfileSidebarProps) {
  return (
    <div className="w-full md:w-64 bg-white shadow-md md:min-h-screen p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="SD" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="mt-2 text-xl font-semibold">Sujit Dwivedi</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={selectedTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left font-normal"
                onClick={() => onTabChange(item.id)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
