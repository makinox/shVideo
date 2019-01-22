import { Component, OnInit } from '@angular/core';
import { getMovies } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  data: Array<Object>
  img: String = 'fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg'

  async ngOnInit() {
    const data = await getMovies()
    this.data = data.results
    console.log(this.data)
  }

}
