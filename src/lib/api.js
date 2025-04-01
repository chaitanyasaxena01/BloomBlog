const API_BASE_URL = 'http://localhost:9000/api';

export class ApiService {
  async createPost(postData) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
      }

      return await response.json();
    } catch (error) {
      console.error('API service :: createPost :: error', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;