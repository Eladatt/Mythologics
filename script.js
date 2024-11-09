let creatures = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            creatures = parseCreatures(data);
            createNavigation(creatures);
            displayCreature(creatures[0]);
            populateSummaryTable(creatures);
        });

    document.getElementById('summaryButton').addEventListener('click', toggleSummaryTable);
});

function parseCreatures(data) {
    const creatureRegex = /(\w+):\s*ascii:\s*([\s\S]*?)info:\s*([\s\S]*?)Summary Table Row:\s*([\s\S]*?)(?=\n\w+:|$)/g;
    const creatures = [];
    let match;

    while ((match = creatureRegex.exec(data)) !== null) {
        creatures.push({
            name: match[1],
            ascii: match[2].trim(),
            info: match[3].trim(),
            summary: match[4].trim()
        });
    }

    return creatures;
}

function createNavigation(creatures) {
    const nav = document.getElementById('navigation');
    creatures.forEach(creature => {
        const button = document.createElement('button');
        button.textContent = creature.name;
        button.addEventListener('click', () => displayCreature(creature));
        nav.appendChild(button);
    });
}

function displayCreature(creature) {
    document.getElementById('asciiFrame').textContent = creature.ascii;
    document.getElementById('textFrame').innerHTML = `
        <h2>${creature.name}</h2>
        <h3>Anesthesia Considerations:</h3>
        <p>${creature.info}</p>
    `;
    document.getElementById('summaryTable').style.display = 'none';
    document.getElementById('content').style.display = 'flex';
}

function populateSummaryTable(creatures) {
    const tableBody = document.getElementById('summaryTableBody');
    creatures.forEach(creature => {
        const row = tableBody.insertRow();
        const summaryParts = creature.summary.split('|');
        summaryParts.forEach(part => {
            const cell = row.insertCell();
            cell.textContent = part.trim();
        });
    });
}

function toggleSummaryTable() {
    const summaryTable = document.getElementById('summaryTable');
    const content = document.getElementById('content');
    if (summaryTable.style.display === 'none') {
        summaryTable.style.display = 'block';
        content.style.display = 'none';
    } else {
        summaryTable.style.display = 'none';
        content.style.display = 'flex';
    }
}
