const creatures = {};
let currentCreature = null;

function loadCreatures() {
   fetch('Myth.txt')
       .then(response => response.text())
       .then(text => {
           const creatureData = text.split(/(?=\w+:)/); // Split on creature names like "brain:", "dragon:", etc.
           creatureData.forEach(data => {
               const [name, content] = data.split(':');
               if (name && content) {
                   const [ascii, info] = content.split('info:');
                   const AnimatorClass = getAnimatorClass(name.trim());
                   creatures[name.trim()] = new AnimatorClass(ascii.trim(), info.trim());
               }
           });
           updateNavigation();
           selectCreature(Object.keys(creatures)[0]); // Select first creature by default
       })
       .catch(error => console.error('Error loading Myth.txt:', error));
}

function getAnimatorClass(name) {
   switch (name.toLowerCase()) {
       case 'brain': return BrainAnimator;
       case 'dragon': return DragonAnimator;
       case 'unicorn': return UnicornAnimator;
       case 'phoenix': return PhoenixAnimator;
       case 'mermaid': return MermaidAnimator;
       default: return ASCIIAnimator; // Default to base class if no match
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

   const asciiContainer = document.getElementById('ascii-container');
   const infoContainer = document.getElementById('info-container');

   asciiContainer.innerHTML = creatures[name].animate(0); // Display static ASCII initially
   infoContainer.innerHTML = creatures[name].getInfo(); // Display anesthesia info

   animate(); // Start animation loop
}

function animate() {
   if (currentCreature && creatures[currentCreature]) {
       const asciiContainer = document.getElementById('ascii-container');
       let t = performance.now() / 1000; // Time in seconds

       asciiContainer.innerHTML = creatures[currentCreature].animate(t); // Animate ASCII art

       requestAnimationFrame(animate); // Continue animation loop
   }
}

// Load creatures from Myth.txt when page loads
loadCreatures();
