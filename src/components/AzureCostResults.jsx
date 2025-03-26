import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AzureCostResults({ results }) {
  if (!results) return (
    <div className="text-center py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500"
      >
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-lg">Submit the form to see cost analysis</p>
        <p className="text-sm mt-2">We'll break down your Azure costs</p>
      </motion.div>
    </div>
  );

  const chartData = {
    labels: ['Compute', 'Storage'],
    datasets: [{
      data: [results.vmCost, results.storageCost],
      backgroundColor: ['#3B82F6', '#8B5CF6'],
      borderWidth: 0,
    }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-medium text-gray-700 mb-4">Cost Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Compute Costs</span>
              <span className="font-medium">${results.vmCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage Costs</span>
              <span className="font-medium">${results.storageCost.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Monthly Cost</span>
              <span className="text-blue-600">${results.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-medium text-gray-700 mb-4">Cost Distribution</h3>
          <div className="h-48">
            <Pie 
              data={chartData} 
              options={{ 
                plugins: { legend: { position: 'bottom' } },
                maintainAspectRatio: false
              }} 
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2">Cost Optimization Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li className="flex items-start">
            <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Consider reserved instances for 40-72% savings
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Use Azure Spot VMs for non-critical workloads
          </li>
        </ul>
      </div>
    </motion.div>
  );
}