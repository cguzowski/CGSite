/** Keep the optional About chunk behind both the hero's first frame and About visibility. */
export function waitForAboutMedia(host: HTMLElement, video: HTMLVideoElement | null, reducedMotion: boolean, ready: () => void): () => void {
  let mediaReady = !video || reducedMotion || video.readyState >= 2 || !!video.error;
  let visible = false;
  let finished = false;
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    check();
  });
  const sources = video ? Array.from(video.querySelectorAll('source')) : [];
  function cleanup(): void {
    finished = true;
    observer.disconnect();
    video?.removeEventListener('loadeddata', onMediaReady);
    video?.removeEventListener('error', onMediaReady);
    sources.forEach(source => source.removeEventListener('error', onMediaReady));
  }
  function check(): void {
    if (!finished && mediaReady && visible) {
      cleanup();
      ready();
    }
  }
  function onMediaReady(): void {
    mediaReady = true;
    check();
  }
  video?.addEventListener('loadeddata', onMediaReady);
  video?.addEventListener('error', onMediaReady);
  sources.forEach(source => source.addEventListener('error', onMediaReady));
  observer.observe(host);
  return cleanup;
}
