const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: true,
        extract: !!options.writeMeta,
        Modules: true, // use CSS modules
        //Namedexport: true, // class name export
        CamelCase: true, // supports hump
        Sass: true, // use sass
        // less:true,
        // autoModules:true,
        // namedExports(name) {
        //   // Maybe you simply want to convert dash to underscore
        //   return name.replace(/-/g, '_')
        // }
    }),
    );

    // config.plugins.map((item) => {
    //   console.log(item);
    // });

    return config;
  },
};