import axios from 'axios';

export const fetchGitHubData = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('GitHub fetch error:', error);
    throw new Error('User not found');
  }
};
