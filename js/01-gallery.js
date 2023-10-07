import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

const instance = basicLightbox.create(
	`
    <div class="backdrop">
        <div class="modal">
            <img src="" class="original__image"/>
    	</div>
    </div>
`
);

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

gallery.innerHTML = markup;

const onEscPress = (e) => {
	if (e.code !== "Escape") {
		return;
	}
	window.removeEventListener("keydown", onEscPress);
	instance.close();
};
const onModalClick = () => {
	window.removeEventListener("keydown", onEscPress);
	instance.close();
};
const addModalListener = () => {
	const modal = document.querySelector(".modal");
	modal.addEventListener("click", onModalClick);
	window.addEventListener("keydown", onEscPress);
};
const handleShowImg = (e) => {
	e.preventDefault();
	if (e.target.nodeName !== "IMG") {
		return;
	}
	instance.show();
	const img = instance.element().querySelector("img");
	img.src = e.target.dataset.source;
	img.alt = e.target.alt;

	addModalListener();
};

gallery.addEventListener("click", handleShowImg);
