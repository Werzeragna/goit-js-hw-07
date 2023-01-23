import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const createImages = (options) =>
  options
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__link">
      <img class = "gallery__image" src= "${preview}" data-source= "${original}" alt= "${description}"></a>`
    )
    .join("");

galleryEl.insertAdjacentHTML("beforeend", createImages(galleryItems));

const onGalleryEl = (event) => {
  event.preventDefault();
  const imgEl = event.target;

  if (imgEl.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${imgEl.dataset.source}">`
  );
  instance.show();

  const onPressKeyESC = (event) => {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", onPressKeyESC);
    }
  };
  if (instance.visible()) {
    window.addEventListener("keydown", onPressKeyESC);
  }
};

galleryEl.addEventListener("click", onGalleryEl);
