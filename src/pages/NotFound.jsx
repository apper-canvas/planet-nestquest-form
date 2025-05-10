import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const HomeIcon = getIcon("Home");
  const AlertCircleIcon = getIcon("AlertCircle");

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Clean up timer on unmount
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary"
      >
        <AlertCircleIcon size={48} />
      </motion.div>
      
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-surface-600 dark:text-surface-400 text-xl max-w-lg mb-8"
      >
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary flex items-center gap-2 text-base px-6 py-3"
        >
          <HomeIcon size={20} />
          <span>Return Home</span>
        </button>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-surface-500 dark:text-surface-500"
      >
        You'll be redirected to the home page in a few seconds...
      </motion.p>
    </motion.div>
  );
};

export default NotFound;