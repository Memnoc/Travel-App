# Travel App

The goal of this repo is be an example of a basic but functional app built on Express and Webpack.

If you want to follow along, start from branch 0-initial-setup. Each branch in this project is a step along the path to creating a fully functional webpack setup. In each branch, there will be a documentation file that lists out the steps taken in that branch (each step is also roughly a git commit if you look at the history) which you can use as a checklist when setting up your own projects. 

## What we will cover

We will cover:

- Webpack entry point
- Webpack output and dist folder
- Webpack Loaders
- Webpack Plugins
- Webpack Mode
- Tools for convenient Webpack development

## Get Up and Running

Fork this repo, then clone the branch of your choice from your forked repo down to your computer:

```
git clone -- git@github.com:[your-user-name]/webpack-express.git --
```

`cd` into your new folder and run:
- ```npm install```
- ```npm start``` to start the app
- this app runs on localhost:8080, but you can of course edit that in server.js

## What is this tool?

> This tool allows you to extract sentiment, classification and entity data from any given article or text (e.g. comments, tweets, documents, articles, etc.).
> The tool is powered by a third party API called Alyen API (check the credit section for more info).

![alt text](https://i.imgur.com/siTK5Fi.png)
![alt text](https://i.imgur.com/tWGaZUF.png)


## How do I install it?

1. Clone this repo

2. cd into your local cloned repo:

`npm install or yarn install`

3. Create a new .env file and containing the following environment variables for the Aylien API:

`API_ID`
`API_KEY`

4. Run: `npm run dev or yarn run dev`

5. Open another terminal and run:

`npm start or yarn start to start your nodejs server`

## How do I use it?

1. Enter the date of tomorrow (MUST BE the next day date because of ASPI limitations)

2. Enter a location (i.e. city name)

3. Click the floating button (bottom-right corner):

4. Additionally, click on Country Info button for information about the country


# Credits

GEONAMES API

 - The [GEONAMES API](http://www.geonames.org/export/web-services.html) free weather API service.
 - The [WEATHERBIT API](https://www.weatherbit.io/api) free weather API service.
 - The [RESTCOUNTRIES](https://restcountries.eu/) free geo-location API service.
 - The [PIXABAY API](https://pixabay.com/api/docs/) free images API service.

 # License

 This repo is open source software [licensed as MIT](https://github.com/Memnoc/Travel-App/blob/master/LICENSE).