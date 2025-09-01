import { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-6 px-4 py-2 rounded-lg bg-indigo-600 text-white dark:bg-yellow-400 dark:text-black shadow hover:opacity-90 transition"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <FeedbackForm />
    </div>
  );
}

export default App;
