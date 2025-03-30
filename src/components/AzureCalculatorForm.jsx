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
    <form onSubmit={handleSubmit} className="space-y-6" style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Virtual Machines Section */}
      <div>
        <h3 className="section-title" style={{ '--bg-color': 'var(--blue-500)' }}>
          Virtual Machines
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Number of Instances</label>
            <input
              type="number"
              name="vmInstances"
              min="1"
              value={formData.vmInstances}
              onChange={handleChange}
              className="form-input"
              placeholder="1-100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">VM Type</label>
            <select
              name="vmType"
              value={formData.vmType}
              onChange={handleChange}
              className="form-input form-select"
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
      <div>
        <h3 className="section-title" style={{ '--bg-color': 'var(--purple-500)' }}>
          Storage
        </h3>
        
        <div className="form-group">
          <label className="form-label">Storage Size (GB)</label>
          <input
            type="number"
            name="storageGB"
            min="10"
            value={formData.storageGB}
            onChange={handleChange}
            className="form-input"
            placeholder="10-1000"
          />
        </div>
      </div>

      {/* Configuration Section */}
      <div>
        <h3 className="section-title" style={{ '--bg-color': 'var(--cyan-500)' }}>
          Configuration
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Monthly Running Hours</label>
            <input
              type="number"
              name="hoursRunning"
              min="1"
              max="744"
              value={formData.hoursRunning}
              onChange={handleChange}
              className="form-input"
              placeholder="1-744"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Azure Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-input form-select"
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
        className="btn btn-primary"
        style={{ width: '100%' }}
      >
        Calculate Costs
      </button>
    </form>
  );
}