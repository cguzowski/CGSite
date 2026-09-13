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

  it('renders the standalone card slider instead of the old project card copy', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('app-project-card-slider')).not.toBeNull();
    expect(host.textContent).not.toContain('More Projects I\'ve made Coming Soon!');
  });

  it('supplies the five project screenshots in numeric filename order', () => {
    const images = Array.from(
      fixture.nativeElement.querySelectorAll('app-project-card-slider img'),
      (image: Element) => image.getAttribute('src'),
    );

    expect(images).toEqual([
      '/assets/images/CGSitePhotos/0raspby.jpg',
      '/assets/images/CGSitePhotos/1RPiConnect.png',
      '/assets/images/CGSitePhotos/2NameCheap.png',
      '/assets/images/CGSitePhotos/3Cloudflare.png',
      '/assets/images/CGSitePhotos/4LiveWebsite.png',
    ]);
  });

  it('supplies the verified external destinations in card order', () => {
    expect(component.projects.map(({ url }) => url)).toEqual([
      'https://www.raspberrypi.com/',
      'https://connect.raspberrypi.com/',
      'https://www.namecheap.com/',
      'https://www.cloudflare.com/',
      'https://cguzowski.com/',
    ]);
  });
});
