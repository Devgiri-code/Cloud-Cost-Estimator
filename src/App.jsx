import { useState } from 'react';
import AzureCalculatorForm from './components/AzureCalculatorForm';
import AzureCostResults from './components/AzureCostResults';
import './styles.css';

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="app-container">
      <header className="text-center mb-6">
        <h1 className="app-title">Azure Cloud Cost Estimator</h1>
        <p className="text-gray-500" style={{ maxWidth: '42rem', margin: '0 auto' }}>
          Accurately predict your monthly Azure infrastructure costs with our interactive calculator
        </p>
      </header>

      <div className="grid-container">
        {/* Form Panel */}
        <div className="animate-slide-left">
          <div className="card">
            <div className="card-header">
              <h2 className="section-title" style={{ color: 'white' }}>Configuration</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Enter your Azure resource details</p>
            </div>
            <div className="card-body">
              <AzureCalculatorForm onCalculate={setResults} />
            </div>
          </div>
        </div>
        

        {/* Results Panel */}
        <div className="animate-slide-right">
          <div className="card">
            <div className="card-header" style={{ background: 'linear-gradient(to right, var(--purple-600), var(--indigo-500))' }}>
              <h2 className="section-title" style={{ color: 'white' }}>Cost Analysis</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Your estimated monthly costs</p>
            </div>
            <div className="card-body">
              <AzureCostResults results={results} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-6 text-gray-500 text-sm">
        <p>Tool created with React and CSS</p>
      </footer>
    </div>
  );
}



<div className="smooth-scroll"> {/* Add this wrapper */}
  {/* Your existing content */}
</div>


