import React, { useState } from 'react';
import api from '../services/api';
import './CustomerCard.css';

const CustomerCard = ({ customer, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(customer);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.put(`/customers/${customer.id}`, formData);
      onUpdate(response.data.customer);
      setIsEditing(false);
      setMessage('Customer updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update customer');
      console.error('Error updating customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(customer);
    setIsEditing(false);
    setMessage('');
  };

  const handleSendEmail = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post(`/customers/${customer.id}/send-email`);
      setMessage(response.data.message);
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Failed to send email');
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-card">
      <div className="card-header">
        <h2>Customer Details</h2>
        <div className="card-actions">
          {!isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit
              </button>
              <button 
                onClick={handleSendEmail}
                className="email-button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Email'}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSubmit}
                className="save-button"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={handleCancel}
                className="cancel-button"
                disabled={loading}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('success') || message.includes('sent') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            rows="3"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="joinDate">Join Date</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastLogin">Last Login</label>
          <input
            type="date"
            id="lastLogin"
            name="lastLogin"
            value={formData.lastLogin}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerCard;