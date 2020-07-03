import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modal = false;
  @Input() videoModal: string;
  @Output() closeEvent = new EventEmitter<void>();

  constructor() {}

  public closeModal(): void {
    this.closeEvent.emit();
  }
}
