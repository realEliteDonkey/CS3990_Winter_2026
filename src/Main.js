// Central app entrypoint.
// Import all feature modules here, then initialize from this file.

// Example imports (uncomment and adjust as files are added):
// import { initNavbar } from "./navbar.js";
// import { initGallery } from "./gallery.js";

import { initHeader } from "./Header.js";

function initBody() {

}

function initFooter() {

}

function initApp() {
	// jQuery is available globally from the CDN script in index.html.
	// Example:
	// $("#status").text("App initialized");

	// Call imported module initializers here.
	// initNavbar();
	// initGallery();

    initHeader();
    initBody();
    initFooter();

    // rest
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp);
} else {
	initApp();
}

