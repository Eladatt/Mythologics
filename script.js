let creatures = [];
let currentCreature = 0;

function loadFile() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            parseData(data);
            createNavigation();
            displayCreature(0);
            createSummaryTable();
        });
}

function parseData(data) {
    const sections = data.split(/(?=\w+:\s*ascii:)/);
    creatures = sections.map(section => {
        const [name, ...content] = section.split('\n');
        const asciiEnd = content.findIndex(line => line.startsWith('info:'));
        return {
            name: name.split(':')[0].trim(),
            ascii: content.slice(0, asciiEnd).join('\n'),
            info: content.slice(asciiEnd + 1).join('\n')
        };
    });
}

function createNavigation() {
    const nav = document.getElementById('navigation');
    creatures.forEach((creature, index) => {
        const button = document.createElement('button');
        button.textContent = creature.name;
        button.onclick = () => displayCreature(index);
        nav.appendChild(button);
    });
}

function displayCreature(index) {
    currentCreature = index;
    const creature = creatures[index];
    document.getElementById('ascii-art').textContent = creature.ascii;
    document.getElementById('info-text').textContent = creature.info;
}

function createSummaryTable() {
    const table = document.getElementById('summary-table');
    const headers = ['Creature', 'Anesthesia Protocol', 'Physiological Considerations', 'Special Considerations'];
    
    const headerRow = table.insertRow();
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    creatures.forEach(creature => {
        const row = table.insertRow();
        const infoLines = creature.info.split('\n');
        const summaryLine = infoLines.find(line => line.includes('Summary Table Row:'));
        if (summaryLine) {
            const [, ...cells] = summaryLine.split('|');
            cells.forEach(cell => {
                const td = row.insertCell();
                td.textContent = cell.trim();
            });
        }
    });
}

const summaryBtn = document.getElementById('summary-btn');
const modal = document.getElementById('summary-modal');
const closeBtn = document.getElementsByClassName('close')[0];

summaryBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

loadFile();
