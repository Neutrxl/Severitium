// ==UserScript==

// @name			Severitium
// @version			1.4.0+build.15
// @description		Custom theme for Tanki Online
// @author			OrakomoRi

// @icon			https://i.imgur.com/Srv1szX.png

// @match			https://*.tankionline.com/play/*

// @connect			raw.githubusercontent.com
// @connect			cdn.jsdelivr.net

// @updateURL		https://raw.githubusercontent.com/Neutrxl/Severitium/main/release/severitium.user.js
// @downloadURL		https://raw.githubusercontent.com/Neutrxl/Severitium/main/release/severitium.user.js

// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/_Additional/_getSeason.min.js

// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/LoadingScreen/LoadingScreen.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/NotificatorIcon/NotificatorIcon.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceForms/EntranceForms.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceIcons/EntranceIcons.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceLinks/EntranceLinks.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Battle/BattleTab/ColorfulResists/ColorfulResists.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/PlayButton/PlayButton.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/ChatWindow/ChatWindow.min.js
// @require			https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/PlayerContextMenu/PlayerContextMenu.min.js

// @run-at			document-start
// @grant			GM_xmlhttpRequest
// @grant			unsafeWindow
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_openInTab

// @require			https://cdn.jsdelivr.net/npm/sweetalert2@11
// @require			https://cdn.jsdelivr.net/gh/OrakomoRi/CompareVersions@main/JS/compareversions.min.js

// ==/UserScript==

