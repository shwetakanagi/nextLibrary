'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaffNotifications() {
  const [notifications, setNotifications] = useState([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;

    axios
      .get('http://localhost:5000/api/staff/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.read - b.read || new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sorted);
      })
      .catch((err) => console.error('Error loading notifications:', err));
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/staff/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📢 Staff Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: notification.read ? '#f5f5f5' : '#e0f7fa',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <strong>{notification.message}</strong>
              <br />
              <small style={{ color: '#666' }}>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  style={{
                    marginLeft: '1rem',
                    backgroundColor: '#0288d1',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
