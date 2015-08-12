# [WIP] FrontEnd Development Environment for ME!

🚧👷 WIP 👷🚧

brand new my frontend dev env.

## Requirements
Install some middlewares.

* Ruby (>=2.0)
* gem (>=2.0) `gem update --system`
* Ruby Sass (>=3.4) `sudo gem install sass`
* Nodejs w/npm (>= 0.12.6)
* Bower `npm install -g bower`
* gulp `npm install -g gulp`

## Install

Install dependencies.

```sh
$ npm install
```
```sh
$ bower install
```

### npm or bower
We are using a two package management system. But basically is to use the npm.
If there is no package to npm, it will use the bower.

## Usage

### local
```sh
$ npm run local
```
To launch local server, `app` and ` .tmp` as the root directory.

### product(dist)
```sh
$ npm run build
```
To launch local server, `dist` as the root directory.

### unit test
```sh
$ npm run test
```
To launch local server, `test` as the root directory.
