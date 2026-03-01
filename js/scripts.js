function test() {
    console.log("test")
};

const images = [
    "/pictures/jobs.png",
    "/pictures/AI_man.png",
    "/pictures/AI_man.png"

];

const gallery = document.getElementById("gallery");

images.forEach(src=> {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("w-full", "h-64", "object-cover", "rounded-lg", "shadow-lg", "transition-transform", "duration-500", "hover:scale-105");
    gallery.appendChild(img);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        lightboxImg.src = e.target.src;
        lightbox.classList.remove("hidden");
    }
});

lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});