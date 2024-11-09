document.addEventListener('DOMContentLoaded', function() {
    const fileList = document.getElementById('file-list');
    const content = document.getElementById('content');

    // Simulated file structure (replace with actual file reading logic)
    const files = [
        {
            name: 'Myth.txt',
            content: `# Section 1\nContent of section 1\n## Subsection 1.1\nSubsection content\n# Section 2\nContent of section 2\n## Summary\n| Column 1 | Column 2 |\n|----------|----------|\n| Data 1   | Data 2   |`
        },
        
    ];

    // Create sidebar navigation
    files.forEach(file => {
        const accordion = document.createElement('button');
        accordion.className = 'accordion';
        accordion.textContent = file.name;
        fileList.appendChild(accordion);

        const panel = document.createElement('div');
        panel.className = 'panel';
        fileList.appendChild(panel);

        const sections = file.content.split('#').filter(Boolean);
        sections.forEach(section => {
            const sectionTitle = section.split('\n')[0].trim();
            const sectionLink = document.createElement('a');
            sectionLink.href = '#';
            sectionLink.textContent = sectionTitle;
            sectionLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayContent(file.name, section);
            });
            panel.appendChild(sectionLink);
        });

        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    function displayContent(fileName, sectionContent) {
        const lines = sectionContent.split('\n');
        const title = lines[0].trim();
        const body = lines.slice(1).join('\n');

        content.innerHTML = `<h2>${fileName} - ${title}</h2>`;

        if (title.toLowerCase().includes('summary')) {
            const table = parseMarkdownTable(body);
            content.innerHTML += table;
        } else {
            content.innerHTML += `<p>${body}</p>`;
        }
    }

    function parseMarkdownTable(markdown) {
        const rows = markdown.trim().split('\n');
        const headers = rows[0].split('|').map(header => header.trim()).filter(Boolean);
        const data = rows.slice(2).map(row => row.split('|').map(cell => cell.trim()).filter(Boolean));

        let tableHtml = '<table><tr>';
        headers.forEach(header => {
            tableHtml += `<th>${header}</th>`;
        });
        tableHtml += '</tr>';

        data.forEach(row => {
            tableHtml += '<tr>';
            row.forEach(cell => {
                tableHtml += `<td>${cell}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</table>';
        return tableHtml;
    }
});
