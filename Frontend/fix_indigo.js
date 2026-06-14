const fs = require('fs');
const path = require('path');

const replacements = [
    ['withCindigoentials', 'withCredentials'],
    ['cindigoentials', 'credentials'],
    ['requiindigo', 'required'],
    ['filteindigoPosts', 'filteredPosts'],
    ['filteindigoRegistrations', 'filteredRegistrations'],
    ['filteindigoEvents', 'filteredEvents'],
    ['filteindigo', 'filtered'],
    ['registeindigo', 'registered'],
    ['registeindigoAt', 'registeredAt'],
    ['setFilteindigoRegistrations', 'setFilteredRegistrations'],
    ['shaindigo', 'shared'],
    ['rendeindigo', 'rendered'],
    ['indigouce', 'reduce'],
    ['indigoirected', 'redirected'],
    ['Coveindigo', 'Covered'],
    ['CindigoitCard', 'CreditCard']
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            for (const [search, replace] of replacements) {
                content = content.split(search).join(replace);
            }

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Done.');
