import type { ProjectImpl } from '../models/Project';
import type { PageImpl } from '../models/Page';

export class ProjectRenderer {
    project: ProjectImpl;
    constructor(project: ProjectImpl) {
        this.project = project;
    }

    getComponentById(uuid: string) {
        return this.project.components.find(component => component.uuid === uuid);
    }

    renderPage(page: PageImpl) {
        // Initialize with page's own HTML, CSS, and JS
        let htmlContent = page.html;
        let cssContent = page.css;
        let jsContent = page.js;

        // Iterate over the page's components, appending their content
        for (const componentUuid of page.componentUuuids) {
            const component = this.getComponentById(componentUuid);
            if (component) {
                htmlContent += component.html;
                cssContent += component.css;
                jsContent += component.js;
            }
        }

        // Construct the complete HTML document
        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${page.title}</title>
                <style>
                    ${cssContent}
                </style>
            </head>
            <body>
                ${htmlContent}
                <script>
                    ${jsContent}
                </script>
            </body>
            </html>
        `;

        return fullHtml;
    }

    renderAllPages() {
        return this.project.pages.map(page => this.renderPage(page));
    }
}
