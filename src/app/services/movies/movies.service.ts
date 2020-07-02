import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private base = 'https://api.themoviedb.org/3/';

  constructor() {}

  async getMovies(page: number = 1) {
    const query = await fetch(
      `${this.base}movie/popular?api_key=${environment.key}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getSeries(page: number = 1) {
    const query = await fetch(
      `${this.base}tv/popular?api_key=${environment.key}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getMovieByName(name: string, search: string = '', page: number = 1) {
    const query = await fetch(
      `${this.base}search/movie?api_key=${environment.key}&query=${name}&year=${search}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getSerieByName(name: string, search: string = '', page: number = 1) {
    const query = await fetch(
      `${this.base}search/tv?api_key=${environment.key}&query=${name}&year=${search}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getMovieGenres(page: number = 1) {
    const query = await fetch(
      `${this.base}genre/movie/list?api_key=${environment.key}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getMoviesByFilters(
    year: string = '',
    genre: string = '',
    page: number = 1
  ) {
    const query = await fetch(
      `${this.base}discover/movie?api_key=${environment.key}&sort_by=popularity.desc&with_genres=${genre}&year=${year}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    return body;
  }

  async getSeriesByFilters(
    year: string = '2019',
    genre: string = '',
    page: number = 1
  ) {
    const query = await fetch(
      `${this.base}discover/tv?api_key=${environment.key}&sort_by=popularity.desc&with_genres=${genre}&first_air_date_year=${year}&page=${page}&&language=es-ES`
    );
    const body = await query.json();
    console.log(body);
    return body;
  }

  async getVideo(video: string) {
    const query = await fetch(
      `${this.base}movie/${video}/videos?api_key=${environment.key}`
    );
    const body = await query.json();
    return body;
  }

  async getFavorites() {
    return await { results: JSON.parse(localStorage.getItem('favorites')) };
  }
}
