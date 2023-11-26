## Classes

<dl>
<dt><a href="#SevnStackCLI">SevnStackCLI</a></dt>
<dd><p>The SevnStackCLI class manages the command-line interface for the SevnStack application.
It sets up commands, handles user input, and invokes the appropriate actions.</p>
</dd>
<dt><a href="#Scaffolder">Scaffolder</a></dt>
<dd><p>Class representing the scaffolder for SevnStack projects. This class
handles the process of setting up the project structure, processing templates,
and installing dependencies.</p>
</dd>
</dl>

<a name="SevnStackCLI"></a>

## SevnStackCLI
The SevnStackCLI class manages the command-line interface for the SevnStack application.
It sets up commands, handles user input, and invokes the appropriate actions.

**Kind**: global class  

* [SevnStackCLI](#SevnStackCLI)
    * [new SevnStackCLI()](#new_SevnStackCLI_new)
    * _instance_
        * [.setupCommands()](#SevnStackCLI+setupCommands)
        * [.findQuestion(name)](#SevnStackCLI+findQuestion) ⇒ <code>object</code>
        * [.commandCreate(appName, options)](#SevnStackCLI+commandCreate) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.commandInit()](#SevnStackCLI+commandInit)
        * [.commandAddFeature()](#SevnStackCLI+commandAddFeature)
        * [.commandUpdate()](#SevnStackCLI+commandUpdate)
        * [.commandBuild()](#SevnStackCLI+commandBuild)
        * [.commandStart()](#SevnStackCLI+commandStart)
        * [.commandDeploy()](#SevnStackCLI+commandDeploy)
        * [.scaffold(config)](#SevnStackCLI+scaffold) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getDefaults(appName, options)](#SevnStackCLI+getDefaults) ⇒ <code>Promise.&lt;object&gt;</code>
        * [.execute()](#SevnStackCLI+execute) ⇒ <code>void</code>
    * _static_
        * [.execute()](#SevnStackCLI.execute) ⇒ <code>void</code>

<a name="new_SevnStackCLI_new"></a>

### new SevnStackCLI()
Constructs the CLI application and sets up the commands.

<a name="SevnStackCLI+setupCommands"></a>

### sevnStackCLI.setupCommands()
Sets up CLI commands and their corresponding actions.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+findQuestion"></a>

### sevnStackCLI.findQuestion(name) ⇒ <code>object</code>
Finds a question by its name from the predefined list of questions.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
**Returns**: <code>object</code> - The found question object.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the question to find. |

<a name="SevnStackCLI+commandCreate"></a>

### sevnStackCLI.commandCreate(appName, options) ⇒ <code>Promise.&lt;void&gt;</code>
Handles the 'create' command to scaffold a new full-stack web application.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>string</code> | The name of the application to create. |
| options | <code>object</code> | Command-line options provided by the user. |

<a name="SevnStackCLI+commandInit"></a>

### sevnStackCLI.commandInit()
Initializes a new project in an existing directory.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+commandAddFeature"></a>

### sevnStackCLI.commandAddFeature()
Adds new features to an existing project.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+commandUpdate"></a>

### sevnStackCLI.commandUpdate()
Updates the project dependencies or migrates to a newer version.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+commandBuild"></a>

### sevnStackCLI.commandBuild()
Builds the project for production deployment.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+commandStart"></a>

### sevnStackCLI.commandStart()
Starts the development server for the project.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+commandDeploy"></a>

### sevnStackCLI.commandDeploy()
Assists with the deployment of the project to different environments.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI+scaffold"></a>

### sevnStackCLI.scaffold(config) ⇒ <code>Promise.&lt;void&gt;</code>
Scaffolds the project based on the provided configuration.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The configuration for scaffolding the project. |

<a name="SevnStackCLI+getDefaults"></a>

### sevnStackCLI.getDefaults(appName, options) ⇒ <code>Promise.&lt;object&gt;</code>
Gets the default configuration for the project based on provided options.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The default configuration object.  

| Param | Type | Description |
| --- | --- | --- |
| appName | <code>string</code> | The name of the application. |
| options | <code>object</code> | Command-line options provided by the user. |

<a name="SevnStackCLI+execute"></a>

### sevnStackCLI.execute() ⇒ <code>void</code>
Parses the command-line arguments and executes the corresponding command.
This method triggers the action bound to the command entered by the user.

**Kind**: instance method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="SevnStackCLI.execute"></a>

### SevnStackCLI.execute() ⇒ <code>void</code>
Static method to create an instance of SevnStackCLI and execute it.
This is the entry point for running the CLI from an external caller.

**Kind**: static method of [<code>SevnStackCLI</code>](#SevnStackCLI)  
<a name="Scaffolder"></a>

## Scaffolder
Class representing the scaffolder for SevnStack projects. This class
handles the process of setting up the project structure, processing templates,
and installing dependencies.

**Kind**: global class  

* [Scaffolder](#Scaffolder)
    * [new Scaffolder(config)](#new_Scaffolder_new)
    * [.prepareConfig()](#Scaffolder+prepareConfig)
    * [.getFilesRecursively(dir, [baseDir])](#Scaffolder+getFilesRecursively) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.execute()](#Scaffolder+execute)
    * [.createDirectories()](#Scaffolder+createDirectories)
    * [.processFiles()](#Scaffolder+processFiles)
    * [.prepareFilesToProcess()](#Scaffolder+prepareFilesToProcess) ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
    * [.addFilesToProcess(filePaths, filesToProcess, basePath, prefix)](#Scaffolder+addFilesToProcess)
    * [.installDependencies()](#Scaffolder+installDependencies)
    * [.runNpmInstall(directory)](#Scaffolder+runNpmInstall) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.cleanupResources()](#Scaffolder+cleanupResources)

<a name="new_Scaffolder_new"></a>

### new Scaffolder(config)
Create a Scaffolder.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | The configuration object for scaffolding. |

<a name="Scaffolder+prepareConfig"></a>

### scaffolder.prepareConfig()
Prepares the configuration object by modifying and adding necessary properties.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
<a name="Scaffolder+getFilesRecursively"></a>

### scaffolder.getFilesRecursively(dir, [baseDir]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Recursively retrieves files from a directory.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - - A promise that resolves to an array of file paths.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dir | <code>string</code> |  | The directory to search in. |
| [baseDir] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The base directory path for recursion. |

<a name="Scaffolder+execute"></a>

### scaffolder.execute()
Executes the entire scaffolding process.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
<a name="Scaffolder+createDirectories"></a>

### scaffolder.createDirectories()
Creates necessary directories for the project based on its configuration.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
<a name="Scaffolder+processFiles"></a>

### scaffolder.processFiles()
Processes and prepares files for scaffolding - includes handling templates and static files.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
<a name="Scaffolder+prepareFilesToProcess"></a>

### scaffolder.prepareFilesToProcess() ⇒ <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code>
Prepares the list of files to be processed for scaffolding.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
**Returns**: <code>Promise.&lt;Array.&lt;Object&gt;&gt;</code> - - A promise that resolves to an array of file objects to process.  
<a name="Scaffolder+addFilesToProcess"></a>

### scaffolder.addFilesToProcess(filePaths, filesToProcess, basePath, prefix)
Adds files to the processing list, adjusting paths and determining if they are templates.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  

| Param | Type | Description |
| --- | --- | --- |
| filePaths | <code>Array.&lt;string&gt;</code> | Array of file paths to process. |
| filesToProcess | <code>Array.&lt;Object&gt;</code> | Array of file objects that are being processed. |
| basePath | <code>string</code> | Base path for the files. |
| prefix | <code>string</code> | Prefix to prepend to file paths. |

<a name="Scaffolder+installDependencies"></a>

### scaffolder.installDependencies()
Installs dependencies in the appropriate directories (client/server or src).

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
<a name="Scaffolder+runNpmInstall"></a>

### scaffolder.runNpmInstall(directory) ⇒ <code>Promise.&lt;void&gt;</code>
Runs npm install in the specified directory.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
**Returns**: <code>Promise.&lt;void&gt;</code> - - A promise that resolves when the installation is complete.  

| Param | Type | Description |
| --- | --- | --- |
| directory | <code>string</code> | The directory to run npm install in. |

<a name="Scaffolder+cleanupResources"></a>

### scaffolder.cleanupResources()
Cleans up resources by removing the scaffolding target directory in case of errors.

**Kind**: instance method of [<code>Scaffolder</code>](#Scaffolder)  
