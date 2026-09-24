import { TestBed } from '@angular/core/testing';
import { SectionNavigationComponent } from './section-navigation.component';

describe('Mobile section navigation layout', () => {
  it('keeps following content stationary through entry, expansion and exit', () => {
    const fixture = TestBed.createComponent(SectionNavigationComponent);
    fixture.componentRef.setInput('section', 'about');
    fixture.componentRef.setInput('title', 'About');
    fixture.detectChanges();
    const frame = document.createElement('iframe');
    frame.style.width = '375px';
    frame.style.height = '812px';
    document.body.append(frame);
    try {
      const doc = frame.contentDocument!;
      document.querySelectorAll('style').forEach(style => doc.head.append(style.cloneNode(true)));
      const host = fixture.nativeElement.cloneNode(true) as HTMLElement;
      const content = doc.createElement('p');
      content.textContent = 'Section content must not teleport';
      doc.body.append(host, content);
      const top = content.getBoundingClientRect().top;
      const height = host.getBoundingClientRect().height;
      for (const state of ['stuck', 'expanded', 'collapsed', 'title']) {
        host.classList.toggle('stuck', state !== 'title');
        host.querySelector('h2')!.classList.toggle('expanded', state === 'expanded');
        host.querySelector('nav')!.hidden = state !== 'expanded';
        expect(content.getBoundingClientRect().top).withContext(state).toBeCloseTo(top, 2);
        expect(host.getBoundingClientRect().height).withContext(state).toBeCloseTo(height, 2);
      }
    } finally {
      frame.remove();
      fixture.destroy();
    }
  });
});
