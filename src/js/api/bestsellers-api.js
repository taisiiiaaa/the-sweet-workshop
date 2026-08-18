const API = {
  products: 'https://deserts-store.b.goit.study/api/desserts?type=popular',
};

export async function fetchBestsellers() {
  const response = await fetch(API.products);

  if (!response.ok) {
    throw new Error(`Помилка HTTP: ${response.status}`);
  }

  const data = await response.json();

  return data.desserts || data;
}