function logout() {
  window.location.href = "/profile/exit";
}

document
  .getElementById("media")
  .addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch("/profile/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.imageUrl) {
        document.querySelector(".profile-img").src = data.imageUrl;
        localStorage.setItem("profileImageUrl", data.imageUrl);
      }
    } catch (error) {
      console.error("Rasm yuklashda xatolik:", error);
    }
  });

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

document.querySelector(".fa-gear").addEventListener("click", function (e) {
  e.preventDefault();
  const bars = document.querySelector(".bars");
  bars.style.display = bars.style.display === "block" ? "none" : "block";
});
