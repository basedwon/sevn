const fs = require('fs')
const path = require('path')
const clc = require('cli-color')
const { _, log } = require('basd')
const Spinnies = require('spinnies')
const { promisify } = require('util')
const spinners = require('cli-spinners')
const Handlebars = require('handlebars')
const { spawn } = require('child_process')
const spinnies = new Spinnies({ color: 'green', spinner: spinners.aesthetic })

/**
 * Class representing the scaffolder for SevnStack projects. This class
 * handles the process of setting up the project structure, processing templates,
 * and installing dependencies.
 */
class Scaffolder {
  /**
   * Create a Scaffolder.
   * @param {Object} config - The configuration object for scaffolding.
   */
  constructor(config) {
    this.config = config
    this.prepareConfig()
    Handlebars.registerHelper('hasFeature', feature => this.config.features.includes(feature))
  }

  /**
   * Prepares the configuration object by modifying and adding necessary properties.
   */
  prepareConfig() {
    const config = this.config
    config.static = config.rendering === 'static'
    config.siteNameKebab = _.kebabCase(config.siteName)
    config.monolithic = config.architecture === 'monolithic'
    config.decoupled = config.architecture === 'decoupled'
    if (config.decoupled) {
      let port = config.backendDomain.split(':')
      if (port.length === 2)
        port = port[1]
      else
        port = 3000
      config.port = port
      config.frontendUrl = `${config.protocol}://${config.frontendDomain}`
      config.backendUrl = `${config.protocol}://${config.backendDomain}`
    } else {
      config.port = 3000
      config.devUrl = `${config.protocol}://${config.devDomain}`
    }
  }

  /**
   * Recursively retrieves files from a directory.
   * @param {string} dir - The directory to search in.
   * @param {string} [baseDir=''] - The base directory path for recursion.
   * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
   */
  async getFilesRecursively(dir, baseDir = '') {
    const entries = await promisify(fs.readdir)(dir, { withFileTypes: true })
    const files = []
    for (let entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = baseDir + entry.name
      if (entry.isDirectory()) {
        files.push(...await this.getFilesRecursively(fullPath, relativePath + '/'))
      } else {
        files.push(relativePath)
      }
    }
    return files
  }

  /**
   * Executes the entire scaffolding process.
   */
  async execute() {
    spinnies.add('spinner', { text: 'Starting project scaffolding...' })
    try {
      await this.createDirectories()
      await this.processFiles()
      await this.installDependencies()
      spinnies.succeed('spinner', { text: 'Project scaffolding complete!', succeedColor: 'green' })
      console.log(clc.green(`\nYour project is ready at:`), clc.greenBright.underline(this.targetPath))
    } catch (error) {
      spinnies.fail('spinner', { text: `Scaffold creation error: ${error.message}`, failColor: 'redBright' })
      console.error(error)
      await this.cleanupResources()
    }
  }

  /**
   * Creates necessary directories for the project based on its configuration.
   */
  async createDirectories() {
    spinnies.update('spinner', { text: 'Creating project directories...' })
    const targetPath = path.join(process.cwd(), 'tmp', _.kebabCase(this.config.siteName)) // @tmp
    await promisify(fs.mkdir)(targetPath, { recursive: true })
    if (this.config.decoupled) {
      await promisify(fs.mkdir)(path.join(targetPath, 'client'), { recursive: true })
      await promisify(fs.mkdir)(path.join(targetPath, 'server'), { recursive: true })
    } else {
      await promisify(fs.mkdir)(path.join(targetPath, 'src'), { recursive: true })
      await promisify(fs.mkdir)(path.join(targetPath, 'src/api'), { recursive: true })
    }
    this.targetPath = targetPath
  }

  /**
   * Processes and prepares files for scaffolding - includes handling templates and static files.
   */
  async processFiles() {
    spinnies.update('spinner', { text: 'Processing templates and files...' })
    const filesToProcess = await this.prepareFilesToProcess()

    for (const file of filesToProcess) {
      const srcPath = file.src.startsWith('/') ? file.src : path.join('templates', file.src)
      const destPath = file.dest.startsWith('/') ? file.dest : path.join(this.targetPath, file.dest)
      const directory = path.dirname(destPath)
      await promisify(fs.mkdir)(directory, { recursive: true })
      if (file.isTemplate) {
        const templateContent = await promisify(fs.readFile)(srcPath, 'utf-8')
        const template = Handlebars.compile(templateContent)
        const result = template(this.config)
        await promisify(fs.writeFile)(destPath, result)
      } else {
        await promisify(fs.copyFile)(srcPath, destPath)
      }
    }
  }

