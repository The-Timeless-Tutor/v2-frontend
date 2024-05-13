const backendUrl =
  import.meta.env.VITE_BACKEND_URL || 'https://backend-service-rojjrgeqna-ue.a.run.app/';

export const register = async (formData) => {
  try {
    const response = await fetch(`${backendUrl}api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
