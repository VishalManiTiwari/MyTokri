import axios from 'axios';

const API_ENDPOINT = 'https://d3398n96t5wqx9.cloudfront.net/UsersAquisition/';
const ENCRYPTION_KEY = 'FtmJ7frzTyWOzintybbqIWzwwclcPtaI';
const ACCESS_TOKEN = '0e186445-0647-417c-ae27-8098533f1914';
const CAMPAIGN_ID = '6a0fa162-fb4c-4074-a6d4-402744e3590b';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'x-encryption-key': ENCRYPTION_KEY,
      },
      params: {
        campaignId: CAMPAIGN_ID,
        country: 'IRAQ',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
