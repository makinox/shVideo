import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {
  getMovies,
  getSeries,
  getMovieByName,
  getSerieByName,
  getMovieGenres,
  getMoviesByFilters,
  getSeriesByFilters,
  getVideo
} from '../../services/api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  data: Array<Object>
  genres: Array<Object>
  name = new FormControl('')
  genero = new FormControl('')
  year = new FormControl('')
  last: string
  modal: boolean = false
  videoModal: SafeResourceUrl = 'https://www.youtube.com/embed/dgCnYsDTiXU'

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
    // console.log(this.data)
    this.genres = genres['genres']
    this.last = 'data'
  }

  async handleChange() {
    if (this.name.value) {
      let data: object = {}
      if (window.location.pathname === "/series") {
        data = await getSerieByName(this.name.value.trim(), this.year.value, this.returnPage(true))
      } else if (window.location.pathname === "/favoritos") {
        data = await getMovies(this.returnPage(true))
      } else {
        data = await getMovieByName(this.name.value.trim(), this.year.value, this.returnPage(true))
      }
      this.data = data['results']
      this.last = 'search'
    } else {
      this.getData()
      this.last = 'data'
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
    this.last = 'filters'
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
    if (this.last === 'data') {
      this.getData()
    } else if (this.last === 'search') {
      this.handleChange()
    } else {
      this.handleFilters()
    }
  }

  returnPage(increase: boolean = false) {
    let page: number = window.location.hash ? parseInt(window.location.hash.split('=')[1], 10) : 0
    if (increase){
      return page = page + 1
    } else {
      return page
    }
  }

  async handleModal(video: string = '') {
    this.modal = !this.modal
    // this.videoModal = video
    const {results} = await getVideo(video)
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + 'dgCnYsDTiXU'))
    this.videoModal = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + 'dgCnYsDTiXU')
  }

}
