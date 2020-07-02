import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() item: object | any;
  @Input() isFavoritePage: boolean;
  @Output() openModal = new EventEmitter<string>();
  favorites = JSON.parse(localStorage.getItem('favorites'));
  constructor() {}

  handleModal(itemId: string) {
    this.openModal.emit(itemId);
  }

  async addFavorites(media: object | any) {
    if (this.favorites) {
      const el = this.favorites.filter((elem: any) => elem.id === media.id)[0];
      if (!el) {
        this.favorites.push(media);
      }
    } else {
      this.favorites = [media];
    }
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    window.alert('Agregado a favoritos! 🙂');
  }

  async removeFavorites(media: object | any) {
    this.favorites = this.favorites.filter((elem: any) => elem.id !== media.id);
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    window.alert('Removido de favoritos! 🙁');
    // this.getData();
  }
}
