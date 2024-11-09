document.addEventListener('DOMContentLoaded', function() {
    let creatures = [];

    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            creatures = parseCreatures(data);
            createNavigation(creatures);
            displayCreature(creatures[0]);
            createSummaryTable(creatures);
        });

    document.getElementById('summary-button').addEventListener('click', showSummaryTable);
    document.getElementById('close-summary').addEventListener('click', hideSummaryTable);
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
    document.getElementById('ascii-art').textContent = creature.ascii;
    document.getElementById('info-text').innerHTML = `
        <h2>${creature.name}</h2>
        <h3>Anesthesia Considerations:</h3>
        <p>${creature.info}</p>
    `;
}

function createSummaryTable(creatures) {
    const summaryBody = document.getElementById('summary-body');
    creatures.forEach(creature => {
        const row = document.createElement('tr');
        const [name, protocol, physiology, special] = creature.summary.split('|');
        row.innerHTML = `
            <td>${name.trim()}</td>
            <td>${protocol.trim()}</td>
            <td>${physiology.trim()}</td>
            <td>${special.trim()}</td>
        `;
        summaryBody.appendChild(row);
    });
}

function showSummaryTable() {
    document.getElementById('summary-table').classList.remove('hidden');
}

function hideSummaryTable() {
    document.getElementById('summary-table').classList.add('hidden');
}
