document.addEventListener('DOMContentLoaded', function() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(data => {
            const creatures = parseCreatures(data);
            createNavigation(creatures);
            displayCreature(creatures[0]);
        });
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
        <h2>${creature.name}</h2>
        <pre>${creature.ascii}</pre>
        <h3>Anesthesia Considerations:</h3>
        <p>${creature.info}</p>
        <h3>Summary:</h3>
        <table>
            <tr>
                <th>Creature</th>
                <th>Anesthesia Protocol</th>
                <th>Physiological Considerations</th>
                <th>Special Considerations</th>
            </tr>
            <tr>
                <td>${creature.summary}</td>
            </tr>
        </table>
    `;
}
