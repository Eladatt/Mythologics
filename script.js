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

    const summaryButton = document.getElementById('summary-button');
    const summaryModal = document.getElementById('summary-table');
    const closeButton = document.getElementsByClassName('close')[0];

    summaryButton.onclick = function() {
        summaryModal.style.display = "block";
    }

    closeButton.onclick = function() {
        summaryModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == summaryModal) {
            summaryModal.style.display = "none";
        }
    }
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
    const asciiFrame = document.getElementById('ascii-frame');
    const infoFrame = document.getElementById('info-frame');

    asciiFrame.innerHTML = `<pre>${creature.ascii}</pre>`;
    infoFrame.innerHTML = `
        <h2>${creature.name}</h2>
        <h3>Anesthesia Considerations:</h3>
        <p>${creature.info}</p>
    `;
}

function createSummaryTable(creatures) {
    const table = document.getElementById('summary-table-content');
    table.innerHTML = `
        <tr>
            <th>Creature</th>
            <th>Anesthesia Protocol</th>
            <th>Physiological Considerations</th>
            <th>Special Considerations</th>
        </tr>
    `;

    creatures.forEach(creature => {
        const row = table.insertRow();
        creature.summary.split('|').forEach(cell => {
            const td = row.insertCell();
            td.textContent = cell.trim();
        });
    });
}
