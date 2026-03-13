export const API_BASE_URL = 'http://localhost:5000/api'; // for localhost
// export const API_BASE_URL = 'https://cullture-platform.onrender.com/api'; // for production

export const api = {
  // Auth APIs
  register: () => API_BASE_URL + '/auth/register',
  login: () => API_BASE_URL + '/auth/login',
  getCurrentUser: () => API_BASE_URL + '/auth/me',
  updateCurrentUser: () => API_BASE_URL + '/auth/me',
  uploadAvatar: () => API_BASE_URL + '/auth/me/avatar',

  // Culture APIs
  getAllCultures: () => API_BASE_URL + '/cultures',
  getCulturesByCountry: (country) => API_BASE_URL + `/cultures/country/${country}`,
  getCulturesByRegion: (region) => API_BASE_URL + `/cultures/region/${region}`,
  getCulturesByCategory: (category) => API_BASE_URL + `/cultures/category/${category}`,
  getUserCultures: (userId) => API_BASE_URL + `/cultures/user/my-posts/${userId}`,
  getCultureById: (id) => API_BASE_URL + `/cultures/${id}`,
  createCulture: () => API_BASE_URL + '/cultures',
  updateCulture: (id) => API_BASE_URL + `/cultures/${id}`,
  deleteCulture: (id) => API_BASE_URL + `/cultures/${id}`,
  likeCulture: (id) => API_BASE_URL + `/cultures/${id}/like`,

  // Quiz APIs
  getQuizQuestions: () => API_BASE_URL + '/quiz/questions',
  getRandomQuestions: (count) => API_BASE_URL + `/quiz/random/${count}`,
  submitQuizScore: () => API_BASE_URL + '/quiz/submit',
  getLeaderboard: (limit) => API_BASE_URL + `/quiz/leaderboard/${limit}`
};