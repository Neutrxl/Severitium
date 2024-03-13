(function() {
	// Original modal clone
	let clonedModal = null;

	/**
	 * Clones the provided modal element and adds necessary attributes for cloning
	 * 
	 * @param {HTMLElement} modal - The modal element to clone
	*/
	function cloneModal(modal) {
		clonedModal = modal.cloneNode(true);
		// Classlist of container contains 'cloned'
		clonedModal.classList.add('cloned');
		const contextMenu = clonedModal.querySelector('.ContextMenuStyle-menu');
		if (contextMenu) {
			// Context menu container has value of data: 'data-clone = true'
			contextMenu.dataset.clone = 'true';
		}
	}

	/**
	 * Restores the cloned modal element back to the page
	*/
	function restoreModal() {
		const modalRoot = document.getElementById('modal-root');
		if (clonedModal && modalRoot) {
			modalRoot.appendChild(clonedModal);
		}
	}

	/**
	 * Applies the fadeOutDown animation class to the cloned modal element
	 * Removes the cloned modal element from the page after the animation ends
	*/
	function applyFadeOutAnimation() {
		const modalRoot = document.getElementById('modal-root');
		const clone = modalRoot.querySelector('.modal.cloned');
		const contextMenu = clone.querySelector(`.ContextMenuStyle-menu[data-clone='true']`);

		// Add the fadeOutDown class after the previous animation has ended
		contextMenu.classList.add('fadeOutDown');

		// Add another event listener to remove the element after the fadeOutDown animation
		contextMenu.addEventListener('animationend', function() {
			// Remove the temporary element after the animation ends
			modalRoot.removeChild(clone);
			clonedModal = null;
		});
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
					restoreModal();
					applyFadeOutAnimation();
				}
			});
		});
	});

	// Configuration for observing changes to the children of #modal-root
	const config = { childList: true, subtree: true };
	
	// Start observing mutations in the document body
	observer.observe(document.body, config);
})();