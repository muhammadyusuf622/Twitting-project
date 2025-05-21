document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".blog-video");

  videos.forEach((video) => {
    video.pause();
    video.muted = true;

    video.addEventListener("mouseenter", function () {
      this.play();
      video.muted = false;
    });
    video.addEventListener("mouseleave", function () {
      this.pause();
      video.muted = true;
    });
  });
});
