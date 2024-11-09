let creatures = [];
let currentCreature = 0;

function fetchData() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            parseData(data);
            updateNavigation();
            displayCreature(0);
        });
}

function parseData(data) {
    const creatureData = data.split(/(?=ascii:)/);
    creatures = creatureData.map(creature => {
        const [ascii, info] = creature.split('info:');
        return {
            ascii: ascii.replace('ascii:', '').trim(),
            info: info.trim(),
            summary: info.match(/Summary Table Row: (.+)/)[1].trim()
        };
    });
}

function updateNavigation() {
    const nav = document.getElementById('navigation');
    creatures.forEach((creature, index) => {
        const button = document.createElement('button');
        button.textContent = `Creature ${index + 1}`;
        button.onclick = () => displayCreature(index);
        nav.appendChild(button);
    });
}

function displayCreature(index) {
    currentCreature = index;
    const asciiArt = document.getElementById('ascii-art');
    const infoText = document.getElementById('info-text');

    asciiArt.innerHTML = creatures[index].ascii;
    infoText.innerHTML = creatures[index].info.replace(/Summary Table Row:.+/, '');

    animateAsciiArt();
}

function animateAsciiArt() {
    const asciiArt = document.getElementById('ascii-art');
    const characters = asciiArt.innerText.split('');
    asciiArt.innerHTML = characters.map(char => `<span>${char}</span>`).join('');

    const spans = asciiArt.getElementsByTagName('span');
    const colors = ['#ff00ff', '#ffa500', '#00ffff', '#39ff14'];

    setInterval(() => {
        for (let span of spans) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomAngle = Math.random() * 10 - 5;
            span.style.color = randomColor;
            span.style.transform = `rotate(${randomAngle}deg)`;
        }
    }, 100);
}

function displaySummaryTable() {
    const modal = document.getElementById('summary-modal');
    const table = document.getElementById('summary-table');
    table.innerHTML = `
        <tr>
            <th>Creature</th>
            <th>Anesthesia</th>
            <th>Considerations</th>
            <th>Recovery</th>
        </tr>
    `;

    creatures.forEach(creature => {
        const row = document.createElement('tr');
        creature.summary.split('|').forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell.trim();
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    modal.style.display = 'block';
}

document.getElementById('summary-btn').onclick = displaySummaryTable;

document.querySelector('.close').onclick = function() {
    document.getElementById('summary-modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('summary-modal')) {
        document.getElementById('summary-modal').style.display = 'none';
    }
}

fetchData();
