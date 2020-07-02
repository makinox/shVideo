import { Component, OnInit } from '@angular/core';
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
  name: string;
  genres: Array<object>;
  genero = '';
  year = '2020';
  last: string;
  modal = false;
  videoModal: SafeResourceUrl;
  favorites: Array<object>;
  isFavoritePage = false;

  async ngOnInit() {
    await this.getData();
    const genres = await this.mService.getMovieGenres(this.returnPage(true));
    this.genres = genres;
    // this.favorites = await JSON.parse(localStorage.getItem('favorites'));
    this.isFavoritePage =
      window.location.pathname === '/favoritos' ? true : false;
  }

  async getData() {
    let data: Array<object> = [{}];
    if (window.location.pathname === '/series') {
      data = await this.mService.getSeries(this.returnPage(true));
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      data = await this.mService.getMovies(this.returnPage(true));
    }
    this.data = data;
    this.last = 'data';
  }

  async handleSearch(name: string) {
    // console.log(name);
    if (name) {
      this.data = await this.mService.getMovieByName(
        name.trim(),
        this.year,
        this.returnPage(true)
      );
      this.name = name;
    } else {
      this.getData();
    }
  }

  // async handleChange() {
  //   if (this.name) {
  //     let data: Array<object> = [{}];
  //     if (window.location.pathname === '/series') {
  //       data = await this.mService.getSerieByName(
  //         this.name.trim(),
  //         this.year,
  //         this.returnPage(true)
  //       );
  //     } else if (window.location.pathname === '/favoritos') {
  //       data = await this.mService.getFavorites();
  //     } else {
  //       data = await this.mService.getMovieByName(
  //         this.name.trim(),
  //         this.year,
  //         this.returnPage(true)
  //       );
  //     }
  //     this.data = data;
  //     this.last = 'search';
  //   } else {
  //     this.getData();
  //     this.last = 'data';
  //   }
  // }

  async handleFilters() {
    let data: Array<object> = [{}];
    if (window.location.pathname === '/series') {
      if (this.year) {
        data = await this.mService.getSeriesByFilters(
          this.year,
          this.genero,
          this.returnPage(true)
        );
      } else {
        data = await this.mService.getSeriesByFilters(
          '2019',
          this.genero,
          this.returnPage(true)
        );
      }
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      console.log({ year: this.year, genero: this.genero });
      if (this.year) {
        data = await this.mService.getMoviesByFilters(
          this.year,
          this.genero,
          this.returnPage(true)
        );
      } else {
        data = await this.mService.getMoviesByFilters(
          '2019',
          this.genero,
          this.returnPage(true)
        );
      }
    }
    this.data = data;
    this.last = 'filters';
  }

  handlePage(direction: string | any) {
    let page: number = this.returnPage();
    if (direction) {
      page++;
      window.location.hash = `page=${page}`;
    } else {
      if (page) {
        page--;
      }
      window.location.hash = `page=${page}`;
    }
    if (this.last === 'data') {
      this.getData();
    } else if (this.last === 'search') {
      this.handleSearch(this.name);
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

  // async handleModal(video: string = '') {
  //   this.modal = true;
  //   const results = await this.mService.getVideo(video);
  //   try {
  //     this.videoModal = `https://www.youtube.com/embed/${results}`;
  //   } catch {
  //     this.videoModal = 'https://www.youtube.com/embed/gXlwCEU_4t8';
  //   }
  // }

  openModal(video) {
    this.mService.getVideo(video).then((res) => {
      this.modal = true;
      this.videoModal = `https://www.youtube.com/embed/${res}`;
    });
  }

  public closeModal(): void {
    // console.log('cancel');
    this.modal = false;
    this.videoModal = null;
  }

  // async addFavorites(media: object | any) {
  //   if (this.favorites) {
  //     const el = this.favorites.filter((elem: any) => elem.id === media.id)[0];
  //     if (!el) {
  //       this.favorites.push(media);
  //     }
  //   } else {
  //     this.favorites = [media];
  //   }
  //   await localStorage.setItem('favorites', JSON.stringify(this.favorites));
  //   window.alert('Agregado a favoritos! 🙂');
  // }

  // async removeFavorites(media: object | any) {
  //   this.favorites = this.favorites.filter((elem: any) => elem.id !== media.id);
  //   await localStorage.setItem('favorites', JSON.stringify(this.favorites));
  //   window.alert('Removido de favoritos! 🙁');
  //   this.getData();
  // }
}
