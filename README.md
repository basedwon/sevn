![SEVN Stack Logo](docs/sevn.png "SEVN Stack")

# SEVN Stack

> Sails (inspired) Express Vuetify Nuxt

[![npm](https://img.shields.io/npm/v/sevnstack?style=flat&logo=npm)](https://www.npmjs.com/package/sevnstack)
[![pipeline](https://gitlab.com/frenware/utils/sevn/badges/master/pipeline.svg)](https://gitlab.com/frenware/utils/sevn/-/pipelines)
[![license](https://img.shields.io/npm/l/sevnstack)](https://gitlab.com/frenware/utils/sevn/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/sevnstack)](https://www.npmjs.com/package/sevnstack) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/utils/sevn)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/sevn)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

SevnStack is a powerful CLI tool designed to streamline the process of creating full-stack web applications, combining Nuxt/Vuetify on the frontend with Express on the backend. It simplifies the development workflow, offering choices for monolithic or decoupled architectures, along with features like authentication and WebSockets, and options for SSR or static rendering in Nuxt. Additionally, SevnStack handles project builds and assists with deployment processes, and includes the option to integrate Docker and docker-compose, accommodating a diverse range of development needs.

## Features

- **Flexible Architectures**: Choose between monolithic and decoupled architectures.
- **Frontend and Backend Integration**: Easily integrate Nuxt/Vuetify for the frontend and Express for the backend.
- **Server-Side Rendering and Static Generation**: Opt for SSR or static generation with Nuxt.
- **Additional Features**: Incorporate features like authentication, WebSockets, and PWA support.
- **Docker Support**: Optionally include Docker configuration for containerized development.
- **HTTPS Support**: Option to use TLS (HTTPS) for secure transport.

## Installation

Install SevnStack globally via npm:

```sh
npm install -g sevnstack
```

## Usage

### Creating a New Project

To create a new full-stack web application:

```sh
sevn create <app-name> [options]
```

**Options:**

- `-f, --force`: Force creation with the default configuration
- `-m, --monolithic`: Use a monolithic architecture
- `-d, --decoupled`: Use a decoupled architecture
- `-s, --ssr`: Use Server-Side Rendering with Nuxt
- `-S, --static`: Use Static Generation with Nuxt
- `-D, --docker`: Include Docker configuration
- `-t, --tls`: Use TLS (HTTPS) for transport protocol

### Initializing a Project in an Existing Directory

```sh
sevn init [directory] [-y, --yes]
```

### Adding Features to an Existing Project

```sh
sevn add-feature [--auth] [--ws, --websockets] [--pwa]
```

### Updating Project Dependencies

```sh
sevn update
```

### Building the Project for Production

```sh
sevn build [--minify]
```

### Starting the Development Server

```sh
sevn start [--port <port>]
```

### Assisting with Deployment Processes

```sh
sevn deploy [--prod] [--staging]
```

## Documentation

- [API Reference](/docs/api.md)

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```sh
git clone https://github.com/basedwon/sevn.git
cd sevn
npm install
```

To run the tests:

```sh
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

sevnstack is [MIT licensed](https://gitlab.com/frenware/utils/sevn/-/blob/master/LICENSE).

