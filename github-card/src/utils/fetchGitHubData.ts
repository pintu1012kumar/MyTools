import axios from 'axios';

export const fetchGitHubData = async (username: string) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`, // Store securely in .env
      },
    });
    return res.data;
  } catch (error) {
    console.error('GitHub fetch error: ', error);
    return null;
  }
};
