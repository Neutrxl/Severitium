// Script is unused, it is shown just as example

// Uses _imageToBase64 function from _additional folder

// Image URL
const url = '';

imageToBase64(url, function(base64Image) {
	// Define CSS
	const CSS = `.MainScreenComponentStyle-playButtonContainer{background:url('${base64Image}')}`;

	// Create a <style> element
	var styleElement = document.createElement('style');

	// Set the CSS text to your styles
	styleElement.textContent = CSS;

	// Apply styles to body (to override initial styles)
	document.body.appendChild(styleElement);
});