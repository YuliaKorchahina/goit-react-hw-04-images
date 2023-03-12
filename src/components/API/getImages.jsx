const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34095151-0d4f9aaf90ab8cff408ed5f99';

export const getImages = async (search, page) => {
  return fetch(
    `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
