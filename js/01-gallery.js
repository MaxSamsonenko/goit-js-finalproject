import { galleryItems } from "./gallery-items.js";
// Change code below this line

//access gallery container
const gallery = document.querySelector(".gallery");

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
	//create instance of basicLightbox
	const instance = basicLightbox.create(
		`
    <div class="backdrop">
        <div class="modal">
            <img src="${e.target.dataset.source}" class="original__image" alt="${e.target.alt}"/>
    	</div>
    </div>
`,
		{
			onShow: (instance) => {
				window.addEventListener("keydown", onEscPress);
				instance.element().addEventListener("click", () => instance.close());
			},
			onClose: () => {
				window.removeEventListener("keydown", onEscPress);
			},
		}
	);
	instance.show();

	function onEscPress(e) {
		if (e.code !== "Escape") {
			return;
		}
		instance.close();
	}
}
