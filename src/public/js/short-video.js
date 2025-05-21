const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
      video.muted = false
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}, { threshold: 0.75 });

videos.forEach(video => observer.observe(video));

videos.forEach(video => {

  video.addEventListener('click', function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});


let isScrolling;
document.addEventListener('wheel', function (event) {
  clearTimeout(isScrolling);

  isScrolling = setTimeout(() => {
    const direction = event.deltaY > 0 ? 'next' : 'prev';
    const sections = [...document.querySelectorAll('section')];
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;

    const currentIndex = Math.round(currentScroll / windowHeight);

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= sections.length) nextIndex = sections.length - 1;

    sections[nextIndex].scrollIntoView({
      behavior: 'smooth',
    });
  }, 100);
});