  /**
   * Prepares the list of files to be processed for scaffolding.
   * @returns {Promise<Object[]>} - A promise that resolves to an array of file objects to process.
   */
  async prepareFilesToProcess() {
    const nuxtPath = this.config.decoupled 
      ? path.join(this.targetPath, 'client') 
      : path.join(this.targetPath, 'src')
    const expressPath = this.config.decoupled 
      ? path.join(this.targetPath, 'server') 
      : path.join(this.targetPath, 'src/api')

    const filesToProcess = [
      { src: 'nuxt/nuxt.config.hbs', dest: path.join(nuxtPath, 'nuxt.config.js'), isTemplate: true },
      { src: 'nuxt/nuxt.package.hbs', dest: path.join(this.targetPath, 'package.json'), isTemplate: true },
      { src: 'express/express.package.hbs', dest: path.join(expressPath, 'package.json'), isTemplate: true },
      ...(this.config.useDocker ? [
        { src: 'Dockerfile.hbs', dest: 'Dockerfile', isTemplate: true },
        { src: 'docker-compose.yml.hbs', dest: 'docker-compose.yml', isTemplate: true },
      ] : []),
    ]

    // Add Nuxt and Express files to the list
    const nuxtFiles = await this.getFilesRecursively(path.join('templates', 'nuxt'))
    this.addFilesToProcess(nuxtFiles, filesToProcess, nuxtPath, 'nuxt')
    
    const expressFiles = await this.getFilesRecursively(path.join('templates', 'express'))
    this.addFilesToProcess(expressFiles, filesToProcess, expressPath, 'express')

    return filesToProcess
  }

  /**
   * Adds files to the processing list, adjusting paths and determining if they are templates.
   * @param {string[]} filePaths - Array of file paths to process.
   * @param {Object[]} filesToProcess - Array of file objects that are being processed.
   * @param {string} basePath - Base path for the files.
   * @param {string} prefix - Prefix to prepend to file paths.
   */
  addFilesToProcess(filePaths, filesToProcess, basePath, prefix) {
    for (const filePath of filePaths) {
      const fullFilePath = `${prefix}/${filePath}`
      const index = filesToProcess.findIndex(f => f.src === fullFilePath)
      if (index > -1) continue
      const isTemplate = filePath.endsWith('.hbs')
      const dest = path.join(basePath, !isTemplate ? filePath : filePath.slice(0, -4))
      filesToProcess.push({ src: fullFilePath, dest, isTemplate })
    }
  }

  /**
   * Installs dependencies in the appropriate directories (client/server or src).
   */
  async installDependencies() {
    if (this.config.decoupled) {
      spinnies.update('spinner', { text: `Installing client dependencies...` })
      await this.runNpmInstall(path.join(this.targetPath, 'client'))
      spinnies.update('spinner', { text: `Installing server dependencies...` })
      await this.runNpmInstall(path.join(this.targetPath, 'server'))
    } else {
      spinnies.update('spinner', { text: `Installing dependencies...` })
      await this.runNpmInstall(path.join(this.targetPath, 'src'))
    }
  }

  /**
   * Runs npm install in the specified directory.
   * @param {string} directory - The directory to run npm install in.
   * @returns {Promise<void>} - A promise that resolves when the installation is complete.
   */
  runNpmInstall(directory) {
    return new Promise((resolve, reject) => {
      const install = spawn('npm', ['install'], { cwd: directory, stdio: 'ignore' })
      install.on('close', code => {
        if (code === 0) {
          resolve()
        } else {
          reject(`npm install failed with code ${code}`)
        }
      })
    })
  }

  /**
   * Cleans up resources by removing the scaffolding target directory in case of errors.
   */
  async cleanupResources() {
    try {
      await promisify(fs.rm)(this.targetPath, { recursive: true, force: true })
      console.log('Cleaned up incomplete project files.')
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError)
    }
  }
}

module.exports = Scaffolder
