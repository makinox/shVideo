import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getMovies, getSeries, getMovieByName, getSerieByName, getMovieGenres } from '../../services/api.service';

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

  ngOnInit() {
    this.getData()
  }

  async getData() {
    let data = {}
    let genres = {}
    if (window.location.pathname === "/series") {
      data = await getSeries()
      genres = await getMovieGenres()
    } else if (window.location.pathname === "/favoritos") {
      data = await getMovies()
      genres = await getMovieGenres()
    } else {
      data = await getMovies()
      genres = await getMovieGenres()
    }
    this.data = data['results']
    this.genres = genres['genres']
  }

  async handleChange(el: string) {
    if (el) {
      console.log(el)
      let data = {}
      if (window.location.pathname === "/series") {
        data = await getSerieByName(el)
      } else if (window.location.pathname === "/favoritos") {
        data = await getMovies()
      } else {
        data = await getMovieByName(el)
      }
      this.data = data['results']
    } else {
      this.getData()
    }
  }

}
