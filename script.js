// Fade-in video only when it can actually play; keep image visible as fallback
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const media = target;                 // .panel-media
      const video = media.querySelector('video');
      if (!video) return;

      const activateVideo = () => {
        video.play()
          .then(() => media.classList.add('is-playing'))
          .catch(() => {/* leave image visible */});
      };

      // If video already has data, go; otherwise wait for load
      if (video.readyState >= 2) activateVideo();
      else {
        video.addEventListener('loadeddata', activateVideo, { once: true });
        video.addEventListener('error', () => media.classList.remove('is-playing'), { once: true });
        video.load();
      }

      observer.unobserve(media);
    });
  }, { rootMargin: '200px 0px' });

  document.querySelectorAll('.panel .panel-media').forEach(m => observer.observe(m));
})();

