import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modal = false;
  @Input() videoModal: SafeResourceUrl;
  @Output() closeEvent = new EventEmitter<void>();

  constructor() {}

  public closeModal(): void {
    this.closeEvent.emit();
  }
}
