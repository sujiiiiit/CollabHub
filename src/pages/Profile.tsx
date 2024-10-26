const App = () => {
  return (

      <main className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner & Profile Picture */}
          <div className="relative bg-gradient-to-r from-green-400 to-green-300 h-48">
            <div className="absolute -bottom-12 left-8">
              <img
                src="https://via.placeholder.com/120"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="mt-8">
              {/* Profile Info */}
              <h2 className="text-3xl font-bold text-gray-800">Username</h2>
              <p className="text-lg text-gray-500">Full-Stack Developer | Open Source Enthusiast</p>
              <p className="text-gray-600 mt-1">City, State, Country</p>
            </div>

            {/* Bio Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Bio</h3>
              <p className="text-gray-700 leading-relaxed">A brief description about the user. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-green-500 hover:text-green-400">LinkedIn</a>
                <a href="#" className="text-green-500 hover:text-green-400">GitHub</a>
                <a href="#" className="text-green-500 hover:text-green-400">Website</a>
              </div>
            </section>

            {/* Skills Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React", "Node.js", "Python"].map(skill => (
                  <span key={skill} className="bg-green-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Roles Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {["Frontend Developer", "Backend Developer", "Project Manager"].map(role => (
                  <span key={role} className="bg-green-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Experience</h3>
              <details className="py-3">
                <summary className="cursor-pointer text-gray-700 font-semibold">Company Name</summary>
                <p className="text-gray-600 ml-4 mt-2">Job Title</p>
              </details>
            </section>

            {/* Ratings Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">User Ratings</h3>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-600">(Rated by 25 users)</span>
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed">"Excellent team player and knowledgeable in various fields of development!"</p>
            </section>

            {/* Resume Upload Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Resume</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Last Updated: October 2024</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none">
                  Upload Resume
                </button>
              </div>
            </section>

            {/* Collaboration Features Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Current Projects</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                <li>Project 1 - <a href="#" className="text-green-500 hover:underline">View Details</a></li>
                <li>Project 2 - <a href="#" className="text-green-500 hover:underline">View Details</a></li>
              </ul>
            </section>

            {/* Settings Section */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Receive Project Updates</span>
                  <input type="checkbox" className="toggle-checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable Collaboration Requests</span>
                  <input type="checkbox" className="toggle-checkbox" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
  );
};

export default App;