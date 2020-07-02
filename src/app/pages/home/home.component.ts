import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private mService: MoviesService) {}

  data: Array<object>;
  name: string;
  genres: Array<object>;
  genero = '';
  year = '2020';
  last: string;
  modal = false;
  videoModal: SafeResourceUrl;
  favorites: Array<object>;

  async ngOnInit() {
    await this.getData();
    this.genres = await this.mService.getMovieGenres(this.returnPage(true));
    // this.favorites = await JSON.parse(localStorage.getItem('favorites'));
  }

  async getData() {
    const data = await this.mService.getMovies(this.returnPage(true));
    this.data = data;
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
    // if (window.location.pathname === '/series') {
    //   if (this.year) {
    //     data = await this.mService.getSeriesByFilters(
    //       this.year,
    //       this.genero,
    //       this.returnPage(true)
    //     );
    //   } else {
    //     data = await this.mService.getSeriesByFilters(
    //       '2019',
    //       this.genero,
    //       this.returnPage(true)
    //     );
    //   }
    // } else if (window.location.pathname === '/favoritos') {
    //   data = await this.mService.getFavorites();
    // } else {
    //   console.log({ year: this.year, genero: this.genero });
    //   if (this.year) {
    //     data = await this.mService.getMoviesByFilters(
    //       this.year,
    //       this.genero,
    //       this.returnPage(true)
    //     );
    //   } else {
    //     data = await this.mService.getMoviesByFilters(
    //       '2020',
    //       this.genero,
    //       this.returnPage(true)
    //     );
    //   }
    // }
    console.log({ year: this.year, gen: this.genero });
    if (this.year) {
      data = await this.mService.getMoviesByFilters(
        this.year,
        this.genero,
        this.returnPage(true)
      );
    } else {
      data = await this.mService.getMoviesByFilters(
        '2020',
        this.genero,
        this.returnPage(true)
      );
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
    if (this.name) {
      this.handleSearch(this.name);
    } else if (this.year !== '2020' || this.genero) {
      this.handleFilters();
    } else {
      this.getData();
    }
    // if (this.last === 'data') {
    //   this.getData();
    // } else if (this.last === 'search') {
    //   this.handleSearch(this.name);
    // } else {
    //   this.handleFilters();
    // }
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
    this.modal = false;
    this.videoModal = null;
  }
}
