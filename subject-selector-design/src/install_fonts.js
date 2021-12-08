const {
    installFont,
    installFontsFromDir,
    clearCache 
  } = require('install-custom-font')
   
  ;(async () => {
    const results = await Promise.all([
      installFont('./components/styles/custom_fonts/FrutigerLTW01-45Light.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-46LightItalic.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-55Roman.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-56Italic.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-65Bold.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-66BoldItalic.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-75Black.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-76BlackItalic.ttf'),
      installFont('./components/styles/custom_fonts/FrutigerLTW01-95UltraBlack.ttf'),
    ])
    console.log(results[0]) // { result: "was_added", ... }
   
    // [2] when font is already installed, the result will show that
    await installFont('~/Downloads/FONT.ttf').then((result) => {
      console.log(result) // { result: "already_added", ... }
    })
   
    // [3] on errors, the result will be an error and a message explaining
    await installFont('~/Downloads/background.jpg').then((result) => {
      console.log(result)
      // { result: "error", error: "Can only install ttf, otf, woff and woff2 fonts", ... }
    })
   
    // clear the font cache so a reboot is not needed
    await clearCache()
   
    // [4] alternatively, a high-level function installFontsFromDir
    //     can be used, which installs all the fonts contained in a directory
    //     (does a recursive search for files within)
   
    // Note: clearCache is automatically called after this function, unless `interactive: false`
    // is added as an option
    await installFontsFromDir('~/Downloads/ComicSansMT/')
  })()