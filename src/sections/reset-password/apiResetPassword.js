export const resetPassword = async (resetToken, password) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'https://backend-service-rojjrgeqna-ue.a.run.app/';
  try {
    const response = await fetch(`${backendUrl}api/update_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: resetToken, password })
    });
    const data = await response.json();
    if (!data.status) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
