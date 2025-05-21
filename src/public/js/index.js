const socket = io("http://localhost:3000");

const comment_btn = document.querySelector(".blog-comment");
const box_comment = document.querySelector(".box-comment");
const mute_but = document.querySelectorAll(".mute-button");

document.addEventListener("DOMContentLoaded", function () {
  const blog_comments = document.querySelectorAll(".blog-comment");

  blog_comments.forEach((comment) => {
    const textarea = comment.querySelector(".comment-textarea");
    const boxComment = comment.querySelector(".box-comment");
    const postBtn = comment.querySelector(".post");

    // Textarea input handler
    const handleInput = () => {
      const currentLength = textarea.value.length;
      if (postBtn) {
        postBtn.style.display = currentLength >= 1 ? "block" : "none";
      }
      textarea.style.color = currentLength >= 150 ? "red" : "white";
    };

    if (textarea) {
      textarea.addEventListener("input", handleInput);
    }

    // Post comment handler
    if (postBtn) {
      postBtn.addEventListener("click", function () {
        const userId = this.getAttribute("data-postid");
        const blogId = this.getAttribute("data-blogId");
        const client_comment = textarea.value;

        socket.emit("message", {
          userId: userId,
          blogId: blogId,
          comment: client_comment,
        });

        // socket.on("responsComment", (data) => {

        //   const allComment = comment.querySelector(".commentaria");

        //   let div = document.createElement("div");
        //   div.classList.add("comment");

        //   let iTag = document.createElement("i");
        //   iTag.classList.add("comment-cleint_usrenima-or-img");

        //   let img = document.createElement("img");
        //   img.src = data.image || "/images/user_not_found.jpg";
        //   img.alt = "";

        //   let h5 = document.createElement("h5");
        //   h5.textContent = data.email;

        //   let small = document.createElement("small");
        //   small.textContent = data.createdAt;

        //   let p = document.createElement("p");
        //   p.textContent = data.comment;

        //   iTag.appendChild(img);
        //   iTag.appendChild(h5);
        //   iTag.appendChild(small);

        //   div.appendChild(iTag);
        //   div.appendChild(p);

        //   allComment.appendChild(div);

        //   textarea.value = "";
        //   this.style.display = "none";
        // });

        
      });
    }

    // Comment box toggle
    comment.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("cancel") ||
        e.target.closest(".cancel")
      ) {
        boxComment.style.display = "none";
      } else if (!e.target.closest(".box-comment")) {
        boxComment.style.display = "block";
      }
    });
  });
});

// Videolar uchun /////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video.main-video");

  function setMuteForAllVideos(muted, logo) {
    mute_but.forEach((log) => {
      log.innerHTML = logo;
    });
    videos.forEach((video) => {
      video.muted = muted;
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    {
      threshold: 0.8,
    }
  );

  videos.forEach((video) => {
    observer.observe(video);

    video.addEventListener("click", function () {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    const muteButton = video.parentElement.querySelector(".mute-button");

    muteButton.addEventListener("click", function () {
      if (video.muted) {
        setMuteForAllVideos(false, `<i class="fa-solid fa-volume-high"></i>`);
      } else {
        setMuteForAllVideos(true, `<i class="fa-solid fa-volume-xmark"></i>`);
      }
    });
  });
});

// likelar uchun bo'lim //////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const likeButtons = document.querySelectorAll(".like-btn");

  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

  likeButtons.forEach((button, index) => {
    let postId = button.getAttribute("data-postid");
    let blogId = button.getAttribute("data-blogId");

    if (likedPosts[(postId, blogId)]) {
      button.style.color = "red";
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();

      let likeCount = document.querySelectorAll(".checkLikeCount");

      if (this.style.color === "red") {
        this.style.color = "";
        delete likedPosts[(postId, blogId)];
        fetch("/like", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: postId, blogId: blogId }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let currentCount = Number(likeCount[index].textContent);
            likeCount[index].textContent = String(currentCount - 1);
          })
          .catch((err) => console.log(err));
      } else {
        this.style.color = "red";
        likedPosts[(postId, blogId)] = true;
        fetch("/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: postId, blogId: blogId }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let currentCount = Number(likeCount[index].textContent);
            likeCount[index].textContent = String(currentCount + 1);
          })
          .catch((err) => console.log(err));
      }

      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    });
  });
});

