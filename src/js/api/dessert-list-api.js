import axios from 'axios';

const BASE_URL = 'https://deserts-store.b.goit.study/api';

export async function getCategories() {
    const {data} = await axios.get(`${BASE_URL}/categories`)
    return data;
}

export async function getDessertsList({ page, limit, category }){
    const params = {
        page,
        limit
    };

     if (category && category !== 'all') {
        params.category = category;
    }
    const {data} = await axios.get(`${BASE_URL}/desserts`, {params})
    return data;
} 

