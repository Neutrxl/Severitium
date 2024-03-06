// UNUSED


(function() {
	/**
	 * Customizes the appearance of the battle tab based on its content
	*/

	function customizeBattleTab() {
		// Get the target element
		var target = document.querySelector('.BattleTabStatisticComponentStyle-container > div');
		// Define selectors for team and solo battle containers
		var teamsSelector = '.BattleTabStatisticComponentStyle-blueTeamTableContainer';
		var soloSelector = '.BattleTabStatisticComponentStyle-dmTableContainer';

		// Check if the target element contains team battle container
		if (target.querySelector(teamsSelector) !== null) {
			// Add class for customized team tab
			target.classList.add('TeamTab');
		}
		// Check if the target element contains solo battle container
		else if (target.querySelector(soloSelector) !== null) {
			// Add class for customized solo tab
			target.classList.add('SoloTab');
		}
	}

	/**
	 * Checks for the existence of the battle tab periodically and customizes it when found
	 * Uses requestAnimationFrame for efficient animation handling
	*/

	function checkForBattleTab() {
		// Get the battle tab element
		var battleTab = document.querySelector('.BattleTabStatisticComponentStyle-container');
		// If battle tab exists, customize it
		if (battleTab) {
			customizeBattleTab();
		}
		
		// If battle tab doesn't exist, continue checking recursively
		requestAnimationFrame(checkForBattleTab);
	}

	// Initial invocation to start checking for the battle tab
	checkForBattleTab();
})();