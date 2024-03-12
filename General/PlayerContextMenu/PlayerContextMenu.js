// Function to apply the fadeOutDown animation class to a temporary replacement element
function applyFadeOutAnimation() {
	const menuElement = document.querySelector('.ContextMenuStyle-menu');
	if (menuElement) {
		const tempElement = menuElement.cloneNode(true);
		tempElement.classList.add('fadeOutDown');

		// Replace the original element with the temporary element
		menuElement.parentNode.replaceChild(tempElement, menuElement);

		// Add an event listener to remove the temporary element after the animation ends
		tempElement.addEventListener('animationend', function() {
			// Remove the temporary element after the animation ends
			tempElement.parentNode.removeChild(tempElement);
		});
	}
}

// Create a new MutationObserver instance
const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		// Check if nodes have been removed from #modal-root
		if (mutation.removedNodes && mutation.removedNodes.length > 0) {
			mutation.removedNodes.forEach(function(removedNode) {
				// Check if the removed node is .ContextMenuStyle-menu
				if (removedNode.classList && removedNode.classList.contains('ContextMenuStyle-menu')) {
					// Apply the fadeOutDown animation to a temporary replacement element
					applyFadeOutAnimation();
				}
			});
		}
	});
});

// Configuration for observing changes to the children of #modal-root
const config = { childList: true, subtree: true };

// Start observing changes to the children of #modal-root
const modalRoot = document.getElementById('modal-root');
if (modalRoot) {
	observer.observe(modalRoot, config);
}