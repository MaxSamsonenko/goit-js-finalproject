import { galleryItems } from "./gallery-items.js";
// Change code below this line

//access gallery container
const gallery = document.querySelector(".gallery");

//create instance of basicLightbox
const instance = basicLightbox.create(
	`
    <div class="backdrop">
        <div class="modal">
            <img src="" class="original__image"/>
    	</div>
    </div>
`
);
//create gallery markup
const markup = galleryItems
	.map(
		({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
	)
	.join("");
//add markup to the gallery
gallery.innerHTML = markup;

//add event listener to the gallery container
gallery.addEventListener("click", handleShowImg);

//check to see if an image was clicked, and if yes, open basiclightbox instance, and add modal window event listener
function handleShowImg(e) {
	e.preventDefault();
	if (e.target.nodeName !== "IMG") {
		return;
	}
	instance.show();
	const img = instance.element().querySelector("img");
	img.src = e.target.dataset.source;
	img.alt = e.target.alt;

	addModalListener();
}
//adds event listener on modal window and window object
function addModalListener() {
	const modal = document.querySelector(".modal");
	modal.addEventListener("click", onModalClick);
	window.addEventListener("keydown", onEscPress);
}
//close modal window and remove event listener from window obj on click
function onModalClick() {
	window.removeEventListener("keydown", onEscPress);
	instance.close();
}

//close modal on "Escape" key press, and remove event listener from window obj
function onEscPress(e) {
	if (e.code !== "Escape") {
		return;
	}
	window.removeEventListener("keydown", onEscPress);
	instance.close();
}
