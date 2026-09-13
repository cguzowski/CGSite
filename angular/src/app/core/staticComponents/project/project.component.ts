import { Component } from '@angular/core';
import {
  ProjectSlide,
  ProjectCardSliderComponent,
} from './project-card-slider/project-card-slider.component';

interface ProjectWalkthrough {
  id: string;
  title: string;
  summary: string;
  slides: readonly ProjectSlide[];
}

@Component({
  selector: 'app-project',
  imports: [ProjectCardSliderComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  readonly personalWebsiteInfrastructureSlides: readonly ProjectSlide[] = [
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

  readonly atlasCapitalIntelligenceSlides: readonly ProjectSlide[] = [
    {
      title: 'Portfolio workbench',
      description: 'A dashboard brings the selected portfolio, its headline metrics, and allocation view together.',
      image: '/assets/images/ACIPics/0dashbaordOverview.jpg',
      imageAlt: 'Atlas Capital Intelligence dashboard showing a selected portfolio, summary metrics, and allocation chart',
      color: '#153b35',
    },
    {
      title: 'Saved portfolios',
      description: 'The global selector exposes the portfolios available from the application database.',
      image: '/assets/images/ACIPics/1dbPortfolios.png',
      imageAlt: 'Atlas portfolio selector expanded to show several saved database portfolios',
      color: '#18385a',
    },
    {
      title: 'Portfolio overview',
      description: 'The overview summarizes value, risk profile, positions, daily change, and last update.',
      image: '/assets/images/ACIPics/2portfolioOverview.jpg',
      imageAlt: 'Portfolio overview panel with value, risk, position count, daily profit and loss, and update time',
      color: '#24364f',
    },
    {
      title: 'Allocation breakdown',
      description: 'Visitors can inspect concentration by asset, sector, class, geography, or currency.',
      image: '/assets/images/ACIPics/3allocationBreakdown.jpg',
      imageAlt: 'Asset allocation breakdown with category controls, donut chart, holdings, percentages, and values',
      color: '#285648',
    },
    {
      title: 'Manual portfolio builder',
      description: 'A structured workflow supports manual holdings entry and CSV, JSON, or XML upload.',
      image: '/assets/images/ACIPics/4CreatePortfolioManually.png',
      imageAlt: 'Manual portfolio builder with upload, portfolio details, row controls, and submit action',
      color: '#176b5a',
    },
    {
      title: 'Portfolio generator',
      description: 'A separate generator UI prepares editable holdings from sector and strategy filters.',
      image: '/assets/images/ACIPics/5CreatePortfolioGenerate.jpg',
      imageAlt: 'Portfolio generator with sector filters, asset count, portfolio value, and strategy controls',
      color: '#25695b',
    },
    {
      title: 'Scenario simulator',
      description: 'The simulation UI compares portfolio values and allocations before and after a selected stress scenario.',
      image: '/assets/images/ACIPics/6Simulator.jpg',
      imageAlt: 'Scenario simulator comparing two portfolios before and after a COVID liquidity shock',
      color: '#27445c',
    },
    {
      title: 'Plain-language assistant UI',
      description: 'Planned integration: the designed chat view can explain portfolio questions in beginner-friendly language.',
      image: '/assets/images/ACIPics/aiChat1Like5.jpg',
      imageAlt: 'Atlas assistant interface showing a beginner-friendly response to an oil price question',
      color: '#23624f',
    },
    {
      title: 'Expert assistant UI',
      description: 'Planned integration: the alternate response mode presents the same question with investment terminology.',
      image: '/assets/images/ACIPics/8aiChat2LikeExpert.jpg',
      imageAlt: 'Atlas assistant interface showing an expert-style response to an oil price question',
      color: '#245747',
    },
  ];

  readonly projectWalkthroughs: readonly ProjectWalkthrough[] = [
    {
      id: 'self-hosted-website',
      title: 'Self-hosted personal website',
      summary: 'The infrastructure path from a Raspberry Pi host through domain management to this live portfolio.',
      slides: this.personalWebsiteInfrastructureSlides,
    },
    {
      id: 'atlas-capital-intelligence',
      title: 'Atlas Capital Intelligence',
      summary: 'An implemented portfolio-analysis frontend; Alpaca retrieval, caching, and chatbot integration remain planned.',
      slides: this.atlasCapitalIntelligenceSlides,
    },
  ];
}
