import notify from './useNotification';

const checkNetStatus = () => {
  if (!navigator.onLine) {
    notify('Check your internet', 'error');
    return;
  }
};

export default checkNetStatus;
