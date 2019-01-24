import { environment } from '../../environments/environment'
const base = 'https://api.themoviedb.org/3/'

async function getMovies(page: number = 1) {
  const query = await fetch(`${base}movie/popular?api_key=${environment.key}&page=${page}`)
  const body = await query.json()
  return body
}

async function getSeries(page: number = 1) {
  const query = await fetch(`${base}tv/popular?api_key=${environment.key}&page=${page}`)
  const body = await query.json()
  return body
}

async function getMovieByName(name: string, search: string = '', page: number = 1) {
  const query = await fetch(`${base}search/movie?api_key=${environment.key}&query=${name}&year=${search}&page=${page}`)
  const body = await query.json()
  return body
}

async function getSerieByName(name: string, search: string = '', page: number = 1) {
  const query = await fetch(`${base}search/tv?api_key=${environment.key}&query=${name}&year=${search}&page=${page}`)
  const body = await query.json()
  return body
}

async function getMovieGenres(page: number = 1) {
  const query = await fetch(`${base}genre/movie/list?api_key=${environment.key}&page=${page}`)
  const body = await query.json()
  return body
}

async function getMoviesByFilters(year: string = '', genre: string = '', page: number = 1) {
  const query = await fetch(`${base}discover/movie?api_key=${environment.key}&sort_by=popularity.desc&with_genres=${genre}&year=${year}&page=${page}`)
  const body = await query.json()
  return body
}

async function getSeriesByFilters(year: string = '', genre: string = '', page: number = 1) {
  const query = await fetch(`${base}discover/tv?api_key=${environment.key}&sort_by=popularity.desc&with_genres=${genre}&year=${year}&page=${page}`)
  const body = await query.json()
  return body
}

async function getVideo(video: string) {
  const query = await fetch(`${base}movie/${video}/videos?api_key=${environment.key}`)
  const body = await query.json()
  return body
}

async function getFavorites() {
  return await {results: JSON.parse(localStorage.getItem('favorites'))}
}

export {
  getMovies,
  getSeries,
  getMovieByName,
  getSerieByName,
  getMovieGenres,
  getMoviesByFilters,
  getSeriesByFilters,
  getVideo,
  getFavorites
}
