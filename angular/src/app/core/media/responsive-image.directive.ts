import { Directive, HostBinding, Input } from '@angular/core';
import { IMAGE_MANIFEST } from './image-manifest';

/** Keep URLs out of the DOM until their section/card needs them. */
@Directive({ selector: 'img[responsiveImage]' })
export class ResponsiveImageDirective {
  @Input({ required: true }) responsiveImage = '';
  @Input() mediaEnabled = true;
  @Input() imageSlotWidth = 0;
  @Input() imageSlotHeight = 0;
  @Input() imageSizes = '';

  private get asset() {
    return IMAGE_MANIFEST['/' + this.responsiveImage.replace(/^\//, '')];
  }

  @HostBinding('attr.src') get src() {
    return this.mediaEnabled ? this.asset?.src ?? this.responsiveImage : null;
  }
  @HostBinding('attr.srcset') get srcset() {
    return this.mediaEnabled ? this.asset?.srcset ?? null : null;
  }
  @HostBinding('attr.width') get width() { return this.asset?.width ?? null; }
  @HostBinding('attr.height') get height() { return this.asset?.height ?? null; }
  @HostBinding('attr.decoding') readonly decoding = 'async';
  @HostBinding('attr.sizes') get sizes() {
    if (this.imageSizes) return this.imageSizes;
    // Cover crops need more source pixels than the visible width. Leave 15% headroom;
    // the browser additionally accounts for device pixel ratio and page zoom.
    if (!this.imageSlotWidth) return '100vw';
    const ratio = this.asset ? this.asset.width / this.asset.height : 1;
    return `${Math.ceil(Math.max(this.imageSlotWidth, this.imageSlotHeight * ratio) * 1.15)}px`;
  }
}
