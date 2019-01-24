import { TestBed } from '@angular/core/testing';

import {
  getMovies,
  getSeries,
  getMovieByName,
  getSerieByName,
  getMovieGenres,
  getMoviesByFilters,
  getSeriesByFilters,
  getVideo,
  getFavorites
} from './api.service'

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be true', () => {
    expect(getVideo).toBeTruthy();
  });

  it('shold work', () => {
    expect(getFavorites).toBeTruthy();
  })

  it('shold work', () => {
    expect(getSeriesByFilters).toBeTruthy();
  })

  it('shold work', () => {
    expect(getMoviesByFilters).toBeTruthy();
  })

  it('shold work', () => {
    expect(getMovieGenres).toBeTruthy();
  })

  it('shold work', () => {
    expect(getSerieByName).toBeTruthy();
  })

  it('shold work', () => {
    expect(getMovieByName).toBeTruthy();
  })

  it('shold work', () => {
    expect(getSeries).toBeTruthy();
  })

  it('shold work', () => {
    expect(getMovies).toBeTruthy();
  })

  
});
