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
const supportedLanguages = ["de", "it"];
const languageMeta = {
    de: { hreflang: "de-CH", htmlLang: "de-CH" },
    it: { hreflang: "it-CH", htmlLang: "it-CH" },
};

const pageSeo = {
    "/": {
        de: {
            title: "Mastrobau Basel – Gipserarbeiten, Malerarbeiten & Renovationen",
            description: "Mastrobau in Basel bietet Gipserarbeiten, Malerarbeiten, Plattenlegen, Kundenmaurerarbeiten, Altbaurenovationen und Stucco Veneziano. Persönlich, sauber und zuverlässig.",
        },
        it: {
            title: "Mastrobau Basilea – Lavori edili, pittura e ristrutturazioni",
            description: "Mastrobau a Basilea offre lavori da gessatore, pittura, posa di piastrelle, muratura, restauri e Stucco Veneziano. Servizio personale, pulito e affidabile.",
        },
    },
    "/pages/services/services.html": {
        de: {
            title: "Baudienstleistungen in Basel | Mastrobau",
            description: "Entdecken Sie die Leistungen von Mastrobau in Basel: Gipserarbeiten, Malerarbeiten, Kundenmaurerarbeiten, Plattenlegerarbeiten, Altbaurenovationen und Stucco Veneziano.",
        },
        it: {
            title: "Servizi edili a Basilea | Mastrobau",
            description: "Scopri i servizi di Mastrobau a Basilea: lavori da gessatore, pittura, muratura, posa di piastrelle, restauri e Stucco Veneziano.",
        },
    },
    "/pages/completed/jobs.html": {
        de: {
            title: "Erledigte Arbeiten und Renovationen | Mastrobau Basel",
            description: "Sehen Sie eine Auswahl realisierter Arbeiten von Mastrobau in Basel: hochwertige Oberflächen, Renovationen, Plattenlegerarbeiten und Stucco Veneziano.",
        },
        it: {
            title: "Lavori svolti e ristrutturazioni | Mastrobau Basilea",
            description: "Guarda una selezione di lavori svolti da Mastrobau a Basilea: finiture, restauri, ristrutturazioni, posa di piastrelle e soluzioni in Stucco Veneziano.",
        },
    },
    "/pages/myself/myself.html": {
        de: {
            title: "Über uns | Mastrobau Basel",
            description: "Lernen Sie Giovanni Arcieri, Inhaber von Mastrobau in Basel, und seine präzise, konkrete und qualitätsorientierte Arbeitsweise kennen.",
        },
        it: {
            title: "Chi siamo | Mastrobau Basilea",
            description: "Conosci Giovanni Arcieri, titolare di Mastrobau a Basilea, e il suo approccio concreto, preciso e orientato alla qualità nei lavori edili.",
        },
    },
    "/pages/legal/impressum.html": {
        de: {
            title: "Rechtliches | Mastrobau",
            description: "Rechtliche Informationen, Kontaktangaben und Haftungshinweise der Website Mastrobau.",
        },
        it: {
            title: "Informazioni legali | Mastrobau",
            description: "Informazioni legali, contatti e note sulla responsabilità del sito Mastrobau.",
        },
    },
    "/pages/legal/DSG.html": {
        de: {
            title: "Datenschutz | Mastrobau",
            description: "Informationen zum Datenschutz, zu technischen Zugriffsdaten und zur Privatsphäre auf der Website Mastrobau.",
        },
        it: {
            title: "Protezione dei dati | Mastrobau",
            description: "Informazioni sulla protezione dei dati personali, log tecnici e privacy per il sito Mastrobau.",
        },
    },
};

function getPagePath() {
    return window.location.pathname === "/index.html" ? "/" : window.location.pathname;
}

function getLocalizedUrl(lang) {
    const pagePath = getPagePath();
    const path = pagePath === "/" ? "/" : pagePath;
    return `https://mastrobau.ch${path}?lang=${lang}`;
}

function upsertHeadLink(rel, attrs) {
    const selector = attrs.hreflang ? `link[rel="${rel}"][hreflang="${attrs.hreflang}"]` : `link[rel="${rel}"]`;
    let link = document.head.querySelector(selector);

    if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
    }

    Object.entries(attrs).forEach(([name, value]) => link.setAttribute(name, value));
}

function updateSeo(lang) {
    const pagePath = getPagePath();
    const seo = pageSeo[pagePath]?.[lang];

    document.documentElement.lang = languageMeta[lang].htmlLang;

    if (seo) {
        document.title = seo.title;

        const description = document.head.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", seo.description);
        }

        const ogTitle = document.head.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute("content", seo.title);
        }

        const ogDescription = document.head.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute("content", seo.description);
        }
    }

    upsertHeadLink("canonical", { href: getLocalizedUrl(lang) });

    supportedLanguages.forEach((supportedLang) => {
        upsertHeadLink("alternate", {
            hreflang: languageMeta[supportedLang].hreflang,
            href: getLocalizedUrl(supportedLang),
        });
    });

    upsertHeadLink("alternate", {
        hreflang: "x-default",
        href: getLocalizedUrl("de"),
    });
}

function updateLanguageUrl(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
}

if (gallery) {
    images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Lavoro realizzato da Mastrobau ${index + 1}`;
        img.loading = "lazy";
        img.decoding = "async";
        img.width = 640;
        img.height = 480;
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
}

async function loadLanguage(lang) {
    const response = await fetch(`/json/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[key]) {
            if (element.hasAttribute("data-i18n-html")) {
                element.innerHTML = translations[key];
            } else {
                element.textContent = translations[key];
            }
        }
    });

    localStorage.setItem("language", lang);
    updateSeo(lang);
};

function setLanguage(lang, shouldUpdateUrl = false) {
    if (!supportedLanguages.includes(lang)) {
        lang = "de";
    }

    if (shouldUpdateUrl) {
        updateLanguageUrl(lang);
    }

    loadLanguage(lang);
}

document.getElementById("it").addEventListener("click", () => setLanguage("it", true));
document.getElementById("de").addEventListener("click", () => setLanguage("de", true));

const urlLanguage = new URLSearchParams(window.location.search).get("lang");
const savedLanguage = localStorage.getItem("language");
const initialLanguage = supportedLanguages.includes(urlLanguage)
    ? urlLanguage
    : supportedLanguages.includes(savedLanguage)
        ? savedLanguage
        : "de";

if (!supportedLanguages.includes(urlLanguage)) {
    updateLanguageUrl(initialLanguage);
}

setLanguage(initialLanguage);
