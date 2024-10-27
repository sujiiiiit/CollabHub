import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Activity() {
  return (
    <>
      {/* tabs section */}
      <Tabs id="homeTabs" defaultValue={"application"} className="pt-10">
        <div className="relative w-full border-b flex max-w-6xl m-auto">
          <TabsList >
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="createdRoles">Created roles</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full max-w-6xl m-auto p-4 relative">
          <TabsContent value="application"></TabsContent>
          <TabsContent value="createdRoles">
            Change your password here.
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
