import fs from 'graceful-fs';
import * as babel from '@babel/core';
import prettier, { Options } from 'prettier';
import I18nTransform from './transform/index'
import babelConfig from '../babel.config.js';
const compiler = require('vue-template-compiler')
const domCompiler = require('@vue/compiler-dom');

export const resource = (i18nResource: {[key: string]: string}) => {
  const formatted = Object.keys(i18nResource)
    .map(key => `   '${key}': \`${i18nResource[key]}\``)
    .join(',\n');

  return `export default {
  translation: {
${formatted}
  }
}
`
};

const prettierDefaultConfig: Options = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  parser: 'babel',
};

export const getResourceSource = (i18nResource: {[key: string]: string}) => {
  const source = resource(i18nResource);

  return prettier.format(source, prettierDefaultConfig);
};


export const generateResources = (files: string[]) => {

  let phrases = [];
  for (const filename of files) {
    const source = fs.readFileSync(filename, 'utf8');

    const sfcd = compiler.parseComponent(source)
    const templateAST = domCompiler.compile(sfcd.template!.content)
    const vtast = compiler.compile(sfcd.template!.content)
    const templateTransform = new I18nTransform()
    const tast = templateTransform.generate(vtast.ast)

    // console.log(vtast.ast)
    // console.log(JSON.stringify(templateAST, null ,2))
    // console.log(JSON.stringify(tast, null ,2))

    return;

    try {
      babel.transformSync(source, {
        ast: false,
        code: true,
        plugins: [...babelConfig.plugins],
        sourceType: 'unambiguous',
        filename,
      });



      phrases = [
        ...phrases
      ];
    } catch (err) {
      console.log('err: ', filename, err);
    }
  }


  fs.writeFileSync('resource.js', resource({}));

  // tslint:disable-next-line
  console.log('generate resource file: resource.tsx');

};
