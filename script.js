let creatures = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            creatures = parseCreatures(data);
            createNavigation(creatures);
            displayCreature(creatures[0]);
        });

    document.getElementById('summaryButton').addEventListener('click', displaySummaryTable);
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
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="ascii-frame">
            <pre>${creature.ascii}</pre>
        </div>
        <div class="info-frame">
            <h2>${creature.name}</h2>
            <h3>Anesthesia Considerations:</h3>
            <p>${creature.info}</p>
        </div>
    `;
}

function displaySummaryTable() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="info-frame" style="flex: 1;">
            <h2>Summary Table</h2>
            <table>
                <tr>
                    <th>Creature</th>
                    <th>Anesthesia Protocol</th>
                    <th>Physiological Considerations</th>
                    <th>Special Considerations</th>
                </tr>
                ${creatures.map(creature => `<tr><td>${creature.summary}</td></tr>`).join('')}
            </table>
        </div>
    `;
}
