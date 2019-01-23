import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  getMovies,
  getSeries,
  getMovieByName,
  getSerieByName,
  getMovieGenres,
  getMoviesByFilters,
  getSeriesByFilters
} from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  data: Array<Object>
  genres: Array<Object>
  name = new FormControl('');
  genero = new FormControl('');
  year = new FormControl('');

  ngOnInit() {
    this.getData()
  }

  async getData() {
    let data: object = {}
    let genres: object = {}
    if (window.location.pathname === "/series") {
      data = await getSeries(this.returnPage(true))
      genres = await getMovieGenres(this.returnPage(true))
    } else if (window.location.pathname === "/favoritos") {
      data = await getMovies(this.returnPage(true))
      genres = await getMovieGenres(this.returnPage(true))
    } else {
      data = await getMovies(this.returnPage(true))
      genres = await getMovieGenres(this.returnPage(true))
    }
    this.data = data['results']
    this.genres = genres['genres']
  }

  async handleChange(el: string) {
    if (el) {
      // console.log(el)
      let data: object = {}
      if (window.location.pathname === "/series") {
        data = await getSerieByName(el.trim(), this.year.value, this.returnPage(true))
      } else if (window.location.pathname === "/favoritos") {
        data = await getMovies(this.returnPage(true))
      } else {
        data = await getMovieByName(el.trim(), this.year.value, this.returnPage(true))
      }
      this.data = data['results']
    } else {
      this.getData()
    }
  }

  async handleFilters() {
    let data: object = {}
    if (window.location.pathname === "/series") {
      data = await getSeriesByFilters(this.year.value, this.genero.value, this.returnPage(true))
    } else if (window.location.pathname === "/favoritos") {
      data = await getMovies(this.returnPage(true))
    } else {
      data = await getMoviesByFilters(this.year.value, this.genero.value, this.returnPage(true))
    }
    this.data = data['results']
  }

  handlePage(direction: string) {
    let page: number = this.returnPage()
    if (direction) {
      page++
      window.location.hash = `page=${page}`
    } else {
      if (page) page--
      window.location.hash = `page=${page}`
    }
  }

  returnPage(increase: boolean = false) {
    let page: number = window.location.hash ? parseInt(window.location.hash.split('=')[1], 10) : 0
    if (increase){
      return page++
    } else {
      return page
    }
  }

}
