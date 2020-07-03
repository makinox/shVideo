import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() item: object | any;
  @Input() isFavoritePage: boolean;
  @Output() openModal = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  activeFav = false;

  constructor() {}

  public ngOnInit(): void {
    if (this.favorites.filter((el) => el.id === this.item.id).length) {
      this.activeFav = true;
    }
  }

  public handleModal(itemId: string): void {
    this.openModal.emit(itemId);
  }

  public async addFavorites(media: object | any): Promise<void> {
    if (this.favorites) {
      const el = this.favorites.filter((elem: any) => elem.id === media.id)[0];
      if (!el) {
        this.favorites.push(media);
      }
    } else {
      this.favorites = [media];
    }
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.refresh.emit();
    window.alert('Agregado a favoritos! 🙂');
  }

  async removeFavorites(media: object | any): Promise<void> {
    this.favorites = this.favorites.filter((elem: any) => elem.id !== media.id);
    await localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.refresh.emit();
    window.alert('Removido de favoritos! 🙁');
  }
}
