# Project Title

An angular interpretation of the WoW Api. 
Create a personal armory for your guild.

## Demo

[DEMO of project](http://wow.theaxe.men)

## Getting Started

These instructions will get you started - and get the project up and running.

If you don't have node, bower, npm or gulp - first install node.js on your computer.

### Installing needed dependencies

```
npm install npm -g
```

then 

```
npm install -g bower
```
finally

```
npm install --global gulp-cli
```
### Installing

Register for an API key @ [https://dev.battle.net/member/register](https://dev.battle.net/member/register)
Copy your API key into the apikey variable, in settings.js.

Use bower to get the required libraries.

```
bower install
```

Then install the npm dependencies

```
npm install
```

Remember to edit the settings.js file before running gulp.
Then run gulp to create the dist folder (you can upload these to your server).

```
gulp
```

Also remember to run gulp every time you have changed a file so it compiles it to dist.

## PHP Scripts

The project contains a php script for caching data to disk (to take the load off the wowapi, and store a local copy).

```
/php/saveJson.php
```

It saves its files to /json/ so this folder needs the rights to store files.

```
/json/
```

## Deployment

Run gulp to deploy the project

```
gulp
```

It will create a /dist/ folder with the uploadable content.

## Built With

* Visual Studio code

## Authors

This is my first ever GIT, and first try with gulp/bower/npm - hopefully I got it right :)

* **Dag Thomas Olsen** - *Initial work* - [dagthomas](https://github.com/dagthomas)

## Shoutouts

* **Eric Taylor** - *Mythic skull, loading* - [elementsaside](www.elementsaside.com)

## License

This project is licensed under the MIT License
