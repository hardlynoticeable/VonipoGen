const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listFields() {
    const data = fs.readFileSync('public/assets/CharacterSheet.pdf');
    const pdfDoc = await PDFDocument.load(data);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    fields.forEach(field => {
        const name = field.getName();
        if (name.toLowerCase().includes('person')) {
            console.log(`Matching field: '${name}' (Hex: ${Buffer.from(name).toString('hex')})`);
        }
    });
}

listFields();
