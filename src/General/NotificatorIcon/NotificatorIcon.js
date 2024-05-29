(function () {
	// Observers to observe original notificator icons' changes
	const styleObservers = new Map();

	/**
	 * Generation of a unique identifier consisting of two letters and two digits
	 * @returns {string} - Uniqie identifier
	*/
	function generateUniqueId() {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const digits = '0123456789';

		function getRandomElement(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		let id;
		do {
			id = getRandomElement(letters) + getRandomElement(letters) + getRandomElement(digits) + getRandomElement(digits);
		} while (styleObservers.has(id));

		return id;
	}

	/**
	 * Function to replace notification images with SVG elements
	 * 
	 * @param {HTMLElement} element - The element to be replaced
	*/
	function changeNotificationImg(element) {
		// Get computed styles of the element
		var initStyles = window.getComputedStyle(element);

		// Create a new SVG element
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('fill', 'none');
		svg.setAttribute('viewBox', '0 0 30 30');
		svg.setAttribute('class', 'severitium-notificator-icon');

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
			<circle cx="15" cy="15" r="8" fill="var(--severitium-main-color)"/>
			<circle cx="15" cy="15" r="11.5" stroke="var(--severitium-main-color)" stroke-opacity="0.25" stroke-width="7"/>
		`;

		// Hide the original element using accessibility styles
        element.style.setProperty('position', 'absolute');
        element.style.setProperty('height', '1px');
        element.style.setProperty('width', '1px');
        element.style.setProperty('overflow', 'hidden');
        element.style.setProperty('clip', 'rect(0 0 0 0)');

		// Add the SVG as a sibling element
		element.parentNode.appendChild(svg);

		// Create a unique ID for the observer
		const observerId = generateUniqueId();
		element.setAttribute('data-S-N-ID', observerId);

		// Observe changes to the original element's style attribute
		const styleObserver = new MutationObserver(() => {
			const updatedStyles = window.getComputedStyle(element);
			svg.style.setProperty('right', updatedStyles.getPropertyValue('right'));
			svg.style.setProperty('top', updatedStyles.getPropertyValue('top'));
			svg.style.setProperty('left', updatedStyles.getPropertyValue('left'));
			svg.style.setProperty('bottom', updatedStyles.getPropertyValue('bottom'));
			svg.style.setProperty('margin-right', updatedStyles.getPropertyValue('margin-right'));
			svg.style.setProperty('margin-left', updatedStyles.getPropertyValue('margin-left'));
			svg.style.setProperty('margin-top', updatedStyles.getPropertyValue('margin-top'));
			svg.style.setProperty('margin-bottom', updatedStyles.getPropertyValue('margin-bottom'));
		});

		styleObserver.observe(element, { attributes: true, attributeFilter: ['style'] });
		styleObservers.set(observerId, styleObserver);
	}

	/**
	 * Function to remove custom SVG when the related element is removed
	 * 
	 * @param {HTMLElement} element - The element to be replaced
	*/
	function removeNotificationSvg(element) {
		const svg = element.parentNode.querySelector('.severitium-notificator-icon');
		if (svg) {
			svg.remove();
			element.style.display = ''; // Reset display property of the original element

			const observerId = element.getAttribute('data-S-N-ID');
            if (observerId && styleObservers.has(observerId)) {
                styleObservers.get(observerId).disconnect(); // Disconnect the style observer
                styleObservers.delete(observerId);
            }
		}
	}

	/**
	 * Create a new instance of MutationObserver with a callback function
	 * to observe changes in the DOM 
	*/
	const observer = new MutationObserver(function (mutations) {
		const selector = `img[class*='notification'i][src*='ellipse'i], img[class*='new'i][src*='ellipse'i]:not([class*='nonew'i]), .NewsComponentStyle-newsItemDate img[src*='circle'i]`;

		mutations.forEach(function (mutation) {
			if (mutation.type === 'childList') { // If the change is of type childList
				mutation.addedNodes.forEach(function (node) { // Iterate through added nodes
					if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
						// Find an element with the selector in the added node
						const iconImg = node.querySelector(selector);
						if (iconImg) { // If found
							// Get all elements with the class 'img[class*='notification'i][src*='ellipse'i]'
							const iconsImg = document.querySelectorAll(selector);
							for (const target of iconsImg) { // Iterate through found elements
								changeNotificationImg(target); // Apply styles to each element
							}
						}
					}
				});

				mutation.removedNodes.forEach(function (node) { // Handle removed nodes
					if (node.nodeType === Node.ELEMENT_NODE) {
						const iconImg = node.querySelector(selector);
						if (iconImg) {
							removeNotificationSvg(iconImg);
						}
					}
				});
			} else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
				const target = mutation.target;
				if (target.matches(`img[class*='new'i][src*='ellipse'i]`)) {
					const classList = target.className.split(/\s+/);
					const hasNoNewClass = classList.some(className => /nonew/i.test(className));
					if (hasNoNewClass) {
						removeNotificationSvg(target);
					} else {
						changeNotificationImg(target);
					}
				}
			}
		});
	});

	// Configuration for the mutation observer
	const observerConfig = { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] };

	// Start observing mutations in the document body
	observer.observe(document.body, observerConfig);
})();