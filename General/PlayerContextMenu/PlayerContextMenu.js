(function() {
	document.addEventListener('DOMContentLoaded', function() {
		document.addEventListener('click', function(event) {
			const menu = event.target.closest('.ContextMenuStyle-menu');
			if (menu) {
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