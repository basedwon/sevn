const { _, log } = require('basd')

module.exports = [
  {
    type: 'select',
    name: 'architecture',
    message: 'Choose your application architecture:',
    choices: [
      { title: 'Decoupled', value: 'decoupled' },
      { title: 'Monolithic', value: 'monolithic' },
    ],
  },
  {
    type: 'select',
    name: 'rendering',
    message: 'Select the rendering mode for Nuxt:',
    choices: [
      { title: 'Static', value: 'static' },
      { title: 'SSR', value: 'ssr' },
    ],
  },
  {
    type: 'multiselect',
    name: 'features',
    message: 'Select additional features:',
    choices: [
      { title: 'Authentication', value: 'authentication' },
      { title: 'WebSockets', value: 'websockets' },
      { title: 'PWA', value: 'pwa' },
      { title: 'Robots.txt', value: 'robots' },
      { title: 'Sitemap', value: 'sitemap' },
    ],
    min: 0,
  },
  {
    type: 'toggle',
    name: 'useDocker',
    message: 'Would you like to include Docker configuration?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
  },
  {
    type: 'text',
    name: 'siteName',
    message: 'Enter the name of your site:',
  },
  {
    type: 'text',
    name: 'siteSubtitle',
    message: 'Enter the subtitle for your site:',
    initial: '',
  },
  {
    type: 'text',
    name: 'description',
    message: 'Enter the description for your site:',
    initial: '',
  },
  {
    type: 'text',
    name: 'domain',
    message: 'Enter the production domain name:',
    initial: (p, v) => _.kebabCase(v.siteName) + '.com',
  },
  {
    type: (p, v) => v.architecture === 'monolithic' ? 'text' : null,
    name: 'devDomain',
    message: 'Enter the development domain name:',
    initial: 'localhost:7777',
  },
  {
    type: (p, v) => v.architecture === 'decoupled' ? 'text' : null,
    name: 'frontendDomain',
    message: 'Enter the frontend development domain:',
    initial: 'localhost:7777',
  },
  {
    type: (p, v) => v.architecture === 'decoupled' ? 'text' : null,
    name: 'backendDomain',
    message: 'Enter the backend development domain:',
    initial: 'localhost:7779',
  },
  {
    type: 'select',
    name: 'protocol',
    message: 'Choose the protocol for your site:',
    choices: [
      { title: 'https', value: 'https' },
      { title: 'http', value: 'http' },
    ]
  },
]
