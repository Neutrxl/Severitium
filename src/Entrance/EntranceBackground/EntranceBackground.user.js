// ==UserScript==

// @name			CSS Entrance Background
// @version			1.3.2
// @description		Injects CSS code into the page
// @author			OrakomoRi

// @icon			https://i.imgur.com/InNLwvb.png

// @match			https://*.tankionline.com/*

// @connect			raw.githubusercontent.com
// @connect			cdn.jsdelivr.net

// @require			https://raw.githubusercontent.com/Neutrxl/Themed/main/src/_additional/_getSeason.min.js

// @run-at			document-start
// @grant			GM_xmlhttpRequest
// @grant			unsafeWindow

// ==/UserScript==

(function() {
	'use strict';

	// Link to raw CSS file
	const link = 'https://raw.githubusercontent.com/Neutrxl/Themed/main/src/Entrance/EntranceBackground/EntranceBackground.min.css';

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



	const season = _getSeason();

	// Link to raw TXT file
	const imageLink = `https://raw.githubusercontent.com/Neutrxl/Themed/main/src/_Base64/Entrance/png/${season}.txt`;

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: imageLink,
		onload: function(response) {
			// Initial adding of the background to the first entrance screen
			const styledBackgrounds = `.Common-container.Common-entranceBackground{background-image:url(data:image/png;base64,${response.responseText})}.Common-background.SystemMessageStyle-container{background-image:url(data:image/png;base64,${response.responseText})}`;
			var styleElement = document.createElement("style");
			styleElement.textContent = styledBackgrounds;
			document.body.appendChild(styleElement);

			/**
			 * Function to set the custom background (image) as element
			*/
			function backgroundSetup() {
				// Set image as background with url
				const backgroundImageUrl = `data:image/png;base64,${response.responseText}`;
				const elements = document.querySelectorAll('.Common-entranceBackground, .Common-changingBackground');
				for (const element of elements) {
					// If element is one of changing backgrounds
					if (element.classList.contains('Common-changingBackground')) {
						// Get the parent node of the element
						const parent = element.parentNode;
						// Check if the parent already has div.custom-background
						const existingCustomBackground = parent.querySelector('div.severitium-custom-background');
						if (!existingCustomBackground) { // If not
							const div = document.createElement('div');
							div.classList.add('severitium-custom-background');
							div.style.backgroundImage = `url(${backgroundImageUrl})`;
							element.parentNode.replaceChild(div, element);
						} else { // If yes
							// There's only one background element needed for purposes
							parent.removeChild(element);
						}
					}
				}
			}

			/**
			 * Create a new instance of MutationObserver with a callback function
			 * to observe changes in the DOM 
			*/
			const observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type === 'childList') { // If the change is of type childList
						mutation.addedNodes.forEach(function (node) { // Iterate through added nodes
							if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
								// Find an element with the needed selector in the added node
								const entranceBackground = node.querySelector(`.Common-changingBackground, .Common-entranceBackground`);
								if (entranceBackground) { // If found
									backgroundSetup();
								}
							}
						});
					}
				});
			});

			// Configuration for the mutation observer
			const observerConfig = { childList: true, subtree: true };

			// Start observing mutations in the document body
			observer.observe(document.body, observerConfig);
		},
		onerror: function(error) {
			console.error('Failed to load TXT file:', error);
		}
	});
})();