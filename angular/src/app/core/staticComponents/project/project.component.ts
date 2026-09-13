import { Component } from '@angular/core';
import {
  ProjectCard,
  ProjectCardSliderComponent,
} from './project-card-slider/project-card-slider.component';

@Component({
  selector: 'app-project',
  imports: [ProjectCardSliderComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  readonly projects: readonly ProjectCard[] = [
    {
      title: 'The portfolio host',
      url: 'https://www.raspberrypi.com/',
      description: 'A Raspberry Pi connected alongside home networking equipment.',
      image: '/assets/images/CGSitePhotos/0raspby.jpg',
      imageAlt: 'Black Raspberry Pi enclosure connected beside home networking equipment',
      color: '#28343d',
    },
    {
      title: 'Remote access',
      url: 'https://connect.raspberrypi.com/',
      description: 'The Raspberry Pi Connect sign-in screen used to reach the device.',
      image: '/assets/images/CGSitePhotos/1RPiConnect.png',
      imageAlt: 'Raspberry Pi Connect sign-in screen',
      color: '#c92f53',
    },
    {
      title: 'Domain registration',
      url: 'https://www.namecheap.com/',
      description: 'The portfolio domain listed as active in the registrar dashboard.',
      image: '/assets/images/CGSitePhotos/2NameCheap.png',
      imageAlt: 'Namecheap domain list showing the portfolio domain as active',
      color: '#e85d19',
    },
    {
      title: 'Domain management',
      url: 'https://www.cloudflare.com/',
      description: 'The portfolio domain shown as active in the Cloudflare dashboard.',
      image: '/assets/images/CGSitePhotos/3Cloudflare.png',
      imageAlt: 'Cloudflare domain overview showing the portfolio domain as active',
      color: '#d95f13',
    },
    {
      title: 'The live website',
      url: 'https://cguzowski.com/',
      description: 'A mobile view of the portfolio About section.',
      image: '/assets/images/CGSitePhotos/4LiveWebsite.png',
      imageAlt: 'Mobile portfolio About section with portrait, animated words, and steaming cup illustration',
      color: '#24372f',
    },
  ];
}
