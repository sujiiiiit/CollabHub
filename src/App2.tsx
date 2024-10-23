import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'; // Assuming you're using Radix UI for Tabs

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5000/api/data?${query}`); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* search section */}
      <div id="roleSearch" className="w-full flex justify-center px-2 py-5">
        <input
          type="text"
          placeholder="Search roles..."
          className="border p-2 rounded w-full max-w-md"
          name="search"
          onChange={handleFilterChange}
        />
      </div>

      {/* tabs section */}
      <Tabs id="homeTabs" defaultValue="search">
        <div className="relative w-full border-b flex justify-center">
          <TabsList className="m-auto">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="your_activity">Your activity</TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full max-w-6xl m-auto p-4 relative">
          <TabsContent value="search">
            <div className="flex items-center justify-start gap-3">
              <div>
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="border p-2 rounded"
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="techStack">Tech Stack:</label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  className="border p-2 rounded"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <ul>
              {data.map((item, index) => (
                <li key={index} className="border p-2 mb-2 rounded">
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="your_activity">
            Change your password here.
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Home;