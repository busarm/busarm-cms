# CMS by AdminJS

- Based on AdminJS framework (https://adminjs.co)
- AdminJS frontend is based on ReactJs

# Structure

- `/admin/services` - Application services
- `/admin/helpers` - Helpers for specific action
- `/admin/components` - Store all ReactJs components to be used globally
  - `/components/page` - Store AdminJS page components. E.g User List page
  - `/components/props` - Store AdminJS property components. E.g User email property
  - `/components/utils` - Store AdminJS general utilities components
- `/admin/resources` - Store all AdminJS resources. Recources denotes pages or features.
  - `/resources/<resource>` - This corresponse to either Collections or Tables in the db or Pages
  - `/resources/<resource>/components` - Store local ReactJs components belonging to this resource only
  - `/resources/<resource>/index.ts` - Defines AdminJS Resource configuration
- `/admin/global.ts` - Defines Global utilities and configs
- `/admin/resource.ts` - Defines Default AdminJS resource & navigation configs
- `/admin/permissions.ts` - Defines System Permissions
- `/admin/index.ts` - Setup AdminJS
- `/bootstrap` - Files needed to setup application
- `/configs` - Application configurations
- `/models` - Database models
- `/public` - Publicly accessible resources
- `/scripts` - Custom scripts for specific actions
- `server.ts` - Initialize server
- `.env.json` - Default environment vars to be copied to `.env`
- `.env.stg.json` - Default Staging environment vars to be copied to `.env`
- `.env.prod.json` - Default production environment vars to be copied to `.env`

# Set up

```bash
# install packages
$ npm install

# sync env to generate .env file
$ npm run sync:env
```

- Set the environment variable `ADMIN_DEFAULT_USERNAME` in the '.env' file. e.g `ADMIN_DEFAULT_USERNAME="blahblah1"`
- Set the environment variable `ADMIN_DEFAULT_PASSWORD` in the '.env' file. e.g `DEFAULT_ADMIN_PASSWORD="blah12345!"`
- Set the environment variable `SESSION_SECRET` in the '.env' file. Random key of about 512 bits or 64 bytes
- Set Database Credentials (`DB_*`) in `.env` file.
- Set Other values in `.env` file.

# Start - Development

- Run `npm run start`

# Deployment With Code Deploy (Production / Staging)

- Set up EC2
  - Create **EC2 Deploy Service Role** for EC2
    - Add Read **Secret Manager permission** to EC2 Service Role - to get application secrets
    - Add Read & Put **S3 permission** to EC2 Service Role - to download application data
    - Add other permissions needed for the app
  - If not using Auto Scaling Groups, add **Custom Code Deploy Tag** to EC2 Tags - to be use in Code Deploy Deployment Group
  - Install **Code deploy agent** in EC2 - to interact with AWS Code Deploy. (https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install.html)
    - Using SSM - Add **System Manager permissions** to EC2 Service Role
- Create Code Deploy Application
  - Add Deployment Group
    - If not using Auto Scaling Groups, deploy to instances with the specified tags, else deploy to auto scaling group
  - Create **Code Deploy Service Role** for Deployment Group
    - Add **EC2 Full access permmission**
    - Add Read **Secret Manager permission** to EC2 Service Role - to get application secrets
    - Add Read & Put **S3 permission** to EC2 Service Role - to download application data
- Set up AWS CICD Pipeline
  - Source - GIT HUB or Any
  - Build - Code build
  - Deploy - Code deploy
