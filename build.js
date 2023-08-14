const { convertFromDirectory } = require('joi-to-typescript');

convertFromDirectory({
  schemaDirectory: './src/schemas',
  typeOutputDirectory: './src/interfaces',
  inputFileFilter: /[\w\W]*\.js$/,
  debug: true,
});
