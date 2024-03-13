(function () {
	// Array for turret icon URLs and initial colors
	const turretColorMap = [
		{
			url: 'railgun_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.9091 10.9548L12.4783 9.73937L10.7234 11.7449L9 6.00024L22.5528 12.7766C23.2177 13.1091 24 12.6256 24 11.8822V2.00024C23.9664 0.889975 23.0548 0.000244141 21.9364 0.000244141C21.3413 0.000244141 20.7752 0.257123 20.3834 0.704956L15.2174 6.60894L8.05481 3.02765C7.27327 2.63688 6.40168 3.36596 6.64824 4.20424L9.33333 13.3336L5.28431 17.961L1.17889 17.2146C0.565046 17.103 0 17.5746 0 18.1985V24.0002L5.30233 19.3607L11.8677 20.6738C12.6075 20.8218 13.2385 20.1285 13.0217 19.4059L11.8163 15.388L10.2771 16.5424L11 19.0002L6.62366 18.2045L14.9091 10.9548ZM4.24468 19.1492L0 24.0002L1 18.5002L4.24468 19.1492ZM18.1818 8.09115L22 10.0002V4.75024L18.1818 8.09115Z" fill="white"/></svg>',
			color: 'rgb(255, 163, 0)'
		},
		{
			url: 'thunder_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7.50024L0 9.00024L12 3.00024L3 0.000244141H18C21.3137 0.000244141 24 2.68654 24 6.00024V21.0002L21 12.0002L15 24.0002L16.5 12.0002L0 24.0002L12 7.50024Z" fill="white"/></svg>',
			color: 'rgb(255, 133, 0)'
		},
		{
			url: 'rocket_launcher_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0H23.4853C21.894 0 20.3679 0.632141 19.2426 1.75736L13.5 7.5H8.74264C7.94699 7.5 7.18393 7.81607 6.62132 8.37868L4.5 10.5L10.5 16.5L22.2426 4.75736C23.3679 3.63214 24 2.10602 24 0.514719V0Z" fill="white"/><path d="M13.5 19.5L12 18L16.5 13.5V15.2574C16.5 16.053 16.1839 16.8161 15.6213 17.3787L13.5 19.5Z" fill="white"/><path d="M6 21L0 24L3 18L0 15L7.5 16.5L9 24L6 21Z" fill="white"/></svg>',
			color: 'rgb(161, 151, 253)'
		},
		{
			url: 'ricochet_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 15.9976L5 10.9983L7.41267 21.6609C8.00091 24.2605 11.4346 24.8591 12.8681 22.6119L23.2802 6.28891C23.3452 6.19594 23.4064 6.10008 23.4635 6.00156L23.4651 5.99904C23.8054 5.41081 24 4.72783 24 3.99944C24 1.79061 22.2091 0 20 0C18.3309 0 16.9005 1.02221 16.301 2.47467L10 14.9978L8.25263 8.00928C7.80952 6.23709 5.41757 5.93784 4.5514 7.54622L0 15.9976Z" fill="white"/></svg>',
			color: 'rgb(255, 227, 120)'
		},
		{
			url: 'scorpio_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.225 20.2585L0 24.0002L10.5 18.0002L8.26255 12.4066C7.80286 11.2573 8.09616 9.94377 9.00103 9.09923L17.6649 1.01295C18.3622 0.362139 19.2849 0.000183105 20.2388 0.000183105C22.3098 0.000183105 24 1.67912 24 3.75018C24 5.1351 23.2367 6.40728 22.0147 7.05901L12.75 12.0002L13.2614 17.114C13.4009 18.5093 12.5553 19.8151 11.225 20.2585Z" fill="white"/><path d="M9.08275 4.10374L3.75 9.75019L6.79541 15.2319C7.18829 15.9391 6.94961 16.8304 6.25592 17.2466L0 21.0002L4.5 16.5002L1.06623 11.3495C0.416386 10.3748 0.393413 9.11089 1.00741 8.11314L5.29814 1.14071C5.73431 0.431936 6.50695 0.000183105 7.33918 0.000183105C8.33817 0.000183105 9.23701 0.632223 9.58778 1.56761C9.91397 2.43743 9.7206 3.42837 9.08275 4.10374Z" fill="white"/><path d="M18.75 17.2502L22.9043 15.4698C23.569 15.1849 24 14.5229 24 13.7997C24 12.8128 23.2 12.0002 22.213 12.0002C21.9094 12.0002 21.6107 12.0776 21.3452 12.2251L17.3673 14.435C16.0225 15.1821 15.4608 16.8253 16.0667 18.2393L17.25 21.0002L9 24.0002L18.529 22.7297C19.4361 22.6087 20.0244 21.7107 19.773 20.8307L18.75 17.2502Z" fill="white"/></svg>',
			color: 'rgb(255, 61, 61)'
		},
		{
			url: 'smoky_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5L13.7574 4.24264C16.4739 1.52612 20.1583 0 24 0C24 3.84174 22.4739 7.52612 19.7574 10.2426L19.5 10.5L13.5 4.5Z" fill="white"/><path d="M0 16.5L7.5 24L8.08394 23.4161C8.34073 23.1593 8.43812 22.7834 8.33835 22.4342L7.83333 20.6667L9 19.5L10.1464 20.6464C10.3417 20.8417 10.6583 20.8417 10.8536 20.6464L16.9393 14.5607C17.6185 13.8815 18 12.9604 18 12L12 6C11.0396 6 10.1185 6.38153 9.43934 7.06066L3.35355 13.1464C3.15829 13.3417 3.15829 13.6583 3.35355 13.8536L4.5 15L3.33333 16.1667L1.56576 15.6616C1.21657 15.5619 0.840734 15.6593 0.583936 15.9161L0 16.5Z" fill="white"/></svg>',
			color: 'rgb(255, 240, 0)'
		},
		{
			url: 'firebird_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5.99969L10.5 -0.000305176H9C6.51472 -0.000305176 4.5 2.01441 4.5 4.49969V5.99969Z" fill="white"/><path d="M4.50001 8.99994L7.50001 11.9999C7.50001 9.11864 8.6446 6.35535 10.682 4.31796L15 -6.10352e-05V4.49994L20.6628 10.1627C21.8577 11.3576 22.6493 12.896 22.9272 14.5628C23.5535 18.3211 21.4785 22.0085 17.9409 23.4236L16.5 23.9999V21.4705C16.5 18.2879 15.2357 15.2357 12.9853 12.9852L12 11.9999V16.4999L10.1718 17.7187C8.50261 18.8315 7.50001 20.7049 7.50001 22.711V23.9999L6.05915 23.4236C2.52152 22.0085 0.446472 18.3211 1.07286 14.5628C1.35066 12.896 2.14235 11.3576 3.33725 10.1627L4.50001 8.99994Z" fill="white"/></svg>',
			color: 'rgb(255, 51, 0)'
		},
		{
			url: 'freeze_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.744 0.84381L12.0002 3.75013L10.2564 0.84381C9.97555 0.375659 9.3711 0.21932 8.89845 0.492571L8.222 0.883644C7.74152 1.16142 7.57915 1.77733 7.86026 2.25587L10.5003 6.75018V9.40208L8.20366 8.07612L5.63152 3.54268C5.35764 3.05997 4.74306 2.89262 4.26226 3.16984L3.58536 3.56013C3.11239 3.83283 2.94556 4.43447 3.21054 4.91181L4.85559 7.87514L1.46681 7.93215C0.920935 7.94133 0.483314 8.38664 0.483632 8.93259L0.484085 9.71395C0.484408 10.2689 0.936622 10.7175 1.4916 10.7133L6.7036 10.6742L9.00027 12.0001L6.7034 13.3262L1.49137 13.2871C0.93639 13.2829 0.484175 13.7315 0.483853 14.2865L0.483399 15.0678C0.483081 15.6138 0.920702 16.0591 1.46658 16.0683L4.85536 16.1253L3.21031 19.0886C2.94533 19.5659 3.11216 20.1676 3.58513 20.4403L4.26203 20.8306C4.74283 21.1078 5.35741 20.9404 5.63129 20.4577L8.20342 15.9243L10.5003 14.5982V17.2504L7.86026 21.7447C7.57915 22.2232 7.74152 22.8391 8.222 23.1169L8.89845 23.508C9.3711 23.7812 9.97555 23.6249 10.2564 23.1567L12.0002 20.2504L13.744 23.1567C14.0249 23.6249 14.6294 23.7812 15.102 23.508L15.7785 23.1169C16.259 22.8391 16.4213 22.2232 16.1402 21.7447L13.5003 17.2506V14.5982L15.7974 15.9245L18.3694 20.4577C18.6433 20.9404 19.2579 21.1078 19.7387 20.8306L20.4156 20.4403C20.8886 20.1676 21.0554 19.5659 20.7904 19.0886L19.1454 16.1253L22.5342 16.0682C23.08 16.0591 23.5176 15.6138 23.5173 15.0678L23.5169 14.2864C23.5166 13.7315 23.0643 13.2829 22.5094 13.2871L17.2971 13.3262L15.0003 12.0001L17.2969 10.6742L22.5091 10.7134C23.0641 10.7175 23.5163 10.269 23.5166 9.71396L23.5171 8.9326C23.5174 8.38665 23.0798 7.94135 22.5339 7.93216L19.1451 7.87515L20.7902 4.91182C21.0552 4.43448 20.8883 3.83284 20.4154 3.56014L19.7385 3.16985C19.2577 2.89263 18.6431 3.05998 18.3692 3.54269L15.7972 8.07596L13.5003 9.40206V6.75001L16.1402 2.25587C16.4213 1.77733 16.259 1.16142 15.7785 0.883644L15.102 0.492571C14.6294 0.21932 14.0249 0.375659 13.744 0.84381Z" fill="white"/></svg>',
			color: 'rgb(0, 151, 255)'
		},
		{
			url: 'twins_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5021 8.01802L21.0656 13.5002L19.5656 6.00024L18.0656 18.0002L13.1916 8.25223C11.296 4.46097 14.0528 0.000244141 18.2916 0.000244141C22.4179 0.000244141 25.178 4.24737 23.5021 8.01802Z" fill="white"/><path d="M11.5021 14.018L9.06559 19.5002L7.56559 12.0002L6.06559 24.0002L1.19158 14.2522C-0.704044 10.461 2.05284 6.00024 6.29159 6.00024C10.4179 6.00024 13.178 10.2474 11.5021 14.018Z" fill="white"/></svg>',
			color: 'rgb(0, 255, 0)'
		},
		{
			url: 'hammer_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24L21.2784 10.701C22.9715 9.64283 24 7.78712 24 5.79058C24 2.59253 21.4075 0 18.2094 0H18.0815C16.1502 0 14.3404 0.942292 13.2329 2.52446L4.5 15L18 6L0 24Z" fill="white"/><path d="M2.67035 4.31859L0 15L5.83536 5.66342C6.56002 4.50396 5.72646 3 4.35917 3C3.56038 3 2.86409 3.54365 2.67035 4.31859Z" fill="white"/><path d="M6 24L20.4776 16.7612C22.0959 15.952 24 17.1288 24 18.9382C24 20.128 23.1398 21.1434 21.9662 21.339L6 24Z" fill="white"/></svg>',
			color: 'rgb(200, 200, 200)'
		},
		{
			url: 'tesla_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9999 12L20.9999 12.0002L6.61214 21.5919C8.2045 22.4882 10.0425 22.9995 12 22.9995C18.0751 22.9995 23 18.0746 23 11.9995C23 8.664 21.5154 5.67524 19.171 3.65795L14.9999 12Z" fill="white"/><path d="M17.3886 2.40755L2.99993 12L8.99993 12L4.82929 20.3413C2.48469 18.324 1 15.3351 1 11.9995C1 5.92438 5.92487 0.999512 12 0.999512C13.9578 0.999512 15.7961 1.51096 17.3886 2.40755Z" fill="white"/></svg>',
			color: 'rgb(0, 215, 255)'
		},
		{
			url: 'isis_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 0C7.94772 0 7.5 0.447716 7.5 1V7.5L1 7.5C0.447715 7.5 0 7.94771 0 8.5V15.5C0 16.0523 0.447715 16.5 1 16.5H7.5V23C7.5 23.5523 7.94772 24 8.5 24H9L12 13L8.5 13.5L12 0H8.5Z" fill="white"/><path d="M15.5 24C16.0523 24 16.5 23.5523 16.5 23V16.5H23C23.5523 16.5 24 16.0523 24 15.5V8.5C24 7.94771 23.5523 7.5 23 7.5L16.5 7.5V1C16.5 0.447715 16.0523 0 15.5 0H15L12 11L15.5 10.5L12 24H15.5Z" fill="white"/></svg>',
			color: 'rgb(0, 187, 67)'
		},
		{
			url: 'gauss_resistance',
			icon: '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.6994 22.102C24.5334 20.268 24.4119 16.9136 22.7224 13.3196L21.7014 13.5748C22.8496 16.0851 22.9806 18.2905 21.8187 19.4524C19.9902 21.2809 15.577 19.9074 11.4589 16.406L22.4 8.20018C23.4072 7.44477 24 6.25921 24 5.00018C24 2.79104 22.2091 1.00018 20 1.00018C18.741 1.00018 17.5554 1.59296 16.8 2.60018L15.3621 4.51732C10.5318 0.89626 5.35464 -0.151242 2.90044 2.30296C-0.0282748 5.23168 2.02969 12.038 7.49703 17.5054C12.9644 22.9727 19.7707 25.0307 22.6994 22.102ZM14.7631 5.31612C11 2.50647 7.21405 1.53012 5.55526 3.18891C3.72796 5.01621 5.0984 9.42479 8.59468 13.5406L14.7631 5.31612Z" fill="white"/><path d="M0 25.0002L6 20.5002V17.0002L0 25.0002Z" fill="white"/></svg>',
			color: 'rgb(1, 255, 162)'
		},
		{
			url: 'shaft_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 0.0928406C13.0086 0.031565 12.508 0 12 0C6.40848 0 1.71018 3.82432 0.378052 9H2.80494C3.22876 9 3.60156 8.73038 3.77393 8.3432C4.98029 5.63353 7.48619 3.63006 10.5 3.12444V7.67157C10.5 8.20201 10.7107 8.71071 11.0858 9.08579L12 10L12.9142 9.08579C13.2893 8.71071 13.5 8.20201 13.5 7.67157V0.0928406Z" fill="white"/><path d="M15.6568 3.77393C18.3665 4.98029 20.3699 7.48619 20.8756 10.5H16.3284C15.798 10.5 15.2893 10.7107 14.9142 11.0858L14 12L14.9142 12.9142C15.2893 13.2893 15.798 13.5 16.3284 13.5H23.9072C23.9684 13.0086 24 12.508 24 12C24 6.40848 20.1757 1.71018 15 0.378052V2.80494C15 3.22876 15.2696 3.60156 15.6568 3.77393Z" fill="white"/><path d="M20.2261 15.6568C20.3984 15.2696 20.7712 15 21.1951 15H23.6219C22.2898 20.1757 17.5915 24 12 24C11.492 24 10.9914 23.9684 10.5 23.9072V16.3284C10.5 15.798 10.7107 15.2893 11.0858 14.9142L12 14L12.9142 14.9142C13.2893 15.2893 13.5 15.798 13.5 16.3284V20.8756C16.5138 20.3699 19.0197 18.3665 20.2261 15.6568Z" fill="white"/><path d="M0.0928406 10.5H7.67157C8.20201 10.5 8.71071 10.7107 9.08579 11.0858L10 12L9.08579 12.9142C8.71071 13.2893 8.20201 13.5 7.67157 13.5H3.12444C3.63006 16.5138 5.63353 19.0197 8.3432 20.2261C8.73038 20.3984 9 20.7712 9 21.1951V23.6219C3.82432 22.2898 0 17.5915 0 12C0 11.492 0.031565 10.9914 0.0928406 10.5Z" fill="white"/></svg>',
			color: 'rgb(255, 59, 58)'
		},
		{
			url: 'artillery_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6L6 16.5L0 19.5H24L18 16.5L24 6L16.5 9V0L12 6L7.5 0V9L0 6Z" fill="white"/><path d="M3 24C8.37265 20.1198 15.6273 20.1198 21 24H3Z" fill="white"/></svg>',
			color: 'rgb(255, 90, 0)'
		},
		{
			url: 'vulcan_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.25 0.876694C13.2389 -0.284419 10.7611 -0.284419 8.75003 0.876694L3.9917 3.62392C1.98059 4.78503 0.741699 6.93086 0.741699 9.25308V14.7475C0.741699 17.0698 1.98059 19.2156 3.9917 20.3767L8.75003 23.1239C10.7611 24.285 13.2389 24.285 15.25 23.1239L20.0084 20.3767C22.0195 19.2156 23.2584 17.0698 23.2584 14.7475V9.25308C23.2584 6.93086 22.0195 4.78503 20.0084 3.62392L15.25 0.876694ZM15 4.50031C15 6.15717 13.6568 7.50031 12 7.50031C10.3433 7.50031 9.00003 6.15717 9.00003 4.50031C9.00003 2.84345 10.3433 1.50031 12 1.50031C13.6568 1.50031 15 2.84345 15 4.50031ZM15 19.5003C15 21.1572 13.6568 22.5003 12 22.5003C10.3433 22.5003 9.00003 21.1572 9.00003 19.5003C9.00003 17.8434 10.3433 16.5003 12 16.5003C13.6568 16.5003 15 17.8434 15 19.5003ZM15.8971 9.75036C16.7256 11.1852 18.5603 11.6769 19.9952 10.8484C21.4301 10.02 21.9217 8.18524 21.0933 6.75036C20.2649 5.31548 18.4301 4.82386 16.9952 5.65228C15.5603 6.48071 15.0687 8.31548 15.8971 9.75036ZM2.90676 17.2504C3.73519 18.6852 5.56996 19.1769 7.00483 18.3484C8.43971 17.52 8.93134 15.6852 8.10291 14.2504C7.27448 12.8155 5.43971 12.3239 4.00483 13.1523C2.56996 13.9807 2.07833 15.8155 2.90676 17.2504ZM7.00484 5.65218C8.43972 6.4806 8.93135 8.31537 8.10292 9.75025C7.27449 11.1851 5.43972 11.6768 4.00484 10.8483C2.56997 10.0199 2.07834 8.18513 2.90677 6.75025C3.73519 5.31537 5.56997 4.82375 7.00484 5.65218ZM19.9952 13.1522C21.4301 13.9806 21.9217 15.8154 21.0933 17.2503C20.2649 18.6851 18.4301 19.1768 16.9952 18.3483C15.5603 17.5199 15.0687 15.6851 15.8971 14.2503C16.7256 12.8154 18.5603 12.3237 19.9952 13.1522Z" fill="white"/></svg>',
			color: 'rgb(159, 159, 159)'
		},
		{
			url: 'crit_resistance',
			icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 1L8 0L9.75 1H12L13.0908 2.90918L15 4V6.25L16 8L15 9.75V12L13.0908 13.0908L12 15H9.75L8 16L6.25 15H4L2.90918 13.0908L1 12V9.75L0 8L1 6.25V4L2.90918 2.90918L4 1H6.25ZM7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5ZM12 10.5C12 11.3284 11.3284 12 10.5 12C9.67157 12 9 11.3284 9 10.5C9 9.67157 9.67157 9 10.5 9C11.3284 9 12 9.67157 12 10.5ZM11.5303 4.46967C11.8232 4.76256 11.8232 5.23744 11.5303 5.53033L5.53033 11.5303C5.23744 11.8232 4.76256 11.8232 4.46967 11.5303C4.17678 11.2374 4.17678 10.7626 4.46967 10.4697L10.4697 4.46967C10.7626 4.17678 11.2374 4.17678 11.5303 4.46967Z" fill="white"/></svg>',
			color: 'rgb(223, 34, 43)'
		},
		{
			url: 'mine_resistance',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 17.2502C14.8995 17.2502 17.25 14.8997 17.25 12.0002C17.25 9.10069 14.8995 6.75018 12 6.75018C9.1005 6.75018 6.75 9.10069 6.75 12.0002C6.75 14.8997 9.1005 17.2502 12 17.2502Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.41421 0.585969C6.78929 0.210896 7.29799 0.000183105 7.82843 0.000183105H16.1716C16.702 0.000183105 17.2107 0.210897 17.5858 0.58597L23.4142 6.4144C23.7893 6.78947 24 7.29818 24 7.82861V16.1718C24 16.7022 23.7893 17.2109 23.4142 17.586L17.5858 23.4144C17.2107 23.7895 16.702 24.0002 16.1716 24.0002H7.82843C7.29799 24.0002 6.78929 23.7895 6.41421 23.4144L0.585786 17.586C0.210713 17.2109 0 16.7022 0 16.1718V7.82861C0 7.29818 0.210714 6.78947 0.585786 6.4144L6.41421 0.585969ZM3 15.7575V8.24282L8.24264 3.00018H15.7574L21 8.24282V15.7575L15.7574 21.0002H8.24264L3 15.7575Z" fill="white"/></g><defs><clipPath><rect width="24" height="24" fill="white"/></clipPath></defs></svg>',
			color: 'rgb(0, 179, 113)'
		},
	];

	const immunityColorMap = [
		{
			url: 'parkour',
			icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.25 17.625C14.25 18.2463 13.7463 18.75 13.125 18.75H10.875C10.2537 18.75 9.75 18.2463 9.75 17.625C9.75 17.0037 10.2537 16.5 10.875 16.5H13.125C13.7463 16.5 14.25 17.0037 14.25 17.625Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12H21ZM6.75 6.00073C7.04263 6.00073 7.32222 6.0566 7.57867 6.15825C7.08729 6.40458 6.75 6.9129 6.75 7.5C6.75 8.32843 7.42157 9 8.25 9H9.71655C9.72764 9.00049 9.73879 9.00073 9.75 9.00073C10.1642 9.00073 10.5 8.66495 10.5 8.25073C10.5 6.17966 8.82107 4.50073 6.75 4.50073C4.67893 4.50073 3 6.17966 3 8.25073C3 8.66495 3.33579 9.00073 3.75 9.00073C4.16421 9.00073 4.5 8.66495 4.5 8.25073C4.5 7.00809 5.50736 6.00073 6.75 6.00073ZM18.0787 6.15825C17.8222 6.0566 17.5426 6.00073 17.25 6.00073C16.0074 6.00073 15 7.00809 15 8.25073C15 8.66495 14.6642 9.00073 14.25 9.00073C13.8358 9.00073 13.5 8.66495 13.5 8.25073C13.5 6.17966 15.1789 4.50073 17.25 4.50073C19.3211 4.50073 21 6.17966 21 8.25073C21 8.66495 20.6642 9.00073 20.25 9.00073C20.2388 9.00073 20.2276 9.00049 20.2166 9H18.75C17.9216 9 17.25 8.32843 17.25 7.5C17.25 6.9129 17.5873 6.40458 18.0787 6.15825Z" fill="white"/></g></svg>',
			color: 'rgb(243, 207, 72)'
		},
	]

	// Store ID to stop the repeating on each frame when tab is closed
	let reqID = null;

	/**
	 * Function to track elements of tab 
	*/
	function trackElements() {
		// Delete previous repeating if exists
		if (requestId) {
			cancelAnimationFrame(reqID);
			reqID = null;
		}

		// Turret elements
		const turrets = document.querySelectorAll('.BattleTabStatisticComponentStyle-deviceCell div');
		// Module elements
		const modules = document.querySelectorAll('.BattleTabStatisticComponentStyle-container div');
		// Hull + immunity elements
		const immunities = document.querySelectorAll('.BattleTabStatisticComponentStyle-defenceCell div');

		for (const turret of turrets) { // For each turret icon
			if (isElementVisible(turret)) { // If it is on the page
				processTurret(turret); // Change CSS
			}
		}

		for (const module of modules) { // For each module icon
			if (isElementVisible(module)) { // If it is on the page
				processModule(module); // Change CSS
			}
		}

		for (const immunity of immunities) { // For each module icon
			if (isElementVisible(immunity)) { // If it is on the page
				processImmunity(immunity); // Change CSS
			}
		}

		// Repeat each frame
		reqID = requestAnimationFrame(trackElements);
	}

	/**
	 * Function to check if the element is placed on the page
	 * 
	 * @param {Element} element
	 * @returns {Boolean} if the element is on the page
	*/
	function isElementVisible(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	/**
	 * Function to change module CSS
	 * 
	 * @param {Element} element 
	*/
	function processModule(element) {
		const computedStyle = getComputedStyle(element);
		const maskImage = computedStyle.maskImage; // Turrets have mask-image

		for (item of turretColorMap) {
			if (maskImage.includes(item.url)) {
				element.style.maskImage = `url('data:image/svg+xml,${item.icon}')`; // Set mask-image
				element.style.maskPosition = 'center center'; // Set mask-position
				element.style.maskRepeat = 'no-repeat'; // Set mask-repeat
				element.style.maskSize = 'contain'; // Set mask-size
				const currentBackgroundColor = computedStyle.backgroundColor;
				if (currentBackgroundColor !== 'rgb(254, 102, 102)') {
					element.style.backgroundColor = item.color;
				} else {
					element.style.backgroundColor = 'var(--severitium-main-color)';

					// Find adjacent text nodes
					const adjacentText = element.nextElementSibling;
					if (adjacentText && (adjacentText.tagName === 'H3' || adjacentText.tagName === 'SPAN')) {
						// Change text color
						adjacentText.style.color = 'var(--severitium-main-color)';
					}
				}
			}
		}
	}

	/**
	 * Function to change turret CSS
	 * 
	 * @param {Element} element 
	*/
	function processTurret(element) {
		const computedStyle = getComputedStyle(element);
		const backgroundImage = computedStyle.backgroundImage; // Turrets have bacground-image

		for (item of turretColorMap) {
			if (backgroundImage.includes(item.url)) {
				element.style.backgroundImage = 'none'; // Delete background-image
				element.style.backgroundColor = item.color; // Set color
				element.style.maskImage = `url('data:image/svg+xml,${item.icon}')`; // Set mask-image
				element.style.maskPosition = 'center center'; // Set mask-position
				element.style.maskRepeat = 'no-repeat'; // Set mask-repeat
				element.style.maskSize = 'contain'; // Set mask-size
			}
		}
	}

	/**
	 * Function to change immunity CSS
	 * 
	 * @param {Element} element 
	*/
	function processImmunity(element) {
		const computedStyle = getComputedStyle(element);
		const maskImage = computedStyle.backgroundImage; // Immunities have background-image

		for (item of immunityColorMap) {
			if (maskImage.includes(item.url)) {
				element.style.backgroundImage = 'none'; // Delete background-image
				element.style.backgroundColor = item.color; // Set item color
				element.style.maskImage = `url('data:image/svg+xml,${item.icon}')`; // Set mask-image
				element.style.maskPosition = 'center center'; // Set mask-position
				element.style.maskRepeat = 'no-repeat'; // Set mask-repeat
				element.style.maskSize = 'contain'; // Set mask-size
			}
		}
	}

	/**
	 * Create a new instance of MutationObserver with a callback function
	 * to observe changes in the DOM 
	*/
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') { // If the change is of type childList
				mutation.addedNodes.forEach(function (node) { // Iterate through added nodes
					if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
						// Find an element with the selector in the added node
						const element = node.querySelector('.BattleTabStatisticComponentStyle-container > div');
						if (element) {
							trackElements();
						}
					}
				});

				mutation.removedNodes.forEach(function(node) { // Iterate through removed nodes
					if (node.nodeType === Node.ELEMENT_NODE) { // If it's an element node
						// Find an element with the selector in the added node
						const element = node.querySelector('.BattleTabStatisticComponentStyle-container > div');
						if (element) {
							// Stop animation request
							if (requestId) {
								cancelAnimationFrame(reqID);
								reqID = null;
							}
						}
					}
				});
			}
		});
	});

	// Configuration for the mutation observer
	const observerConfig = { childList: true, subtree: true };

	// Start observing mutations in the document body
	observer.observe(document.body, observerConfig);
})();