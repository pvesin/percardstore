const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('public/build/bootstrap-theme')
  .setPublicPath('/build/bootstrap-theme')
  .addEntry('app', './themes/BootstrapTheme/assets/entry.js')
  .cleanupOutputBeforeBuild()

  .splitEntryChunks()
    .enableReactPreset()
  .enableSingleRuntimeChunk()

  .enableSassLoader()
  .enableVueLoader(() => {}, { runtimeCompilerBuild: false })

  .configureFilenames({
    js: '[name].[fullhash:8].min.js',
    css: '[name].[fullhash:8].min.css',
  })

  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction());

const config = Encore.getWebpackConfig();
config.name = 'bootstrapTheme';

module.exports = config;
