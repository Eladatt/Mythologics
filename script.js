document.addEventListener('DOMContentLoaded', function() {
    let creatures = [];

    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            creatures = parseData(data);
            createNavigation(creatures);
            displayCreature(creatures[0]);
        });

    function parseData(data) {
        const creatureData = data.split(/(?=\w+:\s*ascii:)/);
        return creatureData.map(section => {
            const [name, content] = section.split(':');
            const [ascii, info] = content.split('info:');
            return { name: name.trim(), ascii: ascii.trim(), info: info.trim() };
        });
    }

    function createNavigation(creatures) {
        const nav = document.getElementById('navigation');
        creatures.forEach((creature, index) => {
            const button = document.createElement('button');
            button.textContent = creature.name;
            button.addEventListener('click', () => displayCreature(creature));
            nav.appendChild(button);
        });
    }

    function displayCreature(creature) {
        const content = document.getElementById('content');
        content.innerHTML = `
            <h2>${creature.name}</h2>
            <div class="creature-content">
                <pre class="ascii-art">${creature.ascii}</pre>
                <div class="info">${creature.info}</div>
            </div>
        `;
    }

    document.getElementById('summaryBtn').addEventListener('click', displaySummaryTable);

    function displaySummaryTable() {
        const content = document.getElementById('content');
        let tableHTML = `
            <h2>Summary Table</h2>
            <table>
                <tr>
                    <th>Creature</th>
                    <th>Anesthesia Protocol</th>
                    <th>Physiological Considerations</th>
                    <th>Special Monitoring/Recovery</th>
                </tr>
        `;

        creatures.forEach(creature => {
            const summaryRow = creature.info.split('Summary Table Row:')[1].trim();
            const [name, protocol, physiology, monitoring] = summaryRow.split('|');
            tableHTML += `
                <tr>
                    <td>${name.trim()}</td>
                    <td>${protocol.trim()}</td>
                    <td>${physiology.trim()}</td>
                    <td>${monitoring.trim()}</td>
                </tr>
            `;
        });

        tableHTML += '</table>';
        content.innerHTML = tableHTML;
    }
});
