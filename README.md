# Punchy
## About this project
* Website: [https://punchy.ikindness.cn](https://punchy.ikindness.cn)
* UI(todo): `Sketch`
* JavaScript: `ECMAScript *`
* Main front side frameworks:
	1. `React ^16`
	2. `React-Router ^4`
	3. `Redux ^3`
	4. `React-Redux`
	5. `React-Router-Redux`
* Bundler: `Webpack ^3`
* Main server side frameworks:
	1. `Node.js ^8`
	2. `Koa ^2`
	3. `Sequelize ^4`
* Proxy server: `Nginx ^1.13`
* Database: `MySQL ^5.7`
* Static resource: `AliOSS`
* Lint: `ESLint ^4`
* Test(doing): `Mocha ^3`

## Workflow

### Development

* start a development server

```sh
yarn start:dev
```

* start webpack

```sh
cd ./front && yarn run build:dev
```

* git adding

```sh
yarn git:add
```

### production

* start a production server

1. as a temporary server

```sh
yarn start:pro
```

2. as an online server

```sh
pm2 --name auth start yarn -- start:pro
```

* build for production

```sh
cd ./front && yarn run build:pro
```

## UI standard

### icons

Designing is based on Apple 6 (375 * 667), others scaled from it.

type | size | description
-- | -- | --
big | 30 * 30 | icons in Footer component
medium-big | 25 * 25
medium | 20 * 20 | icons in Header, ArticleSection component and footer of page article/Detail
small | 15 * 15 | icons in ArticleSection component and footer of page article/Edit

### colors

1. black & gray 
	* #333 (font-color)
	* #666 (font-color)
	* #999 (font-color)
	* #ccc (font-color)
	* #e3e3e3 (border-color)
	* #f3f3f3 (background-color)
2. blue
	* #e39efe (font-color, background-color)

## Development standard

### names standard

1. sperator case names
	* css class names
2. lodash case names
	* interface queries
	* database columns
	* file names
3. camel case names
	* js variables, constants
4. uppercase names
	* configurable constants