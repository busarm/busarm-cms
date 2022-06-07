# CMS by AdminJS

-   Based on AdminJS framework (https://adminjs.co)
-   AdminJS frontend is based on ReactJs

# Structure

-   `/admin/components` - Store all ReactJs components to be used globally
    -   `/components/page` - Store AdminJS page components. E.g User List page
    -   `/components/props` - Store AdminJS property components. E.g User email property
    -   `/components/utils` - Store AdminJS general utilities components
-   `/admin/resources` - Store all AdminJS resources. Recources denotes pages or features.
    -   `/resources/<resource>` - This corresponse to either Collections or Tables in the db or Pages
    -   `/resources/<resource>/components` - Store local ReactJs components belonging to this resource only
    -   `/resources/<resource>/index.ts` - Defines AdminJS Resource configuration
-   `/admin/global.ts` - Defines Global utilities and configs
-   `/admin/resource.ts` - Defines Default AdminJS resource & navigation configs
-   `/admin/permissions.ts` - Defines System Permissions
-   `/admin/index.ts` - Setup AdminJS
-   `/configs` - Application configurations
-   `/models` - Database models
-   `/public` - Public downloadabe resources
-   `/scripts` - Custom scripts for specific actions
-   `/services` - Application services
-   `server.ts` - Initialize server
-   `.env.example` - Sample environment vars to be copied to `.env`

# Set up

```bash
# install packages
$ npm install

# create env file
$ cp .env.example .env
```

-   Set the environment variable `ADMIN_DEFAULT_USERNAME` in the '.env' file. e.g `ADMIN_DEFAULT_USERNAME="blahblah1"`
-   Set the environment variable `ADMIN_DEFAULT_PASSWORD` in the '.env' file. e.g `DEFAULT_ADMIN_PASSWORD="blah12345!"`
-   Set the environment variable `SESSION_SECRET` in the '.env' file. Random key of about 512 bits or 64 bytes
-   Set Database Credentials in `.env` file.
-   Set Other values in `.env` file.

# Start - Development

-   Run `npm run start-dev`
