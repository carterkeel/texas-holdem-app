document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('checkCardBtn').addEventListener('click', highlightCard);
	document.getElementById('cardInput').addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			highlightCard();
		}
	});
	const themeToggle = document.getElementById('themeToggle');
	themeToggle.addEventListener('click', function() {
		const root = document.documentElement;
		if (root.getAttribute('data-theme') === 'dark') {
			root.removeAttribute('data-theme');
		} else {
			root.setAttribute('data-theme', 'dark');
		}
	});
});

function highlightCard() {
	document.querySelectorAll('.box').forEach(box => box.classList.remove('highlight'));
	document.querySelectorAll('.none').forEach(box => box.classList.remove('highlight'));
	// Remove highlight from instructions
	document.querySelectorAll('.instruction').forEach(inst => inst.classList.remove('active'));
	const inputRaw = document.getElementById('cardInput').value.trim().toUpperCase();
	let found = false;
	let message = '';
	let cardMap = {
		'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J', 'T': 'T', '9': '9', '8': '8', '7': '7', '6': '6', '5': '5', '4': '4', '3': '3', '2': '2'
	};
	let input = inputRaw;
	let type = '';
	if (inputRaw.length === 3 && cardMap[inputRaw[0]] && cardMap[inputRaw[1]] && (inputRaw[2] === 'S' || inputRaw[2] === 'O')) {
		input = inputRaw.slice(0,2);
		type = inputRaw[2];
	}
	if (input.length === 2 && cardMap[input[0]] && cardMap[input[1]]) {
		let search = cardMap[input[0]] + cardMap[input[1]];
		let searchAlt = cardMap[input[1]] + cardMap[input[0]];
		let searchDash = cardMap[input[0]] + ' - ' + cardMap[input[1]];
		let searchDashAlt = cardMap[input[1]] + ' - ' + cardMap[input[0]];
		// Special cases for AA and 22
		if (input === 'AA') {
			found = true;
			message = 'PLAY in any position';
			// Highlight the first instruction (premium)
			document.querySelectorAll('.instruction')[0].classList.add('active');
			document.querySelectorAll('.box').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (boxText === 'AA') {
					box.classList.add('highlight');
				}
			});
		} else if (input === '22') {
			found = true;
			message = 'Unplayable cards';
			// Highlight the fourth instruction (weak)
			document.querySelectorAll('.instruction')[3].classList.add('active');
			document.querySelectorAll('.box').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (boxText === '22') {
					box.classList.add('highlight');
				}
			});
		} else if (type === 'S' || type === 'O') {
			// Only highlight matching suited/offsuit
			let suffix = type.toLowerCase();
			document.querySelectorAll('.box').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (boxText === (search + suffix).toUpperCase() || boxText === (searchAlt + suffix).toUpperCase()) {
					box.classList.add('highlight');
					found = true;
					if (box.classList.contains('premium')) {
						message = 'PLAY in any position';
						document.querySelectorAll('.instruction')[0].classList.add('active');
					} else if (box.classList.contains('strong')) {
						message = 'PLAY in mid/late position';
						document.querySelectorAll('.instruction')[1].classList.add('active');
					} else if (box.classList.contains('speculative')) {
						message = 'PLAY in late position only';
						document.querySelectorAll('.instruction')[2].classList.add('active');
					} else if (box.classList.contains('weak')) {
						message = 'Unplayable cards';
						document.querySelectorAll('.instruction')[3].classList.add('active');
					}
				}
			});
			document.querySelectorAll('.none').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (boxText === (search + suffix).toUpperCase() || boxText === (searchAlt + suffix).toUpperCase()) {
					box.classList.add('highlight');
					found = true;
					message = 'Unplayable cards';
				}
			});
		} else {
			// No suite: highlight both suited and offsuit
			document.querySelectorAll('.box').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (
					boxText === search.toUpperCase() ||
					boxText === searchAlt.toUpperCase() ||
					boxText === (search + 'S').toUpperCase() ||
					boxText === (searchAlt + 'S').toUpperCase() ||
					boxText === (search + 'O').toUpperCase() ||
					boxText === (searchAlt + 'O').toUpperCase()
				) {
					box.classList.add('highlight');
					found = true;
					if (box.classList.contains('premium')) {
						message = 'PLAY in any position';
						document.querySelectorAll('.instruction')[0].classList.add('active');
					} else if (box.classList.contains('strong')) {
						message = 'PLAY in mid/late position';
						document.querySelectorAll('.instruction')[1].classList.add('active');
					} else if (box.classList.contains('speculative')) {
						message = 'PLAY in late position only';
						document.querySelectorAll('.instruction')[2].classList.add('active');
					} else if (box.classList.contains('weak')) {
						message = 'Unplayable cards';
						document.querySelectorAll('.instruction')[3].classList.add('active');
					}
				}
			});
			document.querySelectorAll('.none').forEach(box => {
				let boxText = box.textContent.replace(/\s|-/g, '').toUpperCase();
				if (
					boxText === search.toUpperCase() ||
					boxText === searchAlt.toUpperCase() ||
					boxText === (search + 'S').toUpperCase() ||
					boxText === (searchAlt + 'S').toUpperCase() ||
					boxText === (search + 'O').toUpperCase() ||
					boxText === (searchAlt + 'O').toUpperCase()
				) {
					box.classList.add('highlight');
					found = true;
					message = 'Unplayable cards';
				}
			});
		}
	}
	if (found) {
		document.getElementById('cardMessage').textContent = message;
	} else if (input.length === 2 && cardMap[input[0]] && cardMap[input[1]] && !type) {
		document.getElementById('cardMessage').textContent = 'Unplayable cards';
	} else {
		document.getElementById('cardMessage').textContent = 'Card not found.';
	}
}
