# Vue AST i18n [![Build Status](https://travis-ci.org/icai/vue-ast-i18n.svg?branch=master)](https://travis-ci.org/icai/vue-ast-i18n)

> **Coding in progress**

The objective of this tool is to make easy to migrate an existing codebase to use i18n

## How it works
- it gets a list of files from the command line
- it runs a babel plugin transform to find all string inside JSXText
- it generates a stable key for the extracted strings
- it generates i18n files format based on this map
- it modify your existing code to use i18n library of your preference

## Example

Before this transform
```vue
<template>
  <div>
    <h1 class="display-2 text-white font-weight-bold mb-0">
        NeonCMS Kit
    </h1>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>
```

After this transform
```vue
<template>
  <div>
    <h1 class="display-2 text-white font-weight-bold mb-0">
       {{$t('NeonCMS Kit')}}
    </h1>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    
</style>
```

## Usage of string extractor
```bash
yarn start --src=myapp/src
```

- It will generate a resource.jsx file, like the below:
```js
export default {
  translation: {
   'ok': `ok`,
   'cancelar': `cancelar`,
   'continuar': `continuar`,
   'salvar': `salvar`,
   'endereco': `endereço:`,
   'troca_de_senha': `troca de senha`,
   'dados_pessoais': `dados pessoais`,
   [key]: 'value',
  }
}
```

### How to use resource with react-i18next?
- rename resource.tsx to your main language, like en.ts
- create other resource languages based on the generated one

```js
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})


// Create a Vue instance with `i18n` option
new Vue({ i18n }).$mount('#app')
```

## Usage of i18n codemod
```bash
npm i -g jscodeshift

jscodeshift -t src/i18nTransfomerCodemod.ts PATH_TO_FILES
```

## How to customize blacklist
Use ast.config.js to customize blacklist for jsx attribute name and call expression calle

```js
module.exports = {
  blackListJsxAttributeName: [
    'type',
    'id',
    'name',
    'children',
    'labelKey',
    'valueKey',
    'labelValue',
    'className',
    'color',
    'key',
    'size',
    'charSet',
    'content',
  ],
  blackListCallExpressionCalle: [
    't',
    '_interopRequireDefault',
    'require',
    'routeTo',
    'format',
    'importScripts',
    'buildPath',
    'createLoadable',
    'import',
    'setFieldValue',
  ],
};
```

## Credits

Inspired by https://github.com/sibelius/ast-i18n

