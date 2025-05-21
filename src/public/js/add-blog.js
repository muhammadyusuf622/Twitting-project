document.getElementById("media").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const preview = document.querySelector(".checkVideoOrImage");

    // Fayl turi video yoki yo‘qligini tekshirish
    if (file.type.startsWith("video/")) {
      preview.innerHTML = `<video src="${URL.createObjectURL(
        file
      )}" controls autoplay loop muted style="width: 100%;  z-index: 100;"></video>`;
    } else if (file.type.startsWith("image/")) {
      preview.innerHTML = `<img src="${URL.createObjectURL(
        file
      )}" style="width: 100%; z-index: 100;">`;
    } else {
      preview.innerHTML = "<p>Faqat rasm yoki video yuklashingiz mumkin!</p>";
    }
  }
});
