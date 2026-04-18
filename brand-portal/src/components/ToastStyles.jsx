import toast from 'react-hot-toast'

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#667eea',
    },
  })
}

export const showError = (message) => {
  toast.error(message, {
    style: {
      background: '#ef4444',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
    },
  })
}

export const showLoading = (message) => {
  return toast.loading(message, {
    style: {
      background: '#667eea',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
    },
  })
}