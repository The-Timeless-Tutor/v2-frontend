const protocol = window.location.protocol; // 'http:' or 'https:'
export const backendUrl =
  protocol === 'https:'
    ? 'https://backend-service-rojjrgeqna-ue.a.run.app'
    : import.meta.env.VITE_BACKEND_URL;
