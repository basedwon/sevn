// npm install --save-dev mocha chai sinon

const { expect } = require('chai')
const sinon = require('sinon')
const fs = require('fs')
const { promisify } = require('util')
const { Scaffolder } = require('../path/to/Scaffolder')

describe('Scaffolder', () => {
  let scaffolder, config, stubs = {}

  beforeEach(() => {
    config = { /* Mock configuration */ }
    scaffolder = new Scaffolder(config)

    // Stubbing external dependencies
    stubs.mkdir = sinon.stub(fs, 'mkdir').returns(Promise.resolve())
    stubs.readdir = sinon.stub(fs, 'readdir').returns(Promise.resolve([]))
    stubs.readFile = sinon.stub(fs, 'readFile').returns(Promise.resolve(''))
    stubs.writeFile = sinon.stub(fs, 'writeFile').returns(Promise.resolve())
    stubs.copyFile = sinon.stub(fs, 'copyFile').returns(Promise.resolve())
    stubs.rm = sinon.stub(fs, 'rm').returns(Promise.resolve())
  })

  afterEach(() => {
    // Restore original functions
    sinon.restore()
  })

  describe('createDirectories', () => {
    it('should create directories based on the configuration', async () => {
      await scaffolder.createDirectories()
      expect(stubs.mkdir.called).to.be.true
      // Additional assertions based on directory paths and calls
    })
  })

  describe('processFiles', () => {
    it('should process files for scaffolding', async () => {
      // Setup mock return for prepareFilesToProcess
      sinon.stub(scaffolder, 'prepareFilesToProcess').returns(Promise.resolve([]))
      
      await scaffolder.processFiles()
      // Assertions to check if files are processed (read, written, copied)
    })
  })

  describe('installDependencies', () => {
    it('should install dependencies', async () => {
      // Mock runNpmInstall to avoid actual npm install
      sinon.stub(scaffolder, 'runNpmInstall').returns(Promise.resolve())

      await scaffolder.installDependencies()
      expect(scaffolder.runNpmInstall.called).to.be.true
      // Additional assertions based on the config and number of installs
    })
  })

  describe('cleanupResources', () => {
    it('should clean up resources in case of an error', async () => {
      await scaffolder.cleanupResources()
      expect(stubs.rm.called).to.be.true
      // Check if the correct path is being cleaned up
    })
  })

  // Additional tests for other methods like getFilesRecursively, addFilesToProcess, etc.
})


async function test() {
  const config = {
    architecture: 'decoupled',
    rendering: 'static',
    features: ['authentication', 'websockets', 'pwa', 'robots', 'sitemap'],
    useDocker: true,
    siteName: 'Example',
    siteSubtitle: '',
    description: '',
    domain: 'example.com',
    frontendDomain: 'localhost:7777',
    backendDomain: 'localhost:7779',
    protocol: 'https',
    // to add to cli:
    themeColor: '#000000',
    tileColor: '#2b5797',
    repopath: '',
  }
  const scaffolder = new Scaffolder(config)
  await scaffolder.execute()
  // log(scaffolder)
  // log(clc.greenBright.underline('Starting project scaffolding...\n'))
  // await scaffoldProject(config)
}

// _.executor(test)

