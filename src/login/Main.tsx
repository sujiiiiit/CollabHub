import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  _json: {
    avatar_url: string;
  };
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>('http://localhost:5000/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then(() => setUser(null))
      .catch(error => console.error('Logout failed', error));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <img src={user._json.avatar_url} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in</p>
          <button onClick={handleLogin}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
};

export default App;
