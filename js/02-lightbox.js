import { galleryItems } from "./gallery-items.js";
// Change code below this line

//get access to gallery container
const galleryContainer = document.querySelector(".gallery");

//create gallery markup
const galleryMarkup = galleryItems
	.map(
		({ preview, original, description }) => `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" data-title="${description}" />
   </a>
</li>`
	)
	.join("");

//add markup to the gallery container
galleryContainer.innerHTML = galleryMarkup;

//create simpleLightBox instance with options
let gallerySlider = new SimpleLightbox(".gallery a", {
	captionType: "data",
	captionDelay: 250,
});
