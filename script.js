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
    const sections = [];
    let currentSection = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
        if (line.startsWith('Title: ')) {
            if (currentSection.title) sections.push(currentSection);
            currentSection = { title: line.substring(7) };
        } else if (line.startsWith('ASCII Art:')) {
            currentSection.asciiArt = '';
        } else if (line.startsWith('Info:')) {
            currentSection.info = '';
        } else if (line.startsWith('Summary:')) {
            currentSection.summary = [];
        } else {
            if (currentSection.asciiArt !== undefined && !currentSection.info) {
                currentSection.asciiArt += line + '\n';
            } else if (currentSection.info !== undefined && !currentSection.summary) {
                currentSection.info += line + '\n';
            } else if (currentSection.summary) {
                currentSection.summary.push(line.split('|').map(cell => cell.trim()));
            }
        }
    }
    
    if (currentSection.title) sections.push(currentSection);
    return sections;
}

function displayContent(sections) {
    if (sections.length === 0) return;
    
    const firstSection = sections[0];
    asciiArt.textContent = firstSection.asciiArt || '';
    infoSection.innerHTML = `<h2>${firstSection.title}</h2><p>${firstSection.info || ''}</p>`;
    
    if (firstSection.summary) {
        const table = document.createElement('table');
        firstSection.summary.forEach((row, index) => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement(index === 0 ? 'th' : 'td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        infoSection.appendChild(table);
    }
}

function updateAccordion(filename, sections) {
    const accordionContent = fileList.querySelector(`[data-file="${filename}"] .accordion-content`);
    accordionContent.innerHTML = '';
    
    sections.forEach(section => {
        const sectionItem = document.createElement('div');
        sectionItem.textContent = section.title;
        sectionItem.addEventListener('click', () => displayContent([section]));
        accordionContent.appendChild(sectionItem);
    });
    
    accordionContent.style.display = 'block';
}

loadTextFiles();
