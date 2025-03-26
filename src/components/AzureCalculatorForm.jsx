import { useState } from 'react';
import { motion } from 'framer-motion';

const inputAnimation = {
  hover: { y: -2 },
  focus: { y: -2 }
};

export default function AzureCalculatorForm({ onCalculate }) {
  const [formData, setFormData] = useState({
    vmInstances: 1,
    vmType: 'D2s_v3',
    storageGB: 100,
    hoursRunning: 730,
    region: 'eastus'
  });

  const vmOptions = [
    { value: 'D2s_v3', label: 'D2s v3 (2 vCPU, 8GB RAM)' },
    { value: 'D4s_v3', label: 'D4s v3 (4 vCPU, 16GB RAM)' },
    { value: 'B2ms', label: 'B2ms (2 vCPU, 8GB RAM)' }
  ];

  const regionOptions = [
    { value: 'eastus', label: 'East US' },
    { value: 'westus', label: 'West US' },
    { value: 'northeurope', label: 'North Europe' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('Instances') || name.endsWith('GB') || name.endsWith('Hours') 
        ? Math.max(0, parseInt(value) || 0)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {
      vmCost: 85 * formData.vmInstances,
      storageCost: 5 * formData.storageGB,
      totalCost: 85 * formData.vmInstances + 5 * formData.storageGB
    };
    onCalculate(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Virtual Machines Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          Virtual Machines
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover="hover">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Instances
            </label>
            <motion.input
              type="number"
              name="vmInstances"
              min="1"
              value={formData.vmInstances}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all bg-white hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              variants={inputAnimation}
              placeholder="1-100"
            />
          </motion.div>

          <motion.div whileHover="hover">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              VM Type
            </label>
            <motion.select
              name="vmType"
              value={formData.vmType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all appearance-none bg-white hover:bg-white focus:bg-white text-gray-800"
              variants={inputAnimation}
            >
              {vmOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </div>
      </div>

      {/* Storage Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
          Storage
        </h3>
        
        <motion.div whileHover="hover">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Storage Size (GB)
          </label>
          <motion.input
            type="number"
            name="storageGB"
            min="10"
            value={formData.storageGB}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all bg-white hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
            variants={inputAnimation}
            placeholder="10-1000"
          />
        </motion.div>
      </div>

      {/* Configuration Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
          Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover="hover">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Running Hours
            </label>
            <motion.input
              type="number"
              name="hoursRunning"
              min="1"
              max="744"
              value={formData.hoursRunning}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 transition-all bg-white hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              variants={inputAnimation}
              placeholder="1-744"
            />
          </motion.div>

          <motion.div whileHover="hover">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Azure Region
            </label>
            <motion.select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 transition-all appearance-none bg-white hover:bg-white focus:bg-white text-gray-800"
              variants={inputAnimation}
            >
              {regionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Calculate Costs
      </motion.button>
    </form>
  );
}