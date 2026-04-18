// ToastStyles.jsx
// Usage: import { showSuccess, showError, showLoading } from '../components/ToastStyles'
// Make sure your App.jsx has: import { Toaster } from 'react-hot-toast'
// And inside JSX: <Toaster position="bottom-right" />

import toast from 'react-hot-toast'

const base = {
  style: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    padding: '14px 18px',
    borderRadius: '12px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    maxWidth: '360px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  },
}

export const showSuccess = (message) =>
  toast.success(message, {
    ...base,
    style: {
      ...base.style,
      background: '#0d1f0d',
      color: '#4ade80',
      border: '1px solid rgba(74,222,128,0.25)',
    },
    iconTheme: { primary: '#4ade80', secondary: '#0d1f0d' },
  })

export const showError = (message) =>
  toast.error(message, {
    ...base,
    style: {
      ...base.style,
      background: '#1f0d0d',
      color: '#f87171',
      border: '1px solid rgba(248,113,113,0.25)',
    },
    iconTheme: { primary: '#f87171', secondary: '#1f0d0d' },
  })

export const showLoading = (message) =>
  toast.loading(message, {
    ...base,
    style: {
      ...base.style,
      background: '#12121e',
      color: '#8a8aa8',
      border: '1px solid rgba(255,255,255,0.08)',
    },
  })

export const showWarning = (message) =>
  toast(message, {
    ...base,
    icon: '⚠️',
    style: {
      ...base.style,
      background: '#1f1a0d',
      color: '#facc15',
      border: '1px solid rgba(250,204,21,0.2)',
    },
  })

// Toaster config to spread into your <Toaster> component:
export const toasterProps = {
  position: 'bottom-right',
  gutter: 10,
  toastOptions: {
    duration: 4000,
    style: {
      fontFamily: "'DM Sans', sans-serif",
    },
  },
}