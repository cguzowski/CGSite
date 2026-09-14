import { Component } from '@angular/core';
import { ThemeService } from '../../singletonServices/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public themeService: ThemeService) {}
}
