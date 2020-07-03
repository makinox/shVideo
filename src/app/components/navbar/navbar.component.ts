import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() refresh = new EventEmitter<void>();

  constructor(private router: Router) {}

  public handleRouting(route: string = ''): void {
    this.router.navigate([`/${route}`]).then(() => this.refresh.emit());
  }
}
