(function() {
	/**
	 * Function to classify button based on its background color.
	*/
	function classifyButton() {
		// Select the button element
		const button = document.querySelector(`.ClanInfoComponentStyle-clanActionDescription > div`);

		// Check if the button element exists
		if (button) {
			// Get the background color of the button
			const buttonBackground = window.getComputedStyle(button).backgroundColor;

			// Check the background color and add corresponding class
			if (buttonBackground === 'rgba(191, 213, 255, 0.25)') {
				button.classList.add('gray');
			} else if (buttonBackground === 'rgba(118, 255, 51, 0.25)') {
				button.classList.add('green');
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
						// Find an element with the selector in the added node
						const button = node.querySelector(`.ClanInfoComponentStyle-clanActionDescription > div`);
						if (button) { // If found
							classifyButton();
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