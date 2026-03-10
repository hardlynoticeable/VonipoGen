const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function checkDuplicates() {
    const data = fs.readFileSync('public/assets/CharacterSheet.pdf');
    const pdfDoc = await PDFDocument.load(data);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const counts = {};
    fields.forEach(field => {
        const name = field.getName();
        counts[name] = (counts[name] || 0) + 1;
    });

    Object.keys(counts).forEach(name => {
        if (counts[name] > 1) {
            console.log(`Duplicate found: '${name}' x${counts[name]}`);
        }
    });
}

checkDuplicates();
