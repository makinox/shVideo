import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private mService: MoviesService
  ) {}

  data: Array<object>;
  genres: Array<object>;
  name = new FormControl('');
  genero = new FormControl('');
  year = new FormControl('');
  last: string;
  modal = false;
  videoModal: SafeResourceUrl;
  favorites: Array<object>;
  isFavoritePage = false;

  async ngOnInit() {
    await this.getData();
    let genres: object = {};
    genres = await this.mService.getMovieGenres(this.returnPage(true));
    this.genres = genres['genres'];
    this.favorites = await JSON.parse(localStorage.getItem('favorites'));
    this.isFavoritePage =
      window.location.pathname === '/favoritos' ? true : false;
  }

  async getData() {
    let data: object = {};
    if (window.location.pathname === '/series') {
      data = await this.mService.getSeries(this.returnPage(true));
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      data = await this.mService.getMovies(this.returnPage(true));
    }
    this.data = data['results'];
    this.last = 'data';
  }

  async handleChange() {
    if (this.name.value) {
      let data: object = {};
      if (window.location.pathname === '/series') {
        data = await this.mService.getSerieByName(
          this.name.value.trim(),
          this.year.value,
          this.returnPage(true)
        );
      } else if (window.location.pathname === '/favoritos') {
        data = await this.mService.getFavorites();
      } else {
        data = await this.mService.getMovieByName(
          this.name.value.trim(),
          this.year.value,
          this.returnPage(true)
        );
      }
      this.data = data['results'];
      this.last = 'search';
    } else {
      this.getData();
      this.last = 'data';
    }
  }

  async handleFilters() {
    let data: object = {};
    if (window.location.pathname === '/series') {
      if (this.year.value) {
        data = await this.mService.getSeriesByFilters(
          this.year.value,
          this.genero.value,
          this.returnPage(true)
        );
      } else {
        data = await this.mService.getSeriesByFilters(
          '2019',
          this.genero.value,
          this.returnPage(true)
        );
      }
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      if (this.year.value) {
        data = await this.mService.getMoviesByFilters(
          this.year.value,
          this.genero.value,
          this.returnPage(true)
        );
      } else {
        data = await this.mService.getMoviesByFilters(
          '2019',
          this.genero.value,
          this.returnPage(true)
        );
      }
    }
    this.data = data['results'];
    this.last = 'filters';
  }

  handlePage(direction: string | any) {
    let page: number = this.returnPage();
    if (direction) {
      page++;
      window.location.hash = `page=${page}`;
    } else {
      if (page) page--;
      window.location.hash = `page=${page}`;
    }
    if (this.last === 'data') {
      this.getData();
    } else if (this.last === 'search') {
      this.handleChange();
    } else {
      this.handleFilters();
    }
  }

  returnPage(increase: boolean = false) {
    let page: number = window.location.hash
      ? parseInt(window.location.hash.split('=')[1], 10)
      : 0;
    if (increase) {
      return (page = page + 1);
    } else {
      return page;
    }
  }

  async handleModal(video: string = '') {
    this.modal = !this.modal;
    const { results } = await this.mService.getVideo(video);
    try {
      this.videoModal = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + results[0]['key']
      );
    } catch {
      this.videoModal = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/gXlwCEU_4t8'
      );
    }
  }

  async addFavorites(media: object) {
    if (this.favorites) {
      const el = this.favorites.filter((el) => el['id'] === media['id'])[0];
      if (!el) {
        this.favorites.push(media);
      }
    } else {
      this.favorites = [media];
    }
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    window.alert('Agregado a favoritos! 🙂');
  }

  async removeFavorites(media: object) {
    this.favorites = this.favorites.filter((el) => el['id'] != media['id']);
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    window.alert('Removido de favoritos! 🙁');
    this.getData();
  }
}
