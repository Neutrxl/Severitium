(function() {
	document.addEventListener('DOMContentLoaded', function() {
		document.addEventListener('click', function(event) {
			const menu = event.target.closest('.ContextMenuStyle-menu');
			const modalroot = event.target.closest('#modal-root');
			if (modalroot && menu) {
				event.stopPropagation();
				if (!menu.contains(event.target)) {
					menu.classList.add('fadeOutDown');
				}
			}
		});

		document.addEventListener('animationend', function(event) {
			const menu = event.target.closest('.ContextMenuStyle-menu');
			if (menu && event.animationName === 'fadeOutDown') {
				menu.remove();
			}
		});
	});
})();