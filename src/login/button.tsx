

const GitHubLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <button onClick={handleLogin}>Login with GitHub</button>
  );
};

export default GitHubLogin;
