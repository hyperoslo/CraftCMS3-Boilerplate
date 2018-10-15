# CraftCMS3 Boilerplate

This is a CraftCMS3 boilerplate with Webpack 4 and ready to be deployed to Heroku.

It already has Babel and Stylus support for transpiling your JavaScript code and compiling your styling files. Also your styling files are autoprefixed and minified by default.

## Running on Localhost

First clone or download this repository to your computer. You can use [MAMP](https://www.mamp.info/en/downloads/) to run an Apache and MySQL servers on your localhost.

Once you installed the MAMP, go to `Preferences > Web Server` tab and select the `/web` folder of the CraftCMS3 project for _Document Root_ field.

<img width="629" alt="screen shot 2018-08-26 at 18 07 45" src="https://user-images.githubusercontent.com/22943912/44629643-0113e800-a95b-11e8-824f-60bf79a8b3ad.png">

Start the MAMP server and then visit the [phpMyAdmid](http://localhost:8888/phpMyAdmin/?lang=en) page to create a new database.

Now create a new `.env` file in the project folder and copy the content of `.env.example` file into it.

Assign a random `SECURITY_KEY` for hashing and edit `JAWSDB_MARIA_URL` in accordance with your MySQL information.

On MAMP the default username and password for MySQL are both `root` and port is `8889`.

    mysql://root:root@localhost:8889/YOUR_DB_NAME

Last thing is installing the dependencies.
You need [NodeJS](https://nodejs.org/en/) and [Composer](https://getcomposer.org) installed on you computer.

> _Side Note: Using [Brew](https://brew.sh) might come in handy to install __Composer__ on a OSX machine._

Once you have both NodeJS and Composer installed on your computer, change directory to project folder in Terminal and run the following commands in order to fetch the required modules.

    % composer install
    % npm install

After everything is installed, you can run:

    % npm run watch

This starts the _webpack-dev-server_. It proxies port `8888` to `8080` and opens a new browser window automatically. Note that you should edit `webpack.config.js` file accordingly if you are using a different port other than `8888` for MAMP.

Now you can visit `localhost:8080/admin/install` in your browser to install your CraftCMS.

## Deploying to Heroku

Create a new Heroku app and then install `JawsDB Maria - Kitefin Shared` add-on for database purposes.
Go to your app settings and set the following config vars.

    ENVIRONMENT: dev
    SECURITY_KEY: YOUR_RANDOM_SECURITY_KEY_FOR_HASHING

You should also see `JAWSDB_MARIA_URL` var created on its own. This passes your database information to CraftCMS.

<img width="827" alt="screen shot 2018-08-26 at 22 31 34" src="https://user-images.githubusercontent.com/22943912/44632284-88c01d80-a980-11e8-8a25-361a12215663.png">

In the settings again, go to _Buildpacks_ section and add `heroku/php` and `heroku/nodejs` buildpacks. You should also add a third party buildpack for _MySQL_, which is required for database backups and migration manager plugin consequently.

`https://github.com/Shopify/heroku-buildpack-mysql`

<img width="815" alt="screen shot 2018-08-27 at 14 14 23" src="https://user-images.githubusercontent.com/22943912/44656930-8ce14f00-aa03-11e8-8d2b-493a94ab08a9.png">


Now you can go to _Deploy_ tab on Heroku and follow the instructions to deploy this repository.

## Assets

#### Scripts and Styling Files

Webpack bundles all your JavaScript and Styling files imported in `/src/index.js`.

Example content for `index.js`:

    import './assets/styles/global.styl'
    import './assets/scripts/global.js'

The bundled outputs are created inside the `/web` folder as `bundle.js` and `main.css`.

You should include these files between `<head></head>` tags of your main `twig` template file.

    {% do view.registerCssFile("/main.css") %}
    {% do view.registerJsFile("/bundle.js") %}


> _Side Note: Separating CSS from bundle.js is a better practice in order not to have late loading styling problems._

If you only want to create the `bundle.js` and `main.css` files, you should run the following commands in Terminal for production and development respectively.

    % npm run dev
      or
    % npm run build

#### Image Files

Webpack is configured to move your image files inside `/src/assets/images` folder to `/web/images` folder automatically.

You can then include an image in a template as follows:

    <img src="/images/foo.svg">
