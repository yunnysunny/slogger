const fs = require('fs');
const versionNode = Number(process.version.split('.')[0].substring(1));
if (versionNode < 16) {
    fs.unlinkSync('pnpm-lock.yaml');
    console.log('delete pnpm-lock.yaml');
} else {
    console.log('pnpm-lock.yaml not delete');
}
function readPackage(pkg) {
    if (versionNode >= 16) {
        return pkg;
    }
    const { devDependencies } = pkg
    if (devDependencies?.typescript) {
        devDependencies.typescript = '4.9.5'
    }
    if (devDependencies?.typedoc) {
        delete devDependencies.typescript
    }
    if (devDependencies?.['typedoc-plugin-markdown']) {
        delete devDependencies['typedoc-plugin-markdown']
    }
    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    }
}