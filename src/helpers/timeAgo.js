function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) {
    return `${diff} soniya oldin`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} daqiqa oldin`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} soat oldin`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 86400)} kun oldin`;
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)} oy oldin`;
  } else {
    return `${Math.floor(diff / 31536000)} yil oldin`;
  }
}

export default timeAgo