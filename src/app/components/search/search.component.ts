import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() page: string;
  @Output() sendName = new EventEmitter<string>();
  name = '';
  constructor() {}

  async handleChange() {
    // console.log({ name: this.name, page: this.page });
    this.sendName.emit(this.name);
    // if (this.name) {
    //   let data: Array<object> = [{}];
    //   if (window.location.pathname === '/series') {
    //     data = await this.mService.getSerieByName(
    //       this.name.trim(),
    //       this.year,
    //       this.returnPage(true)
    //     );
    //   } else if (window.location.pathname === '/favoritos') {
    //     data = await this.mService.getFavorites();
    //   } else {
    //     data = await this.mService.getMovieByName(
    //       this.name.trim(),
    //       this.year,
    //       this.returnPage(true)
    //     );
    //   }
    //   this.data = data;
    //   this.last = 'search';
    // } else {
    //   this.getData();
    //   this.last = 'data';
    // }
  }
}
