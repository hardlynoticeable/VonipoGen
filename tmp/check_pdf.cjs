const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function check() {
    const pdfBytes = fs.readFileSync('public/assets/CharacterSheet.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    fields.forEach(f => {
        const name = f.getName();
        if (name.includes('SlotsTotal')) {
            console.log(name);
        }
    });
}
check();
