import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showSuccessToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
      borderRadius: '8px',
    },
  }).showToast();
}

export function showErrorToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: {
      background: 'linear-gradient(to right, #F44336, #FF6439)',
      borderRadius: '8px',
    },
  }).showToast();
}
