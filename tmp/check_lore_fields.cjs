const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function listLoreFields() {
    const data = fs.readFileSync('public/assets/CharacterSheet.pdf');
    const pdfDoc = await PDFDocument.load(data);
    const form = pdfDoc.getForm();
    const fields = ['PersonalityTraits ', 'Ideals', 'Bonds', 'Flaws', 'Backstory'];

    fields.forEach(name => {
        try {
            const field = form.getField(name);
            console.log(`Field: '${name}' (Hex: ${Buffer.from(name).toString('hex')}) - Found!`);
        } catch (e) {
            console.log(`Field: '${name}' - NOT FOUND`);
        }
    });

    console.log('\nAll fields matching "Ideal", "Bond", "Flaw":');
    form.getFields().forEach(f => {
        const n = f.getName();
        if (['ideal', 'bond', 'flaw'].some(word => n.toLowerCase().includes(word))) {
            console.log(`'${n}' (Hex: ${Buffer.from(n).toString('hex')})`);
        }
    });
}

listLoreFields();
