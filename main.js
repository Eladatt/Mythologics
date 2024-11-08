const creatures = {};
let currentCreature = null;
let time = 0;

const secretWords = {
    brain: 'cerebral',
    dragon: 'fire',
    unicorn: 'magic',
    phoenix: 'rebirth',
    mermaid: 'aquatic'
};

const colors = ['#ff7f00', '#8e44ad', '#e91e63', '#00bcd4']; // orange, purple, pink, cyan

function loadCreatures() {
    fetch('Myth.txt')
        .then(response => response.text())
        .then(text => {
            const creatureData = text.split(/(?=\w+:)/);
            creatureData.forEach(data => {
                const [name, content] = data.split(':');
                if (name && content) {
                    const [ascii, info] = content.split('info:');
                    const AnimatorClass = getAnimatorClass(name.trim());
                    creatures[name.trim()] = new AnimatorClass(ascii.trim(), info.trim());
                }
            });
            updateNavigation();
            selectCreature(Object.keys(creatures)[0]);
        });
}

function getAnimatorClass(name) {
    switch (name) {
        case 'brain': return BrainAnimator;
        case 'dragon': return DragonAnimator;
        case 'unicorn': return UnicornAnimator;
        case 'phoenix': return PhoenixAnimator;
        case 'mermaid': return MermaidAnimator;
        default: return ASCIIAnimator;
    }
}

function updateNavigation() {
    const navList = document.getElementById('nav-list');
    navList.innerHTML = '';
    Object.keys(creatures).forEach(name => {
        const li = document.createElement('li');
        li.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        li.onclick = () => selectCreature(name);
        navList.appendChild(li);
    });
}

function selectCreature(name) {
    currentCreature = name;
    const infoContainer = document.getElementById('info-container');
    infoContainer.innerHTML = creatures[name].getInfo();
}

function animate() {
    const container = document.getElementById('ascii-container');
    if (currentCreature && creatures[currentCreature]) {
        creatures[currentCreature].animate(time);
        creatures[currentCreature].render(container);
        
        // Apply color effect
        const colorIndex = Math.floor(time / 2) % colors.length;
        const hue = colors[colorIndex];
        container.style.color = hue;
    }
    time += 0.1;
    requestAnimationFrame(animate);
}

loadCreatures();
animate();
