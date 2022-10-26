const helpers = require('./helpers')
const fonts = {
  fa: {
    package: {
      '@fortawesome/fontawesome-free': '5.15.3',
    },
    import: '@fortawesome/fontawesome-free/css/all.css',
    link:
      '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">',
  },
  fa4: {
    package: {
      'font-awesome': '4.7.0',
    },
    import: 'font-awesome/css/font-awesome.css',
    link:
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">',
  },
}

function addDependencies (api, iconFont) {
  api.extendPackage({
    dependencies: {
    },
  })
}

function addImports (api, iconFont) {
}

function addLinks (api, iconFont) {
  helpers.updateFile(api, './public/index.html', lines => {
    const lastLink = lines.reverse().findIndex(line => line.match(/^\s*<\/head>/))

    return lines.reverse()
  })
}

function addPlugin (api, opts) {
  const ext = opts.hasTS ? 'ts' : 'js'

  api.injectImports(api.entryFile, 'import { loadFonts } from \'./plugins/webfontloader\'')

  api.extendPackage({
    dependencies: {
      webfontloader: '^1.0.0',
    },
    ...(opts.hasTS && { devDependencies: { '@types/webfontloader': '^1.0.0' } }),
  })

  api.render({
    [`./src/plugins/webfontloader.${ext}`]: `../templates/v3/vite/plugins/webfontloader.${ext}`,
  }, opts)
}

module.exports = {
  addDependencies,
  addImports,
  addLinks,
  addPlugin,
}
