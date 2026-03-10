const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listFieldsWithPage() {
    const data = fs.readFileSync('public/assets/CharacterSheet.pdf');
    const pdfDoc = await PDFDocument.load(data);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const pages = pdfDoc.getPages();

    fields.forEach(field => {
        const name = field.getName();
        if (name.toLowerCase().includes('person') || name.toLowerCase().includes('ideal') || name.toLowerCase().includes('bond') || name.toLowerCase().includes('flaw')) {
            // Finding the page is hard in pdf-lib directly sometimes, 
            // but we can look for widgets
            const widgets = field.acroField.getWidgets();
            widgets.forEach(w => {
                const p = w.getPage();
                const pageIndex = pages.findIndex(page => page.ref === p);
                console.log(`Field: '${name}' - Page: ${pageIndex + 1}`);
            });
        }
    });
}

listFieldsWithPage();
