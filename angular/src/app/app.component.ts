import { Component } from '@angular/core';
import { NavbarComponent } from './core/staticComponents/navbar/navbar.component';
import { AboutComponent } from './core/staticComponents/about/about.component';
import { ConnectComponent } from './core/staticComponents/connect/connect.component';
import { ProjectComponent } from './core/staticComponents/project/project.component';
import { HomeComponent } from './core/staticComponents/home/home.component';
import { SectionNavigationComponent } from './core/staticComponents/navbar/section-navigation.component';


@Component({
    selector: 'app-root',
    host: { '[style.--video-ratio]': 'videoRatio' },
    imports: [NavbarComponent, HomeComponent, AboutComponent, ConnectComponent, ProjectComponent, SectionNavigationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  videoRatio = 16 / 9;
  heroVideoPlaying = false;
}
