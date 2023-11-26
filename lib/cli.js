const clc = require('cli-color')
const pkg = require('../package')
const { _, log } = require('basd')
const prompts = require('prompts')
const { program } = require('commander')
const questions = require('./questions')
const Scaffolder = require('./scaffolder')

/**
 * The SevnStackCLI class manages the command-line interface for the SevnStack application.
 * It sets up commands, handles user input, and invokes the appropriate actions.
 */
class SevnStackCLI {
  /**
   * Constructs the CLI application and sets up the commands.
   */
  constructor() {
    this.program = program
    this.setupCommands()
  }

  /**
   * Sets up CLI commands and their corresponding actions.
   */
  setupCommands() {
    this.program
      .version(pkg.version)
      .description(pkg.description)

    // Command to create a new project
    this.program
      .command('create <app-name>')
      .description('Create a new full-stack web application')
      .option('-f, --force', 'Force creation with the default configuration')
      .option('-m, --monolithic', 'Use a monolithic architecture')
      .option('-d, --decoupled', 'Use a decoupled architecture')
      .option('-s, --ssr', 'Use Server-Side Rendering with Nuxt')
      .option('-S, --static', 'Use Static Generation with Nuxt')
      .option('-D, --docker', 'Include Docker configuration')
      .option('-t, --tls', 'Use TLS (HTTPS) for transport protocol')
      .action(this.commandCreate.bind(this))

    // Command to initialize a new project in an existing directory
    this.program
      .command('init [directory]')
      .description('Initialize a new project in an existing directory')
      .option('-y, --yes', 'Use default configuration')
      .action(this.commandInit.bind(this))

    // Command to add new features to an existing project
    this.program
      .command('add-feature')
      .description('Add new features to an existing project')
      .option('--auth', 'Add authentication feature')
      .option('--ws, --websockets', 'Add WebSockets feature')
      .option('--pwa', 'Add Progressive Web App (PWA) support')
      .action(this.commandAddFeature.bind(this))

    // Command to update the project dependencies or migrate to a newer version
    this.program
      .command('update')
      .description('Update the project dependencies or migrate to a newer version')
      .action(this.commandUpdate.bind(this))

    // Command to build the project for production
    this.program
      .command('build')
      .description('Build the project for production')
      .option('--minify', 'Minify files for production')
      .action(this.commandBuild.bind(this))

    // Command to start the development server
    this.program
      .command('start')
      .description('Start the development server')
      .option('--port <port>', 'Specify the port number for the server')
      .action(this.commandStart.bind(this))

    // Command to assist with deployment processes
    this.program
      .command('deploy')
      .description('Assist with deployment processes')
      .option('--prod', 'Deploy to production environment')
      .option('--staging', 'Deploy to staging environment')
      .action(this.commandDeploy.bind(this))
  }

  /**
   * Finds a question by its name from the predefined list of questions.
   * @param {string} name - The name of the question to find.
   * @returns {object} The found question object.
   */
  findQuestion(name) {
    return questions.find(q => q.name === name)
  }

  /**
   * Handles the 'create' command to scaffold a new full-stack web application.
   * @param {string} appName - The name of the application to create.
   * @param {object} options - Command-line options provided by the user.
   * @returns {Promise<void>}
   */
  async commandCreate(appName, options) {
    log(clc.green.underline(`\nCreating a new app:`), clc.greenBright(appName), '\n')

    let config = {}
    let responses = {}
    const override = {}
    if (!options.force) {
      this.findQuestion('siteName').initial = _.startCase(appName)
      if (options.monolithic && options.decoupled)
        throw new Error(`Site architecture can't be both monolithic and decoupled`)
      if (options.monolithic) {
        override.architecture = 'monolithic'
        // this.findQuestion('architecture').type = null
        // config.architecture = 'monolithic'
      } else if (options.decoupled) {
        override.architecture = 'decoupled'
        // this.findQuestion('architecture').type = null
        // config.architecture = 'decoupled'
      }
      if (options.ssr && options.static)
        throw new Error(`Site rendering can't be both SSR and static`)
      if (options.ssr) {
        this.findQuestion('rendering').type = null
        config.rendering = 'ssr'
      } else if (options.static) {
        this.findQuestion('rendering').type = null
        config.rendering = 'static'
      }
      if (options.docker) {
        this.findQuestion('useDocker').type = null
        config.useDocker = true
      }
      if (options.tls) {
        this.findQuestion('protocol').type = null
        config.protocol = 'https'
      }
      // prompts.override(require('yargs').argv)
      prompts.override(override)
      responses = await new Promise((resolve, reject) => {
        prompts(questions, { onCancel: () => {
          resolve(null)
        }}).then(resolve)
      })
    } else {
      responses = await this.getDefaults(appName, options)
    }
    if (responses)
      return this.scaffold({ ...responses, ...config })
  }

  /**
   * Initializes a new project in an existing directory.
   */
  async commandInit() {
    console.log('@todo - Initializing new project...')
  }

  /**
   * Adds new features to an existing project.
   */
  async commandAddFeature() {
    console.log('@todo - Adding new feature...')
  }

  /**
   * Updates the project dependencies or migrates to a newer version.
   */
  async commandUpdate() {
    console.log('@todo - Updating project...')
  }

  /**
   * Builds the project for production deployment.
   */
  async commandBuild() {
    console.log('@todo - Building project for production...')
  }

  /**
   * Starts the development server for the project.
   */
  async commandStart() {
    console.log('@todo - Starting development server...')
  }

  /**
   * Assists with the deployment of the project to different environments.
   */
  async commandDeploy() {
    console.log('@todo - Assisting with deployment...')
  }

  /**
   * Scaffolds the project based on the provided configuration.
   * @param {object} config - The configuration for scaffolding the project.
   * @returns {Promise<void>}
   */
  async scaffold(config) {
    const scaffolder = new Scaffolder(config)
    return scaffolder.execute()
  }

  /**
   * Gets the default configuration for the project based on provided options.
   * @param {string} appName - The name of the application.
   * @param {object} options - Command-line options provided by the user.
   * @returns {Promise<object>} The default configuration object.
   */
  async getDefaults(appName, options) {
    let last, prev
    return _.transform(questions, (o, item) => {
      let type = item.type
      if (_.isFunction(type)) {
        type = type(prev, o, last)
      }
      if (item.name === 'siteName')
        item.initial = _.startCase(appName)
      if (type === 'text') {
        if (_.isFunction(item.initial)) {
          o[item.name] = item.initial(prev, o, last)
        } else {
          o[item.name] = item.initial
        }
      } else if (type === 'select') {
        o[item.name] = item.choices[0].value
      } else if (type === 'multiselect') {
        o[item.name] = item.choices.map(c => c.value)
      } else if (type === 'toggle') {
        o[item.name] = item.initial
      }
      last = item
      prev = o[item.name]
    }, {})
  }

  /**
   * Parses the command-line arguments and executes the corresponding command.
   * This method triggers the action bound to the command entered by the user.
   * @returns {void}
   */
  execute() {
    return this.program.parse(process.argv)
  }

  /**
   * Static method to create an instance of SevnStackCLI and execute it.
   * This is the entry point for running the CLI from an external caller.
   * @returns {void}
   */
  static execute() {
    const cli = new this()
    return cli.execute()
  }
}

module.exports = SevnStackCLI
