(function () {
	/**
	 * Function to replace notification images with SVG elements
	 * 
	 * @param {HTMLElement} element - The element to be replaced
	*/
	function replaceNotificationImg(element) {
		// Get computed styles of the element
		var initStyles = window.getComputedStyle(element);

		// Create a new SVG element
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('viewBox', '0 0 30 30');

		// Get specific styles of the original element
		var position = initStyles.getPropertyValue('position');
		var display = initStyles.getPropertyValue('display');
		var height = initStyles.getPropertyValue('height');
		var width = initStyles.getPropertyValue('width');
		var right = initStyles.getPropertyValue('right');
		var top = initStyles.getPropertyValue('top');
		var left = initStyles.getPropertyValue('left');
		var bottom = initStyles.getPropertyValue('bottom');
		var marginRight = initStyles.getPropertyValue('margin-right');
		var marginLeft = initStyles.getPropertyValue('margin-left');
		var marginTop = initStyles.getPropertyValue('margin-top');
		var marginBottom = initStyles.getPropertyValue('margin-bottom');

		// Set styles for the SVG element
		svg.style.setProperty('position', position);
		svg.style.setProperty('display', display);
		svg.style.setProperty('height', height);
		svg.style.setProperty('width', width);
		svg.style.setProperty('right', right);
		svg.style.setProperty('top', top);
		svg.style.setProperty('left', left);
		svg.style.setProperty('bottom', bottom);
		svg.style.setProperty('margin-right', marginRight);
		svg.style.setProperty('margin-left', marginLeft);
		svg.style.setProperty('margin-top', marginTop);
		svg.style.setProperty('margin-bottom', marginBottom);

		// Add SVG inner content
		svg.innerHTML = `
		<circle cx="15" cy="15" r="8" fill="var(--theme-main-color)"/>
		<circle cx="15" cy="15" r="11.5" stroke="var(--theme-main-color)" stroke-opacity="0.25" stroke-width="7"/>
	`;

		// Replace the original element with the SVG
		element.parentNode.replaceChild(svg, element);
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
						// Find an element with the selector in the added node
						const iconImg = node.querySelector(`img[class*='notification'i][src*='ellipse'i], img[class*='new'i][src*='ellipse'i], .NewsComponentStyle-newsItemDate img[src=*'circle'i]`);
						if (iconImg) { // If found
							// Get all elements with the class 'img[class*='notification'i][src*='ellipse'i]'
							const iconsImg = document.querySelectorAll(`img[class*='notification'i][src*='ellipse'i], img[class*='new'i][src*='ellipse'i], .NewsComponentStyle-newsItemDate img[src=*'circle'i]`);
							for (const target of iconsImg) { // Iterate through found elements
								replaceNotificationImg(target); // Apply styles to each element
							}
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
})();