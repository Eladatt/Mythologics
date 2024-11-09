const fileList = document.getElementById('file-list');
const asciiArt = document.getElementById('ascii-art');
const infoSection = document.getElementById('info-section');

async function loadTextFiles() {
    const response = await fetch('/list-txt-files');
    const files = await response.json();
    
    files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.innerHTML = `
            <div class="accordion-header">${file}</div>
            <div class="accordion-content"></div>
        `;
        item.querySelector('.accordion-header').addEventListener('click', () => loadFile(file));
        fileList.appendChild(item);
    });
}

async function loadFile(filename) {
    const response = await fetch(`/txt-files/${filename}`);
    const content = await response.text();
    const sections = parseContent(content);
    
    displayContent(sections);
    updateAccordion(filename, sections);
}

function parseContent(content) {
    // ... (same as before)
}

function displayContent(sections) {
    // ... (same as before)
}

function updateAccordion(filename, sections) {
    // ... (same as before)
}

loadTextFiles();
