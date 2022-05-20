// usage: yarn new

const fs = require('fs')

module.exports = plop => {
  plop.setGenerator('spec', {
    description: 'Vue Test',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'dir name'
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: [
      function createTestsDir(answers) {
        if (!fs.existsSync(`${answers.dir}/__tests__`)) {
          fs.mkdirSync(`${answers.dir}/__tests__`)
        }
        // if (!fs.existsSync(`tests/unit/__tests__`)) {
        //   fs.mkdirSync(`tests/unit/__tests__`)
        // }
      },
      {
        type: 'add',
        // transform(fileContents, data) {
        //   return fileContents.replace(/src\//g, '@/')
        // },
        // path: 'tests/unit/__tests__/{{dir}}/{{name}}.spec.js',
        path: '{{dir}}/__tests__/{{name}}.aspec.ts',
        templateFile: '_templates/component/component.spec.hbs'
      }
    ]
  })

  plop.setGenerator('component', {
    description: 'Vue Component',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'component folder'
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: [
      function createComponentDir(answers) {
        if (!fs.existsSync(`src/${answers.folder}/${answers.name}`)) {
          fs.mkdirSync(`src/${answers.folder}/${answers.name}`)
        }
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/{{name}}.vue',
        templateFile: '_templates/component/component.vue.hbs'
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/index.ts',
        templateFile: '_templates/component/component.index.hbs'
      },
      function createTestsDir(answers) {
        if (
          !fs.existsSync(`src/${answers.folder}/${answers.name}/__tests__`)
        ) {
          fs.mkdirSync(`src/${answers.folder}/${answers.name}/__tests__`)
        }
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{name}}/__tests__/{{name}}.spec.ts',
        templateFile: '_templates/component/component.spec.hbs'
      }
      // {
      //   type: 'add',
      //   path: 'src/{{folder}}/{{name}}/{{name}}.stories.ts',
      //   templateFile: '_templates/component/component.stories.hbs'
      // }
    ]
  })

  plop.setGenerator('module', {
    description: 'Vuex Module',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'dir name'
      },
      {
        type: 'input',
        name: 'name',
        message: 'module name'
      }
    ],
    actions: [
      function createModuleDir(answers) {
        if (!fs.existsSync(`src/state/modules/${answers.dir}`)) {
          fs.mkdirSync(`src/state/modules/${answers.dir}`)
        }
      },
      function createTestsDir(answers) {
        if (!fs.existsSync(`src/state/modules/${answers.dir}/__tests__`)) {
          fs.mkdirSync(`src/state/modules/${answers.dir}/__tests__`)
        }
      },
      {
        type: 'add',
        path: 'src/state/modules/{{dir}}/{{name}}.js',
        templateFile: '_templates/module/module.hbs'
      }
    ]
  })
}
