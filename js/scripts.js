function test() {
    console.log("test")
};

const images = [
    "/pictures/jobs/0.jpeg",
    "/pictures/jobs/1.jpeg",
    "/pictures/jobs/2.jpeg",
    "/pictures/jobs/3.jpeg",
    "/pictures/jobs/4.jpeg",
    "/pictures/jobs/5.jpeg",
    "/pictures/jobs/6.jpeg",
    "/pictures/jobs/7.jpeg",
    "/pictures/jobs/8.jpeg",
    "/pictures/jobs/9.jpeg",
    "/pictures/jobs/10.jpeg",
    "/pictures/jobs/11.jpeg",
    "/pictures/jobs/12.jpeg",
    "/pictures/jobs/13.jpeg",
    "/pictures/jobs/14.jpeg",
    "/pictures/jobs/15.jpeg",
    "/pictures/jobs/16.jpeg",
    "/pictures/jobs/17.jpeg",
    "/pictures/jobs/18.jpeg",
    "/pictures/jobs/19.jpeg",


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

async function loadLanguage(lang) {
    const response = await fetch(`/json/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    localStorage.setItem("language", lang);
}

document.getElementById("it").addEventListener("click", () => loadLanguage("it"));
document.getElementById("de").addEventListener("click", () => loadLanguage("de"));

const savedLanguage = localStorage.getItem("language") || "de";
loadLanguage(savedLanguage);