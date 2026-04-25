export const saveCharacter = (data) => {
    try {
        localStorage.setItem('vonipogen_data', JSON.stringify(data));
    } catch (e) {
        console.error("Could not save to localStorage", e);
    }
};

export const loadCharacter = () => {
    try {
        const data = localStorage.getItem('vonipogen_data') || localStorage.getItem('tabaxi_generator_data');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Could not load from localStorage", e);
        return null;
    }
};

export const exportCharacterJSON = (data) => {
    const fileName = data.name ? `${data.name.trim().replace(/[^a-z0-9]/gi, '_')}.json` : 'Unnamed_Wanderer.json';
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
};
