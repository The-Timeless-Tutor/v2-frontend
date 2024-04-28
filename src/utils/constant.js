const protocol = window.location.protocol; // 'http:' or 'https:'
export const backendUrl =
  protocol === 'https:'
    ? 'https://backend-service-rojjrgeqna-ue.a.run.app'
    : 'http://localhost:8080';
