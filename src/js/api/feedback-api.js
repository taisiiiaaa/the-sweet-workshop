import axios from 'axios';

async function getFeedbacks() {
  const response = await axios.get(
    'https://deserts-store.b.goit.study/api/feedbacks',
    {
      params: {
        limit: 10,
        page: 1,
      },
    }
  );
  return response.data.feedbacks;
}

export default getFeedbacks;
