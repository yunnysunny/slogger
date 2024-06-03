const versionNode = Number(process.version.split('.')[0].substring(1));

function readPackage(pkg, context) {
    if (versionNode >= 16) {
        return pkg;
    }
    if (pkg.name === 'typescript') {
        pkg.dependencies = {
            ...pkg.dependencies,
            'typescript': '4.9.5'
        }
    } else if (pkg.name === 'triple-beam') {
        pkg.dependencies = {
            ...pkg.dependencies,
            'triple-beam': '1.3.0'
        }
    } else if (pkg.name === 'typedoc') {
        const { typedoc, ...rest } = pkg.dependencies;
        pkg.dependencies = rest;
    }
}

module.exports = {
    hooks: {
        readPackage
    }
}