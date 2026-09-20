import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResponsiveImageDirective } from './responsive-image.directive';

@Component({ imports: [ResponsiveImageDirective], template: '<img responsiveImage="/assets/images/CGSitePhotos/0raspby.jpg" [mediaEnabled]="enabled" [imageSlotWidth]="320" [imageSlotHeight]="240" alt="Host">' })
class ImageHost { enabled = false; }

describe('Responsive image requests', () => {
  it('withholds request URLs until enabled and provides responsive candidates with crop headroom', () => {
    const fixture = TestBed.createComponent(ImageHost);
    fixture.detectChanges();
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.hasAttribute('src')).toBeFalse();
    expect(image.hasAttribute('srcset')).toBeFalse();
    fixture.componentInstance.enabled = true;
    fixture.detectChanges();
    expect(image.getAttribute('src')).toBeTruthy();
    expect(image.getAttribute('srcset')).toContain('w');
    expect(parseFloat(image.sizes)).toBeGreaterThanOrEqual(368);
    expect(image.decoding).toBe('async');
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });
});
