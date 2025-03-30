import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AzureCostResults({ results }) {
  if (!results) return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <svg className="empty-state-svg" viewBox="0 0 24 24">
          <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="empty-state-text">Submit the form to see cost analysis</p>
      <p className="empty-state-subtext">We'll break down your Azure costs</p>
    </div>
  );

  const chartData = {
    labels: ['Compute', 'Storage'],
    datasets: [{
      data: [results.vmCost, results.storageCost],
      backgroundColor: ['var(--blue-500)', 'var(--purple-500)'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="results-container animate-fade">
      <div className="results-grid">
        <div className="results-card">
          <h3 className="results-heading">Cost Breakdown</h3>
          <div className="results-list">
            <div className="result-item">
              <span className="result-label">Compute Costs</span>
              <span className="result-value">${results.vmCost.toFixed(2)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Storage Costs</span>
              <span className="result-value">${results.storageCost.toFixed(2)}</span>
            </div>
            <div className="result-divider"></div>
            <div className="result-item">
              <span className="result-label-total">Total Monthly Cost</span>
              <span className="result-value-total">${results.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="results-card">
          <h3 className="results-heading">Cost Distribution</h3>
          <div className="chart-container">
            <Pie 
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 20,
                      font: {
                        family: 'system-ui, sans-serif'
                      }
                    }
                  }
                },
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>

      <div className="tips-card">
        <h4 className="tips-heading">Cost Optimization Tips</h4>
        <ul className="tips-list">
          <li className="tips-item">
            <svg className="tips-icon" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Consider reserved instances for 40-72% savings
          </li>
          <li className="tips-item">
            <svg className="tips-icon" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Use Azure Spot VMs for non-critical workloads
          </li>
        </ul>
      </div>
    </div>
  );
}