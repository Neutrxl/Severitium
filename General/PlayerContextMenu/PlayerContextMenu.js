// Function to apply the fadeOutDown animation class
function applyFadeOutAnimation(menuElement) {
	if (menuElement) {
		menuElement.classList.add('fadeOutDown');
		// Add an event listener to remove the element after the animation ends
		menuElement.addEventListener('animationend', function() {
			// Remove the element after the animation ends
			menuElement.parentNode.removeChild(menuElement);
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
					// Apply the fadeOutDown animation to .ContextMenuStyle-menu before removal
					applyFadeOutAnimation(removedNode);
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