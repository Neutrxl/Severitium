(function() {
	/**
	 * Replaces the original select element with a custom dropdown menu.
	 * Adds event listeners to handle selection changes and dropdown display.
	*/
	function replaceOriginalSelector() {
		// Find the original select container and select element
		const originalSelectContainer = document.querySelector('.ChatComponentStyle-channels .ChatComponentStyle-channelsSelect');
		const originalSelect = originalSelectContainer.querySelector('select');

		// Create elements for the custom dropdown menu
		const selectorContainer = document.createElement('div');
		selectorContainer.classList.add('selector-container');

		const selectorArrow = document.createElement('div');
		selectorArrow.classList.add('selector-arrow');

		const customDropdown = document.createElement('div');
		customDropdown.classList.add('custom-dropdown');

		// Append elements to the selector container
		selectorContainer.appendChild(customDropdown);
		selectorContainer.appendChild(selectorArrow);

		// Insert the selector container after the original select container
		originalSelectContainer.parentNode.insertBefore(selectorContainer, originalSelectContainer.nextSibling);

		// Create and display the currently selected option
		const selectedText = document.createElement('span');
		selectedText.classList.add('selected-text');
		selectedText.textContent = originalSelect.options[originalSelect.selectedIndex].textContent;
		customDropdown.appendChild(selectedText);

		// Create and populate the custom dropdown list
		const customList = document.createElement('div');

		originalSelect.querySelectorAll('option').forEach(option => {
			const listItem = document.createElement('span');
			listItem.textContent = option.textContent;
			listItem.dataset.value = option.value;
			customList.appendChild(listItem);

			// Add event listener for option selection
			listItem.addEventListener('click', (event) => {
				event.stopPropagation();
				originalSelect.value = option.value;
				customDropdown.querySelector('.selected-text').textContent = option.textContent;
				selectorContainer.classList.remove('show');

				// Trigger change event on original select
				originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
			});
		});

		customDropdown.appendChild(customList);

		// Add event listener to toggle dropdown display
		customDropdown.addEventListener('click', (event) => {
			event.stopPropagation();
			selectorContainer.classList.toggle('show');
		});

		// Close dropdown when clicking outside of it
		document.addEventListener('mousedown', (event) => {
			if (!selectorContainer.contains(event.target) && !event.target.closest('.selector-container')) {
				selectorContainer.classList.remove('show');
			}
		});

		// Add event listener to set original select value based on selected text
		customDropdown.addEventListener('click', (event) => {
			const selectedOptionText = customDropdown.querySelector('.selected-text').textContent;
			originalSelect.querySelectorAll('option').forEach(option => {
				if (option.textContent === selectedOptionText) {
					originalSelect.value = option.value;
					originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
				}
			});
		});
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
						const select = node.querySelector('.ChatComponentStyle-channels .ChatComponentStyle-channelsSelect');
						if (select) { // If found
							replaceOriginalSelector();
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