document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('checkCardBtn').addEventListener('click', highlightCard);
	document.getElementById('cardInput').addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			highlightCard();
		}
	});
});

function highlightCard() {
	document.querySelectorAll('.box').forEach(box => box.classList.remove('highlight'));
	document.querySelectorAll('.none').forEach(box => box.classList.remove('highlight'));
	const input = document.getElementById('cardInput').value.trim().toUpperCase();
	let found = false;
	let message = '';
	let cardMap = {
		'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J', 'T': 'T', '9': '9', '8': '8', '7': '7', '6': '6', '5': '5', '4': '4', '3': '3', '2': '2'
	};
	if (input.length === 2 && cardMap[input[0]] && cardMap[input[1]]) {
		let search = cardMap[input[0]] + ' - ' + cardMap[input[1]];
		let searchAlt = cardMap[input[1]] + ' - ' + cardMap[input[0]];
		document.querySelectorAll('.box').forEach(box => {
			if (box.textContent === search || box.textContent === searchAlt) {
				box.classList.add('highlight');
				found = true;
				if (box.classList.contains('premium')) message = 'PLAY in any position';
				else if (box.classList.contains('strong')) message = 'PLAY in mid/late position';
				else if (box.classList.contains('speculative')) message = 'PLAY in late position only';
				else if (box.classList.contains('weak')) message = 'Unplayable cards';
			}
		});
		document.querySelectorAll('.none').forEach(box => {
			if (box.textContent === search || box.textContent === searchAlt) {
				box.classList.add('highlight');
				found = true;
				message = 'Unplayable cards';
			}
		});
	}
	document.getElementById('cardMessage').textContent = found ? message : 'Card not found.';
}
