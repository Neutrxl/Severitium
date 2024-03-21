// ==UserScript==

// @name			CSS Common Container
// @version			1.1.0
// @description		Injects CSS code into the page
// @author			OrakomoRi

// @icon			https://i.imgur.com/InNLwvb.png

// @match			https://*.tankionline.com/*

// @connect			raw.githubusercontent.com
// @connect			cdn.jsdelivr.net

// @run-at			document-start
// @grant			GM_xmlhttpRequest
// @grant			unsafeWindow

// ==/UserScript==

(function() {
	'use strict';

	// Link to raw CSS file
	const link = 'https://raw.githubusercontent.com/Neutrxl/Themed/main/src/General/CommonContainer/CommonContainer.min.css';

	// Make an AJAX request to fetch the CSS file
	GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onload: function(response) {
			// Inject CSS into the page
			// Create a <style> element
			var styleElement = document.createElement('style');
			// Set the CSS text to styles
			styleElement.textContent = response.responseText;
			// Apply styles to body end (to override initial styles)
			document.body.appendChild(styleElement);
		},
		onerror: function(error) {
			console.error('Failed to load CSS file:', error);
		}
	});

	// Link to raw TXT file
	const imageLink = `https://raw.githubusercontent.com/Neutrxl/Themed/main/src/_Base64/General/png/CommonContainer.txt`;

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: imageLink,
		onload: function(response) {
			// Initial adding of the background to the first entrance screen
			const styledBackgrounds = `.Common-container{background-image:url(data:image/png;base64,${response.responseText})}`;
			var styleElement = document.createElement("style");
			styleElement.textContent = styledBackgrounds;
			document.body.appendChild(styleElement);
		}
	});
})();