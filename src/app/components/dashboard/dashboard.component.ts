import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getMovies, getSeries, getMovieByName, getSerieByName } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  data: Array<Object>
  name = new FormControl('');

  ngOnInit() {
    this.getData()
  }

  async getData() {
    let data = {}
    if (window.location.pathname === "/series") {
      data = await getSeries()
    } else if (window.location.pathname === "/favoritos") {
      data = await getMovies()
    } else {
      data = await getMovies()
    }
    this.data = data['results']
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