(function() {
	'use strict';

	/**
	 * Configs
	 * 
	 * @param {Boolean} updateCheck - Checks for userscript updates
	 * 
	 * @param {Array} customModal - Enable custom modal
	 * Uses SweetAlert2 library (https://cdn.jsdelivr.net/npm/sweetalert2@11) for the modal
	 * @param {Boolean} customModal.enable - When set to false, the default modal will be used
	 * @param {*} customModal.timer - Can be set (number | false): used to set the time
	 * the custom modal should wait for response untill it closes
	 * 
	 * @param {Boolean} hasIgnoredUpdate - Used for the updater
	 * 
	 * @param {String} GITHUB_SCRIPT_URL - Link to the script to update
	*/
	
	const updateCheck = true;

	const customModal = {
		enable: true,
		timer: 5000,
	};

	const GITHUB_SCRIPT_URL = GM_info.script.updateURL;

	/**
	 * Function to check if the script is updated 
	*/
	function checkForUpdates() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: GITHUB_SCRIPT_URL,
			onload: function(response) {
				// Script from GitHub
				const data = response.responseText;

				// Try to extract version from the script on GitHub
				const match = data.match(/@version\s+([\w.-]+)/);
				if (!match) {
					console.log(`========\n${GM_info.script.name}\nUnable to extract version from the GitHub script.\n========`);
					return;
				}

				// Version on GitHub
				const githubVersion = match[1];
				// Current version
				const currentVersion = GM_info.script.version;

				// Compare versions
				const compareResult = compareVersions(githubVersion, currentVersion);

				console.log(`========\n${GM_info.script.name}\n`);
				
				switch (compareResult) {
					case 1:
						console.log(`A new version is available. Please update your script.\n`);
						console.log(`GitHub × Your: ${githubVersion} × ${currentVersion}`);
						promptUpdate(githubVersion);
						break;
					case 0:
						console.log(`You are using the latest version.`);
						break;
					case -1:
						console.log(`You are using a version newer than the one on GitHub.`);
						break;
					case -2:
						console.log(`Error comparing versions.`);
						break;
				}

				console.log(`Your: ${currentVersion} --- GitHub: ${githubVersion}`);
				console.log(`\n========`);
			},
			onerror: function(error) {
				console.error('Failed to check for updates:', error);
			}
		});
	}

	function promptUpdate(newVersion) {
		const skippedVersion = GM_getValue('skippedVersion', '');
		if (skippedVersion === newVersion) return;

		if (customModal.enable) {
			const style = document.createElement('style');
			style.textContent = '.swal2-container { z-index: 8888; } .swal2-container h1, .swal2-container h2, .swal2-container h3, .swal2-container h4, .swal2-container span, .swal2-container p { color: #000000; } ';
			document.head.appendChild(style);

			Swal.fire({
				position: 'top-end',
				backdrop: false,
				color: "#000000",
				background: "#ffffff",
				title: `${GM_info.script.name}: new version is available!`,
				text: `Do you want to update to version ${newVersion}?`,
				icon: 'info',
				showCancelButton: true,
				showDenyButton: true,
				confirmButtonText: 'Update',
				denyButtonText: 'Skip',
				cancelButtonText: 'Close',
				timer: customModal.timer ?? 5000,
				timerProgressBar: true,
				didOpen: (modal) => {
					modal.onmouseenter = Swal.stopTimer;
					modal.onmouseleave = Swal.resumeTimer;
				}
			}).then((result) => {
				if (result.isConfirmed) {
					GM_openInTab(GITHUB_SCRIPT_URL, { active: true });
				} else if (result.isDenied) {
					GM_setValue('skippedVersion', newVersion);
				}
			});
		} else {
			var result = window.confirm(`${GM_info.script.name}: A new version is available. Please update your script.`);

			if (result) {
				GM_openInTab(GITHUB_SCRIPT_URL, { active: true });
			}
		}
	}

	if (updateCheck) { checkForUpdates(); }



	const variables = 'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Variables/Variables.min.css';

	const linksCSS = [
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/Modal/Modal.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/Dropdown/Dropdown.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/LoadingScreen/LoadingScreen.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/NotificatorIcon/NotificatorIcon.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/TopPanel/TopPanel.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceBackground/EntranceBackground.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceForms/EntranceForms.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceIcons/EntranceIcons.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Entrance/EntranceLinks/EntranceLinks.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Battle/BattleChat/BattleChat.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Battle/BattleTab/TabContainer/TabContainer.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/FooterMenu/FooterMenu.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/MainMenu/MainMenu.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/PlayButton/PlayButton.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/NewsWindow/NewsWindow.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/ChatWindow/ChatWindow.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/Challenges/CommonChallenges/CommonChallenges.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/Challenges/EliteChallenges/EliteChallenges.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/Announcements/Announcements.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/BattleSelect/BattleType/BattleType.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/BattleSelect/BattleMode/BattleMode.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/TopMenu/TopMenu.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Friends/FriendsScreen/FriendsScreen.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Friends/InviteScreen/InviteScreen.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/CommonContainer/CommonContainer.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/PlayerContextMenu/PlayerContextMenu.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Clan/ClanModal/ClanModal.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Clan/ExistingClan/ExistingClan.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Clan/JoinClan/JoinClan.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/XP/XP.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Lobby/MatchmakingWaitBlock/MatchmakingWaitBlock.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/Battle/BattlePause/BattlePause.min.css',
		'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/General/ScrollingCards/ScrollingCards.min.css',
	];

	// Function to inject CSS
	function injectCSS(url, attributes = []) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(response) {
				// Create a <style> element
				var styleElement = document.createElement('style');
				// Set all the needed attributes
				for (const attribute of attributes) {
					styleElement.setAttribute(attribute.name, attribute.value);
				}
				// Set the CSS text to styles
				styleElement.textContent = response.responseText;
				// Apply styles to body end (to override initial styles)
				document.body.appendChild(styleElement);
			},
			onerror: function(error) {
				console.error('Failed to load CSS file:', error);
			}
		});
	}

	injectCSS(variables, [{ name: 'data-module', value: 'SeveritiumVariables' }])

	for (const link of linksCSS) {
		injectCSS(link);
	}



	// Link to raw TXT file
	const playButton = 'https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/_Base64/Lobby/png/PlayButton.txt';

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: playButton,
		onload: function(response) {
			const target = `.MainScreenComponentStyle-playButtonContainer{background-image:url(data:image/png;base64,${response.responseText})}`;

			var styleElement = document.createElement("style");
			styleElement.textContent = target;
			document.body.appendChild(styleElement);
		},
		onerror: function(error) {
			console.error('Failed to load TXT file:', error);
		}
	});



	const season = _getSeason();

	// Link to raw TXT file
	const entranceBackground = `https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/_Base64/Entrance/png/${season}.txt`;

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: entranceBackground,
		onload: function(response) {
			// Initial adding of the background to the first entrance screen
			const styledBackgrounds = `.Common-container.Common-entranceBackground{background-image:url(data:image/png;base64,${response.responseText})}.Common-background.SystemMessageStyle-container{background-image:url(data:image/png;base64,${response.responseText})}`;
			var styleElement = document.createElement("style");
			styleElement.textContent = styledBackgrounds;
			document.body.appendChild(styleElement);

			/**
			 * Function to set the custom background (image) as element
			*/
			function backgroundSetup() {
				// Set image as background with url
				const backgroundImageUrl = `data:image/png;base64,${response.responseText}`;
				const elements = document.querySelectorAll('.Common-entranceBackground, .Common-changingBackground');
				for (const element of elements) {
					// If element is one of changing backgrounds
					if (element.classList.contains('Common-changingBackground')) {
						// Get the parent node of the element
						const parent = element.parentNode;
						// Check if the parent already has div.custom-background
						const existingCustomBackground = parent.querySelector('div.severitium-custom-background');
						if (!existingCustomBackground) { // If not
							const div = document.createElement('div');
							div.classList.add('severitium-custom-background');
							div.style.backgroundImage = `url(${backgroundImageUrl})`;
							element.parentNode.replaceChild(div, element);
						} else { // If yes
							// There's only one background element needed for purposes
							parent.removeChild(element);
						}
					}
				}
			}

			/**
			 * Create a new instance of MutationObserver with a callback function
			 * to observe changes in the DOM 
			*/
			const observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.type === 'childList') { // If the change is of type childList
						mutation.addedNodes.forEach(function (node) { // Iterate through added nodes
							if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
								// Find an element with the needed selector in the added node
								const entranceBackground = node.querySelector(`.Common-changingBackground, .Common-entranceBackground`);
								if (entranceBackground) { // If found
									backgroundSetup();
								}
							}
						});
					}
				});
			});

			// Start observing mutations in the document body
			observer.observe(document.body, { childList: true, subtree: true });
		},
		onerror: function(error) {
			console.error('Failed to load TXT file:', error);
		}
	});



	// Link to raw TXT file
	const commonContainerBackground = `https://raw.githubusercontent.com/Neutrxl/Severitium/main/src/_Base64/General/png/CommonContainer.txt`;

	// Make an AJAX request to fetch the TXT file
	GM_xmlhttpRequest({
		method: 'GET',
		url: commonContainerBackground,
		onload: function(response) {
			// Initial adding of the background to the first entrance screen
			const styledBackgrounds = `.Common-container{background-image:url(data:image/png;base64,${response.responseText})}`;
			var styleElement = document.createElement("style");
			styleElement.textContent = styledBackgrounds;
			document.body.appendChild(styleElement);
		}
	});
})();