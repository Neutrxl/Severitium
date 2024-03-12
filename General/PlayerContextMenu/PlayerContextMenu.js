// Function to apply the fadeOutDown animation class
function applyFadeOutAnimation() {
    const menuElement = document.querySelector('.ContextMenuStyle-menu');
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
        // Check if nodes have been removed from the DOM
        if (mutation.removedNodes && mutation.removedNodes.length > 0) {
            for (let i = 0; i < mutation.removedNodes.length; i++) {
                const removedNode = mutation.removedNodes[i];
                // Check if the removed node is the content of #modal-root
                if (removedNode.id === 'modal-root') {
                    // Apply the fadeOutDown animation to .ContextMenuStyle-menu before removal
                    applyFadeOutAnimation();
                    break;
                }
            }
        }
    });
});

// Configuration for observing child node removals
const config = { childList: true, subtree: true };

// Start observing changes to the DOM
observer.observe(document.body, config);