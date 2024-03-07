(function() {
	function replaceOriginalSelector() {
		const originalSelectContainer = document.querySelector('.ChatComponentStyle-channels .ChatComponentStyle-channelsSelect');
		const originalSelect = originalSelectContainer.querySelector('select');

		const selectorContainer = document.createElement('div');
		selectorContainer.classList.add('selector-container');

		const selectorArrow = document.createElement('div');
		selectorArrow.classList.add('selector-arrow');

		const customDropdown = document.createElement('div');
		customDropdown.classList.add('custom-dropdown');

		selectorContainer.appendChild(customDropdown);
		selectorContainer.appendChild(selectorArrow);

		originalSelectContainer.parentNode.insertBefore(selectorContainer, originalSelectContainer.nextSibling);

		const selectedText = document.createElement('span');
		selectedText.classList.add('selected-text');
		selectedText.textContent = originalSelect.options[originalSelect.selectedIndex].textContent;
		customDropdown.appendChild(selectedText);

		const customList = document.createElement('div');

		originalSelect.querySelectorAll('option').forEach(option => {
			const listItem = document.createElement('span');
			listItem.textContent = option.textContent;
			listItem.dataset.value = option.value;
			customList.appendChild(listItem);
		
			listItem.addEventListener('click', (event) => {
				event.stopPropagation();
				originalSelect.value = option.value;
				customDropdown.querySelector('.selected-text').textContent = option.textContent;
				selectorContainer.classList.remove('show');

				originalSelect.dispatchEvent(new Event('change', { bubbles: true }));
			});
		});

		customDropdown.addEventListener('click', (event) => {
			event.stopPropagation();
			selectorContainer.classList.toggle('show');
		});

		customDropdown.appendChild(customList);

		document.addEventListener('mousedown', (event) => {
			if (!selectorContainer.contains(event.target) && !event.target.closest('.selector-container')) {
				selectorContainer.classList.remove('show');
			}
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