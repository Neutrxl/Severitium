(function() {
	document.addEventListener('DOMContentLoaded', function() {
		const menu = document.querySelector('.ContextMenuStyle-menu');
	
		menu.addEventListener('click', function(event) {
			event.stopPropagation();
		});
	
		menu.addEventListener('animationend', function(event) {
			if (event.animationName === 'fadeOutDown') {
				menu.remove();
			}
		});
	
		document.addEventListener('click', function(event) {
			if (!menu.contains(event.target)) {
				menu.classList.add('fadeOutDown');
			}
		});
	});
})();