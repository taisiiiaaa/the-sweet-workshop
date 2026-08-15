import axios from 'axios';

async function getFeedbacks() {
  const RESPONSE = await axios.get(
    'https://deserts-store.b.goit.study/api/feedbacks',
    {
      params: {
        limit: 10,
        page: 1,
      },
    }
  );
  return RESPONSE.data.feedbacks;
}

export default getFeedbacks;
