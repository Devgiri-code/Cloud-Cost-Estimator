import { useState } from 'react';
import AzureCalculatorForm from './components/AzureCalculatorForm';
import AzureCostResults from './components/AzureCostResults';
import './styles.css';

export default function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Azure Cloud Cost Estimator</h1>
        <p className="app-subtitle">
          Accurately predict your monthly Azure infrastructure costs
        </p>
      </header>

      <div className="main-layout">
        {/* Left Panel - Form */}
        <div className="form-panel">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Configuration</h2>
              <p>Enter your Azure resource details</p>
            </div>
            <AzureCalculatorForm onCalculate={setResults} />
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="results-panel">
          <div className="results-card">
            <div className="results-card-header">
              <h2>Cost Analysis</h2>
              <p>Your estimated monthly costs</p>
            </div>
            <AzureCostResults results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}