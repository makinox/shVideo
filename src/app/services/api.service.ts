import {environment} from '../../environments/environment'

async function getMovies() {
  const query = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${environment.key}`)
  const body = await query.json()
  return body
}

async function getSeries() {
  const query = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${environment.key}`)
  const body = await query.json()
  console.log(body)
  return body
}
export {
  getMovies,
  getSeries
}
