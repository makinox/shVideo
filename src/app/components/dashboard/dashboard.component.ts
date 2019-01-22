import { Component, OnInit } from '@angular/core';
import { getMovies, getSeries } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  data: Array<Object>

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

}
