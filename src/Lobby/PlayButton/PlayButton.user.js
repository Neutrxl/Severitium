// ==UserScript==

// @name			CSS Play Button
// @version			1.8.2
// @description		Injects CSS code into the page
// @author			OrakomoRi

// @icon			https://i.imgur.com/InNLwvb.png

// @match			https://*.tankionline.com/*

// @connect			raw.githubusercontent.com
// @connect			cdn.jsdelivr.net

// @require			https://raw.githubusercontent.com/Neutrxl/Themed/main/src/Lobby/PlayButton/PlayButtonAnimation.min.js

// @run-at			document-start
// @grant			GM_xmlhttpRequest
// @grant			unsafeWindow

// ==/UserScript==

(function() {
	'use strict';

	// Link to raw TXT file
	const link = 'https://raw.githubusercontent.com/Neutrxl/Themed/main/src/_Base64/Lobby/png/PlayButton.txt';

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onload: function(response) {
			const target = `.MainScreenComponentStyle-playButtonContainer{background-image:url(data:image/png;base64,${response.responseText})}`;

			var styleElement = document.createElement("style");
			styleElement.textContent = target;
			document.body.appendChild(styleElement);
		},
		onerror: function(error) {
			console.error('Failed to load TXT file:', error);
		}
	});

	// Link to raw CSS file
	const link2 = 'https://raw.githubusercontent.com/Neutrxl/Themed/main/src/Lobby/PlayButton/PlayButton.min.css';

	// Make an AJAX request to fetch the CSS file
	GM_xmlhttpRequest({
		method: 'GET',
		url: link2,
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
})();