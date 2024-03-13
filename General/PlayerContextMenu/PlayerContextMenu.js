(function() {
	/**
	 * Sets the background-color on hover to the last element inside modal if its text has red color
	 * 
	 * @param {HTMLElement} modal - The modal element to clone
	*/
	function configureLastElementHover(modal) {
		const lastText = modal.querySelector('.ContextMenuStyle-menu > div:last-child > span');
		// Get color of the last element
		const lastTextColor = window.getComputedStyle(lastText).color;

		// If the color is red
		if (lastTextColor === 'rgb(255, 124, 124)') {
			// New style
			var style = document.createElement('style');
			// Style inner
			style.innerHTML = '.ContextMenuStyle-menu>div:last-child:hover{background-color:rgba(225,75,75,.1) !important;}';
			// Add this style
			modal.appendChild(style);
		}
	}

	/**
	 * Generates a unique identifier based on the current timestamp
	 * 
	 * @returns {string} - The generated unique identifier
	*/
	function createIDFromDate() {
		return Date.now().toString();
	}

	// Original modal clone
	let clonedModals = [];

	/**
	 * Clones the provided modal element and adds necessary attributes for cloning
	 * 
	 * @param {HTMLElement} modal - The modal element to clone
	*/
	function cloneModal(modal) {
		const clonedModal = modal.cloneNode(true);
		// Classlist of container contains 'cloned'
		clonedModal.classList.add('cloned');
		const contextMenu = clonedModal.querySelector('.ContextMenuStyle-menu');
		const realContextMenu = modal.querySelector('.ContextMenuStyle-menu');

		// Create unique ID for each modal
		const ModalID = createIDFromDate();

		if (contextMenu) {
			// Context menu container has value of data: 'data-clone = true'
			contextMenu.dataset.clone = 'true';
			// Adds an ID number to 'shadow' modal
			contextMenu.setAttribute('data-mid', ModalID);

			// Add the modal into the array
			clonedModals.push({ ModalID, clonedModal });
		}

		if (realContextMenu) {
			// Set modal ID to the existing modal
			realContextMenu.setAttribute('data-mid', ModalID);
		}
	}

	/**
	 * Applies the fadeOutDown animation class to the cloned modal element
	 * Removes the cloned modal element from the page after the animation ends
	*/
	function applyFadeOutAnimation(ModalID) {
		const modalRoot = document.getElementById('modal-root');
		const clonedModalObj = clonedModals.find(item => item.ModalID === ModalID);

		if (clonedModalObj) {
			modalRoot.appendChild(clonedModalObj.clonedModal);
		}

		const clone = modalRoot.querySelector('.modal.cloned');
		
		if (clone) {
			const contextMenu = clone.querySelector(`.ContextMenuStyle-menu[data-clone='true'][data-mid='${ModalID}']`);

			if (contextMenu) {
				// Add the fadeOutDown class after the previous animation has ended
				contextMenu.classList.add('fadeOutDown');

				// Add another event listener to remove the element after the fadeOutDown animation
				contextMenu.addEventListener('animationend', function() {
					// Remove the temporary element after the animation ends
					modalRoot.removeChild(clone);
					
					// Remove the object of modal from the array
					clonedModals = clonedModals.filter(item => item.ModalID !== ModalID);
				});
			}
		}
	}

	/**
	 * Create a new instance of MutationObserver with a callback function
	 * to observe changes in the DOM 
	*/
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') { // If the change is of type childList
				mutation.addedNodes.forEach(function (node) { // Iterate through added nodes
					if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
						// Check if the node is needed element
						if (node.classList && node.classList.contains('modal') && !node.classList.contains('cloned')) {
							// Clone it
							cloneModal(node);
							configureLastElementHover(node);
						}
					}
				});

				mutation.removedNodes.forEach(function(node) { // Iterate through removed nodes
					if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
						// Check if the node is needed element
						if (node.classList && node.classList.contains('ContextMenuStyle-menu') && !node.dataset.clone) {
							// Extract ModalID from the removed node and apply the fade out animation
							const ModalID = node.getAttribute('data-mid');
							if (ModalID) {
								applyFadeOutAnimation(ModalID);
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