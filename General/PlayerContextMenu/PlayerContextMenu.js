(function() {
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

	// Create a new MutationObserver instance
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			// Check all added nodes
			mutation.addedNodes.forEach(function(addedNode) {
				// Check the event of adding needed element
				if (addedNode.classList && addedNode.classList.contains('modal') && !addedNode.classList.contains('cloned')) {
					// Clone it
					cloneModal(addedNode);
				}
			});

			// Check if nodes have been removed from #modal-root
			mutation.removedNodes.forEach(function(removedNode) {
				// Check if the needed element is deleted from the page
				if (removedNode.classList && removedNode.classList.contains('ContextMenuStyle-menu') && !removedNode.dataset.clone) {
					// Extract ModalID from the removed node and apply the fade out animation
					const ModalID = removedNode.getAttribute('data-mid');
					if (ModalID) {
						applyFadeOutAnimation(ModalID);
					}
				}
			});
		});
	});

	// Configuration for observing changes to the children of #modal-root
	const config = { childList: true, subtree: true };
	
	// Start observing mutations in the document body
	observer.observe(document.body, config);
})();