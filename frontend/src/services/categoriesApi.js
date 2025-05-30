import axios from 'axios'

//Api configuration with axios
const api = axios.create({
    baseURL: 'http://localhost:3000/categories',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
  //get Categories
 const getCategories = async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  //Create a Category
 const createCategory = async (categoryData) => {
    try {
      const response = await api.post('/', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating Category:', error);
      throw error;
    }
  };

  export { getCategories, createCategory };


