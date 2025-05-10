import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const SunIcon = getIcon("Sun");
  const MoonIcon = getIcon("Moon");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: !darkMode ? "dark" : "light",
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md dark:bg-surface-900/80 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              className="text-accent mr-2"
            >
              {React.createElement(getIcon("Home"), {
                size: 28
              })}
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NestQuest
            </h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? (
                  React.createElement(SunIcon, { size: 20, className: "text-yellow-300" })
                ) : (
                  React.createElement(MoonIcon, { size: 20, className: "text-surface-600" })
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-surface-100 dark:bg-surface-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-surface-600 dark:text-surface-400 text-sm">
          <p>© {new Date().getFullYear()} NestQuest. Find your dream property today.</p>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;