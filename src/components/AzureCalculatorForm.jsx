import { useState } from 'react';

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
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Virtual Machines Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="bullet-point bg-blue-500"></span>
          Virtual Machines
        </h3>
        
        <div className="form-grid">
          <div className="form-field-group">
            <label className="input-label">Number of Instances</label>
            <input
              type="number"
              name="vmInstances"
              min="1"
              value={formData.vmInstances}
              onChange={handleChange}
              className="form-input input-field"
              placeholder="1-100"
            />
          </div>

          <div className="form-field-group">
            <label className="input-label">VM Type</label>
            <select
              name="vmType"
              value={formData.vmType}
              onChange={handleChange}
              className="form-input input-field form-select"
            >
              {vmOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Storage Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="bullet-point bg-purple-500"></span>
          Storage
        </h3>
        
        <div className="form-field-group">
          <label className="input-label">Storage Size (GB)</label>
          <input
            type="number"
            name="storageGB"
            min="10"
            value={formData.storageGB}
            onChange={handleChange}
            className="form-input input-field"
            placeholder="10-1000"
          />
        </div>
      </div>

      {/* Configuration Section */}
      <div className="form-section">
        <h3 className="section-title">
          <span className="bullet-point bg-cyan-500"></span>
          Configuration
        </h3>
        
        <div className="form-grid">
          <div className="form-field-group">
            <label className="input-label">Monthly Running Hours</label>
            <input
              type="number"
              name="hoursRunning"
              min="1"
              max="744"
              value={formData.hoursRunning}
              onChange={handleChange}
              className="form-input input-field"
              placeholder="1-744"
            />
          </div>

          <div className="form-field-group">
            <label className="input-label">Azure Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-input input-field form-select"
            >
              {regionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
      >
        Calculate Costs
      </button>
    </form>
  );
}