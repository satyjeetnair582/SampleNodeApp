import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CustomerCard from './CustomerCard';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
      if (response.data.length > 0) {
        setSelectedCustomer(response.data[0]);
      }
    } catch (error) {
      setError('Failed to fetch customers');
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setSelectedCustomer(updatedCustomer);
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Customer Management Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="sidebar">
          <h3>Customers</h3>
          <div className="customer-list">
            {customers.map(customer => (
              <div
                key={customer.id}
                className={`customer-item ${selectedCustomer?.id === customer.id ? 'active' : ''}`}
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="customer-name">{customer.name}</div>
                <div className="customer-company">{customer.company}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          {selectedCustomer ? (
            <CustomerCard
              customer={selectedCustomer}
              onUpdate={handleCustomerUpdate}
            />
          ) : (
            <div className="no-selection">
              <p>Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;