export default function AzureCostResults({ results }) {
  if (!results) return (
    <div className="text-center p-6">
      <div className="animate-fade">
        <div style={{ 
          width: '6rem', 
          height: '6rem', 
          backgroundColor: 'var(--gray-100)',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem'
        }}>
          <svg 
            width="3rem" 
            height="3rem" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--gray-400)"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        <p style={{ fontSize: '1.125rem', color: 'var(--gray-500)' }}>
          Submit the form to see cost analysis
        </p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          We'll break down your Azure costs
        </p>
      </div>
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
    <div className="animate-fade">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ 
          backgroundColor: 'var(--gray-50)',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ 
            fontWeight: '500',
            color: 'var(--gray-700)',
            marginBottom: '1rem'
          }}>
            Cost Breakdown
          </h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div className="result-item">
              <span style={{ color: 'var(--gray-600)' }}>Compute Costs</span>
              <span style={{ fontWeight: '500' }}>${results.vmCost.toFixed(2)}</span>
            </div>
            <div className="result-item">
              <span style={{ color: 'var(--gray-600)' }}>Storage Costs</span>
              <span style={{ fontWeight: '500' }}>${results.storageCost.toFixed(2)}</span>
            </div>
            <div style={{ 
              borderTop: '1px solid var(--gray-200)',
              margin: '0.5rem 0'
            }}></div>
            <div className="result-item">
              <span style={{ 
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                Total Monthly Cost
              </span>
              <span className="result-total">${results.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'var(--gray-50)',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ 
            fontWeight: '500',
            color: 'var(--gray-700)',
            marginBottom: '1rem'
          }}>
            Cost Distribution
          </h3>
          <div style={{ height: '12rem' }}>
            {/* You would include your chart implementation here */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gray-400)',
              backgroundColor: 'var(--gray-100)',
              borderRadius: '0.375rem'
            }}>
              [Chart Placeholder]
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'var(--blue-50)',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--blue-100)'
      }}>
        <h4 style={{ 
          fontWeight: '500',
          color: 'var(--blue-800)',
          marginBottom: '0.5rem'
        }}>
          Cost Optimization Tips
        </h4>
        <ul style={{ 
          fontSize: '0.875rem',
          color: 'var(--blue-700)',
          display: 'grid',
          gap: '0.25rem'
        }}>
          <li style={{ display: 'flex', alignItems: 'flex-start' }}>
            <svg 
              width="1rem" 
              height="1rem" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--blue-500)"
              style={{ marginRight: '0.5rem', flexShrink: 0, marginTop: '0.125rem' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Consider reserved instances for 40-72% savings
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start' }}>
            <svg 
              width="1rem" 
              height="1rem" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--blue-500)"
              style={{ marginRight: '0.5rem', flexShrink: 0, marginTop: '0.125rem' }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Use Azure Spot VMs for non-critical workloads
          </li>
        </ul>
      </div>
    </div>
  );
}