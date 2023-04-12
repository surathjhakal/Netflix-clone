const API_KEY = "52375f2d83d2c62ee4e58eef996c3e22";

// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37

// baseURL:"https://api.themoviedb.org/3",

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  fetchCrimeMovies: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
  fetchComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchMysteryMovies: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
  fetchRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
};

// https://api.themoviedb.org/3/movie/top_rated?api_key=52375f2d83d2c62ee4e58eef996c3e22

export default requests;
