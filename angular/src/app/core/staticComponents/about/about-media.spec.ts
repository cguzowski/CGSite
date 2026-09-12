import { waitForAboutMedia } from './about-media';

describe('About media priority', () => {
  let visible: () => void;
  let cleanup: () => void;
  let video: HTMLVideoElement;
  let ready: jasmine.Spy;
  beforeEach(() => {
    video = document.createElement('video');
    ready = jasmine.createSpy('ready');
    spyOn(window, 'IntersectionObserver').and.callFake(function(callback: IntersectionObserverCallback) {
      visible = () => callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
      return { observe: () => {}, disconnect: () => {} } as unknown as IntersectionObserver;
    });
  });
  afterEach(() => cleanup?.());
  it('waits for Fuji when About is visible', () => {
    cleanup = waitForAboutMedia(document.createElement('div'), video, false, ready);
    visible();
    expect(ready).not.toHaveBeenCalled();
    video.dispatchEvent(new Event('loadeddata'));
    expect(ready).toHaveBeenCalledTimes(1);
  });
  it('waits for About when Fuji is ready', () => {
    cleanup = waitForAboutMedia(document.createElement('div'), video, false, ready);
    video.dispatchEvent(new Event('loadeddata'));
    expect(ready).not.toHaveBeenCalled();
    visible();
    expect(ready).toHaveBeenCalledTimes(1);
  });
  it('does not block on failed video', () => {
    cleanup = waitForAboutMedia(document.createElement('div'), video, false, ready);
    video.dispatchEvent(new Event('error'));
    visible();
    expect(ready).toHaveBeenCalledTimes(1);
  });
  it('does not wait for hidden reduced-motion video', () => {
    cleanup = waitForAboutMedia(document.createElement('div'), video, true, ready);
    visible();
    expect(ready).toHaveBeenCalledTimes(1);
  });
  it('cancels pending loading on destruction', () => {
    cleanup = waitForAboutMedia(document.createElement('div'), video, false, ready);
    visible();
    cleanup();
    video.dispatchEvent(new Event('loadeddata'));
    expect(ready).not.toHaveBeenCalled();
  });
});

