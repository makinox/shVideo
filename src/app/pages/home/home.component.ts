import { Component, OnInit } from '@angular/core';
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
  year = '2077';
  last: string;
  modal = false;
  videoModal: string;
  favorites: Array<object>;
  isFavoritePage = false;

  public async ngOnInit(): Promise<void> {
    await this.getData();
    this.genres = await this.mService.getMovieGenres(this.returnPage(true));
    this.favorites = await JSON.parse(localStorage.getItem('favorites'));
    this.isFavoritePage =
      window.location.pathname === '/favoritos' ? true : false;
  }

  public async getData(): Promise<void> {
    let data: Array<object> = [{}];
    if (window.location.pathname === '/series') {
      data = await this.mService.getSeries(this.returnPage(true));
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      data = await this.mService.getMovies(this.returnPage(true));
    }
    this.data = data;
  }

  public async handleSearch(name: string): Promise<void> {
    if (name) {
      let data: Array<object> = [{}];
      if (window.location.pathname === '/series') {
        data = await this.mService.getSerieByName(
          name.trim(),
          this.year,
          this.returnPage(true)
        );
      } else if (window.location.pathname === '/favoritos') {
        data = await this.mService.getFavorites();
      } else {
        data = await this.mService.getMovieByName(
          name.trim(),
          this.year,
          this.returnPage(true)
        );
      }
      this.data = data;
    } else {
      this.getData();
    }
  }

  public async handleFilters(): Promise<void> {
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
          '2020',
          this.genero,
          this.returnPage(true)
        );
      }
    } else if (window.location.pathname === '/favoritos') {
      data = await this.mService.getFavorites();
    } else {
      // console.log({ year: this.year, genero: this.genero });
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
    }
    this.data = data;
  }

  public handlePage(direction: string | any): void {
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
  }

  private returnPage(increase: boolean = false): number {
    let page: number = window.location.hash
      ? parseInt(window.location.hash.split('=')[1], 10)
      : 0;
    if (increase) {
      return (page = page + 1);
    } else {
      return page;
    }
  }

  public openModal(video): void {
    this.mService
      .getVideo(video)
      .then((res) => {
        this.modal = true;
        this.videoModal = `https://www.youtube.com/embed/${res}`;
      })
      .catch(() => {
        this.modal = true;
        this.videoModal = 'https://www.youtube.com/embed/gXlwCEU_4t8';
      });
  }

  public closeModal(): void {
    this.modal = false;
    this.videoModal = null;
  }
}
