import axios from 'axios';
import { BASE_URL } from '../constants';

export async function getCategories() {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
}

export async function getDessertsList({ page, limit, category }) {
  const params = {
    page,
    limit,
  };

  if (category && category !== 'all') {
    params.category = category;
  }
  const { data } = await axios.get(`${BASE_URL}/desserts`, { params });
  return data;
}
