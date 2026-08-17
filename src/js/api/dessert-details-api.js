import axios from 'axios';
import { BASE_URL } from '../constants';

export async function getDessertDetails(dessertId) {
  const { data } = await axios.get(`${BASE_URL}/desserts/${dessertId}`);
  return data;
}
