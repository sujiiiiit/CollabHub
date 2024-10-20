import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Filters, { CategoryFilter } from "@/pages/components/filter";
import ForYou from "@/pages/components/forYou";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      {/* max-w-6xl */}
      <div className="sticky  mx-auto w-full">
        {/* search section  */}
        <div id="roleSearch" className="w-full flex justify-center px-2 py-5">
          <div
            className="w-full flex items-center justify-center gap-[2px]
        "
          >
            <div className=" w-full max-w-md flex bg-gray-100 justify-start items-center pl-4 px-3 py-2.5  rounded-s-full gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
              <input
                className=" w-full max-w-md outline-none bg-transparent placeholder:text-black/70"
                type="text"
                placeholder="Find your perfect role "
              />
            </div>
            <div className="flex bg-gray-100 justify-start items-center px-3 py-2.5  rounded-e-full gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
              </svg>
              <input
                className="outline-none w-full bg-transparent placeholder:text-black/70"
                type="text"
                placeholder="Location"
              />
            </div>
          </div>
        </div>

        {/* tabs section  */}
        <Tabs id="homeTabs" defaultValue="search">
          <div className="sticky w-full border-b flex justify-center">
            <TabsList className="m-auto">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="your_activity">Your activity</TabsTrigger>
            </TabsList>
          </div>
          <div className="w-full max-w-6xl m-auto p-4 relative">
            <TabsContent value="search">
              <div className="flex items-center justify-start gap-3">
                <Filters />

                <CategoryFilter />
              </div>

              <ForYou />
            </TabsContent>
            <TabsContent value="your_activity">
              Change your password here.
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <button className="fixed bottom-5 right-5 flex justify-center items-center">
        <Link
          to={"/create"}
          className="flex w-full cursor-pointer text-white mx-auto relative no-underline font-semibold rounded-full overflow-hidden p-[3px] isolate before:content-[''] before:absolute before:top-0 before:left-0 before:w-[400%] before:h-full before:bg-[linear-gradient(115deg,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b)] before:bg-[length:25%_100%] before:animate-[customCreateBtn-animation_3s_linear_infinite]  before:transition-[transform] before:duration-2000 before:ease-out before:animate-running before:duration-[3s] before:translate-x-0  before:translate-y-0"
        >
          <span
            className="relative flex items-center justify-center gap-2 w-full py-2 px-6 text-base bg-black rounded-full h-full
"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
            </svg>
            <span>Create a role</span>
          </span>
        </Link>
      </button>
    </>
  );
};

export default Home;
