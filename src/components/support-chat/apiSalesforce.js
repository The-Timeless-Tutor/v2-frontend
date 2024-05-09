import { apiMiddleware } from '@/middleware/apiMiddleware';

// Get access token
export const getAccessToken = async () => {
  try {
    const response = await apiMiddleware(`api/sf_callback`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Submit support enquiry
export const submitEnquiry = async (accessToken, formData) => {
  try {
    const response = await fetch(
      'https://resourceful-goat-lc10gj-dev-ed.trailblaze.my.salesforce.com/services/data/v60.0/sobjects/Case/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Subject: formData.subject,
          Description: formData.message,
          Origin: 'Web',
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
