import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders each project walkthrough with its own reusable card slider', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelectorAll('.project-walkthrough').length).toBe(3);
    expect(host.querySelectorAll('app-project-card-slider').length).toBe(3);
    expect(host.textContent).toContain('Self-hosted personal website');
    expect(host.textContent).toContain('Payment Incident AI Copilot');
    expect(host.textContent).toContain('Atlas Capital Intelligence');
    expect(host.textContent).not.toContain('More Projects I\'ve made Coming Soon!');
  });

  it('places the Payment Incident AI Copilot walkthrough before Atlas', () => {
    expect(component.projectWalkthroughs.map(({ id }) => id)).toEqual([
      'self-hosted-website',
      'payment-incident-ai-copilot',
      'atlas-capital-intelligence',
    ]);
    expect(component.projectWalkthroughs[1].slides).toBe(component.paymentCopilotSlides);
  });

  it('supplies the five infrastructure screenshots in numeric filename order', () => {
    const images = component.personalWebsiteInfrastructureSlides.map(({ image }) => image);

    expect(images).toEqual([
      '/assets/images/CGSitePhotos/0raspby.jpg',
      '/assets/images/CGSitePhotos/1RPiConnect.png',
      '/assets/images/CGSitePhotos/2NameCheap.png',
      '/assets/images/CGSitePhotos/3Cloudflare.png',
      '/assets/images/CGSitePhotos/4LiveWebsite.png',
    ]);
  });

  it('supplies the verified infrastructure destinations in card order', () => {
    expect(component.personalWebsiteInfrastructureSlides.map(({ url }) => url)).toEqual([
      'https://www.raspberrypi.com/',
      'https://connect.raspberrypi.com/',
      'https://www.namecheap.com/',
      'https://www.cloudflare.com/',
      'https://cguzowski.com/',
    ]);
  });

  it('supplies the Atlas walkthrough in intended story order and labels planned integration honestly', () => {
    expect(component.atlasCapitalIntelligenceSlides.map(({ image }) => image)).toEqual([
      '/assets/images/ACIPics/0dashbaordOverview.jpg',
      '/assets/images/ACIPics/1dbPortfolios.png',
      '/assets/images/ACIPics/2portfolioOverview.jpg',
      '/assets/images/ACIPics/3allocationBreakdown.jpg',
      '/assets/images/ACIPics/4CreatePortfolioManually.png',
      '/assets/images/ACIPics/5CreatePortfolioGenerate.jpg',
      '/assets/images/ACIPics/6Simulator.jpg',
      '/assets/images/ACIPics/aiChat1Like5.jpg',
      '/assets/images/ACIPics/8aiChat2LikeExpert.jpg',
    ]);
    expect(component.projectWalkthroughs[2].summary).toContain('planned');
  });
});