document.querySelectorAll(".seeLikes").forEach((user) => {
  user.addEventListener("click", function (event) {
    event.preventDefault();

    const likesBox = this.querySelector(".likeBox");

    if (likesBox.style.display === "none" || likesBox.style.display === "") {
      likesBox.style.display = "block";
    } else {
      likesBox.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll(".save-btn");

  const savedPosts = JSON.parse(localStorage.getItem("savedPosts")) || {};

  saveButtons.forEach((button) => {
    const userId = button.getAttribute("data-postid");
    const blogId = button.getAttribute("data-blogId");
    const key = `${userId}_${blogId}`;

    if (savedPosts[key]) {
      button.querySelector("i").style.color = "blue";
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();

      const icon = this.querySelector("i");

      if (icon.style.color === "blue") {
        icon.style.color = "";
        delete savedPosts[key];

        fetch("/save", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, blogId }),
        })
          .then((res) => res.json())
          .then((data) => console.log("O'chirildi:", data))
          .catch((err) => console.log("Xatolik:", err));
      } else {
        icon.style.color = "blue";
        savedPosts[key] = true;

        fetch("/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, blogId }),
        })
          .then((res) => res.json())
          .then((data) => console.log("Saqlangan:", data))
          .catch((err) => console.log("Xatolik:", err));
      }

      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    });
  });
});

const imgNew = document.querySelector(".main-img");

imgNew.addEventListener("click", () => {
  // Agar hozir fullscreenda bo'lmasa
  if (!document.fullscreenElement) {
    if (imgNew.requestFullscreen) {
      imgNew.requestFullscreen();
    } else if (imgNew.webkitRequestFullscreen) {
      imgNew.webkitRequestFullscreen();
    } else if (imgNew.msRequestFullscreen) {
      imgNew.msRequestFullscreen();
    }
  } else {
    // Aks holda (fullscreenda bo‘lsa), undan chiqish
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});



socket.on("responsComment", (data) => {

  const commentBox = document.querySelector(`[data-blogid="${data.blogId}"]`);
  const parent = commentBox.closest(".blog-comment");
  if (!parent) return;

  const allComment = parent.querySelector(".commentaria");

  let div = document.createElement("div");
  div.classList.add("comment");

  let iTag = document.createElement("i");
  iTag.classList.add("comment-cleint_usrenima-or-img");

  let img = document.createElement("img");
  img.src = data.image || "/images/user_not_found.jpg";
  img.alt = "";

  let h5 = document.createElement("h5");
  h5.textContent = data.email;

  let small = document.createElement("small");
  small.textContent = data.createdAt;

  let p = document.createElement("p");
  p.textContent = data.comment;

  iTag.appendChild(img);
  iTag.appendChild(h5);
  iTag.appendChild(small);

  div.appendChild(iTag);
  div.appendChild(p);

  allComment.appendChild(div);

  // commentCount

  let commentCount = parent.querySelector('.commentCount')
    let currentCount = Number(commentCount.textContent);
    commentCount.textContent = String(currentCount + 1);

  // Textarea va postBtn ni tozalash (agar kerak bo‘lsa)
  const textarea = parent.querySelector(".comment-textarea");
  const postBtn = parent.querySelector(".post");
  if (textarea) textarea.value = "";
  if (postBtn) postBtn.style.display = "none";
});





window.addEventListener("beforeunload", () => {
  // Komment hodisalarini tozalash
  document.querySelectorAll(".blog-comment").forEach((comment) => {
    const textarea = comment.querySelector(".comment-textarea");
    const postBtn = comment.querySelector(".post");

    if (textarea) textarea.removeEventListener("input", handleInput);
    if (postBtn) postBtn.removeEventListener("click", handlePostComment);
    comment.removeEventListener("click", toggleBoxComment);
  });

  // Video hodisalarini tozalash
  document.querySelectorAll("video.main-video").forEach((video) => {
    video.pause();
    video.removeEventListener("click", togglePlayPause);
    const muteButton = video.parentElement.querySelector(".mute-button");
    if (muteButton) muteButton.removeEventListener("click", handleMuteClick);
  });

  // Like hodisalarini tozalash
  document.querySelectorAll(".like-btn").forEach((button) => {
    button.replaceWith(button.cloneNode(true)); // removeEventListener shortcut
  });

  // Save hodisalarini tozalash
  document.querySelectorAll(".save-btn").forEach((button) => {
    button.replaceWith(button.cloneNode(true));
  });

  // SeeLikes hodisasi
  document.querySelectorAll(".seeLikes").forEach((user) => {
    user.replaceWith(user.cloneNode(true));
  });

  // Fullscreen rasmi uchun
  const imgNew = document.querySelector(".main-img");
  if (imgNew) imgNew.replaceWith(imgNew.cloneNode(true));
});
