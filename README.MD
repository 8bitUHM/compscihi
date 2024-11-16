# 8bitUHM CompSciHi

1. [Project Structure](#project-structure)
2. [Getting the app running](#getting-the-app-running)
3. [Development](#development)

## Project Structure

The project is organized into several components:

- **compscihi**: The main project directory.
  - **.github/**: GitHub actions CI/CD for deployment automations
  - **api/**: API app
    - **migrations/**: Database migration files.
    - **templates/**: HTML templates.
    - **admin.py**: Admin interface configuration.
    - **forms.py**: HTML forms. Forms define how data is input and validated by the user.
    - **models.py**: Data models. Models define the structure of the database and interact with data.
    - **serializers.py**: Serializers for converting complex data types, such as querysets and model instances, to native Python datatypes that can then be easily rendered into JSON, XML, or other content types.
    - **tests.py**: Unit tests.
    - **urls.py**: URL configuration for the portal app, mapping URLs to views.
    - **views.py**: View functions or classes. Views handle HTTP requests and return HTTP responses.
  - **core/**: Main or 'host' app
    - **settings.py**: Configuration settings for the project, including database settings, middleware, installed apps, and other project-specific configurations. Models are defined here.
    - **urls.py**: URL configuration for the project, mapping URLs to views.
  - **db_file_storage/**: File storage systems that allows us to store files by raw bytes and mimetype in database.
  - **portal/**: Portal app
    - **migrations/**: Database migration files.
    - **static/**: Static files (CSS, JavaScript, images).
    - **templates/**: HTML templates.
    - **admin.py**: Admin interface configuration.
    - **forms.py**: HTML forms. Forms define how data is input and validated by the user.
    - **models.py**: Data models. Models define the structure of the database and interact with data.
    - **serializers.py**: Serializers for converting complex data types, such as querysets and model instances, to native Python datatypes that can then be easily rendered into JSON, XML, or other content types.
    - **tests.py**: Unit tests.
    - **urls.py**: URL configuration for the portal app, mapping URLs to views.
    - **views.py**: View functions or classes. Views handle HTTP requests and return HTTP responses.
  - **website/**: Website app
    - **frontend/**: Database migration files.
      - **src/**: Frontend source files
        - **assets/**: Frontend static assets
        - **compiled-components/**: Frontend ompiled components -- own components on Django templates
        - **components/**: Frontend components -- not separate components on Django templates
        - **firebase/**: Firebase config
        - **pages/**: Frontend pages
        - **styles/**: Tailwind styles config files
        - **types/**: Types for image imports
        - **util/**: Utility function files
      - **webpack/**: Webpack config files
    - **migrations/**: Database migration files.
    - **static/**: Static files (CSS, JavaScript, images).
    - **templates/**: HTML templates.
    - **admin.py**: Admin interface configuration.
    - **models.py**: Data models. Models define the structure of the database and interact with data.
    - **tests.py**: Unit tests.
    - **urls.py**: URL configuration for the portal app, mapping URLs to views.
    - **views.py**: View functions or classes. Views handle HTTP requests and return HTTP responses.
  - **manage.py**: Django's command-line utility for administrative tasks.
  - **manage.py**: Django's command-line utility for administrative tasks.
  - **requirements.txt**: Txt file that holds all of the projects dependencies.
  - **public**: Built frontend from client client folder to push to deploy

## Getting the app running

1. In the /core directory, create a .env file with the contents from the compscihi discord channel
2. Also in the /core directory, create a local_settings.py with the following
```
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG=True

DATABASES = {
  "default":{
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / 'db.sqlite3',
  }
}
```
3. Run ```pip install -r requirements.txt``` in root directory to install Python related dependencies
4. CD into directory /theme/static_src and run ```npm install```
5. CD into directory /website/frontend and run ```npm install```
6. Back in root directory, run ```npm install``` for global dev scripts
7. Run ```python manage.py collectstatic``` to collect all static
8. Start the app with ```npm run dev``` or ```npm run dev3```, the app should be running locally on port 8000, http://127.0.0.1:8000/

## Visualizations

### CompSciHi Architecture Visualization

![Architecture-visual](/visualizations/compscihi-visual-v1.png)

### CompSciHi Opportunity Page Data Fetching Visualization

![Opportunity-page-fetching-visual](/visualizations/compschihi-opportunity-page-visual-v1.png)


