"use client";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 font-[Lexend] text-center px-4">
      {/* Header Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-3 flex flex-col items-center">
  <img
    src="/dabba.png"
    alt="Dabba Tracker Logo"
    className="w-32 h-32 mb-3 object-contain" // 
  />
  Dabba Tracker
</h1>

      <p className="text-gray-700 text-lg mb-8">
        Smart Way to Track Your Dabba Deliveries!
      </p>

      {/* Role Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Admin Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-2">👨‍💼 Admin Panel</h2>
          <p className="text-gray-600 mb-4">
            Manage orders, agents, and delivery reports.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-gray-200 text-yellow-800 rounded-lg hover:bg-gray-300 transition"
            >
              Signup
            </a>
          </div>
        </div>

        {/* Agent Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">🚴 Agent Panel</h2>
          <p className="text-gray-600 mb-4">
            View assigned deliveries and update status.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="/agent/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Login
            </a>
            <a
              href="/agent/signup"
              className="px-4 py-2 bg-gray-200 text-green-800 rounded-lg hover:bg-gray-300 transition"
            >
              Signup
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        © 2025 Dabba Tracker | Made with 💛 by Mitanshi Jain
      </footer>
    </div>
  );
}
