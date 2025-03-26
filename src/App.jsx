import { useState } from 'react';
import AzureCalculatorForm from './components/AzureCalculatorForm';
import AzureCostResults from './components/AzureCostResults';
import { motion } from 'framer-motion';

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-4 sm:px-6 lg:px-8 py-12"
      >
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
          >
            Azure Cloud Cost Estimator
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accurately predict your monthly Azure infrastructure costs with our interactive calculator
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 w-full">
          {/* Form Panel */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
              <h2 className="text-xl font-semibold text-white">Configuration</h2>
              <p className="text-blue-100">Enter your Azure resource details</p>
            </div>
            <div className="p-6">
              <AzureCalculatorForm onCalculate={setResults} />
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-6">
              <h2 className="text-xl font-semibold text-white">Cost Analysis</h2>
              <p className="text-purple-100">Your estimated monthly costs</p>
            </div>
            <div className="p-6">
              <AzureCostResults results={results} />
            </div>
          </motion.div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Tool created with React, Tailwind CSS, and Vite</p>
        </footer>
      </motion.div>
    </div>
  );
}