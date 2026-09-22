import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectComponent } from './connect.component';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('presents the requested direct connections as accessible icon-and-text links', () => {
    const host = fixture.nativeElement as HTMLElement;
    const items = Array.from(host.querySelectorAll<HTMLElement>('.contact-item'));

    expect(items.length).toBe(6);
    expect(items.map((item) => item.querySelector('.contact-item__title')?.textContent?.trim())).toEqual([
      'Where you can find me',
      'Email me at',
      'Call Me',
      'GitHub',
      'Check out my Resume!',
      "Let's Connect"
    ]);

    const links = Array.from(host.querySelectorAll<HTMLAnchorElement>('.contact-item[href]'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://www.google.com/maps/search/?api=1&query=New+York+City%2C+New+York',
      'mailto:cguzowski.dev@gmail.com',
      'tel:+16468545750',
      'https://github.com/cguzowski',
      'assets/documents/resume.pdf',
      'https://www.linkedin.com/in/chris-guzowski/'
    ]);
    expect(links[4].hasAttribute('download')).toBeFalse();
    expect(links[4].getAttribute('target')).toBe('_blank');

    for (const item of items) {
      expect(item.querySelector('.contact-item__icon')).not.toBeNull();
      expect(item.querySelector('.contact-item__copy')).not.toBeNull();
    }

    for (const link of [links[0], links[3], links[5]]) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });

  it('offers a centered icon link back to the Home section', () => {
    const backToTop = fixture.nativeElement.querySelector('.back-to-top') as HTMLAnchorElement | null;

    expect(backToTop).not.toBeNull();
    expect(backToTop?.textContent?.trim()).toBe('');
    expect(backToTop?.getAttribute('href')).toBe('#home');
    expect(backToTop?.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
  });
});
