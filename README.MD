# 8bitUHM CompSciHi

1. [Project Structure](#project-structure)
2. [Getting the app running](#getting-the-app-running)
3. [Development](#development)

## Project Structure

The project is organized into several components:

- **compscihi**: The main project directory.
  - **.github/**: GitHub actions CI/CD for deployment automations
  - **client**: CompSciHi frontend source code
    - **src/**: Source code folder
      - **components/**: Website components
      - **pages/**: Website pages
      - **firebase/**: Firebase config files
      - **styles/**: Tailwind styles
      - **types/**: Import type definitions
    - **webpack/**: Webpack configuration files
  - **server**: Django server
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
    - **manage.py**: Django's command-line utility for administrative tasks.
    - **requirements.txt**: Txt file that holds all of the projects dependencies.
    - **public**: Built frontend from client client folder to push to deploy

## Getting the app running

### Client/Frontend
1. Run ```npm install``` to install dependencies
2. Run  ```npm run dev``` to start development mode which should give you a local link to view the app
3. Using VSCode live server extension, open the index.html file in the admin folder with live server

### Django Server

1. In a new terminal run `pip install -r requirements.txt` or `pip3 install -r requirements.txt`
2. in ./core folder, create a new file called local_settings.py and add

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
3. In ./core folder, create a new file called .env and add the environment variables from our project discord channel compscihi

4. Cd into theme/static_src and run `npm install`

5. Start tailwind styling compilation by running `python manage.py tailwind start` or `python manage.py tailwind build` to build once

6. Collect all static files with `python manage.py collectstatic`

7. Update your local database by running `python manage.py migrate`

8. Create a superuser for you to log into admin portal with `python manage.py createsuperuser`

9. Run `python manage.py create_fake_opportunity_data` to create 100 fake opportunities

10. Start the app by running `python manage.py runserver` in terminal, the app should be running locally on port 8000, http://127.0.0.1:8000/

## Visualizations

### CompSciHi Architecture Visualization

![Architecture-visual](/visualizations/compscihi-visual-v1.png)

### CompSciHi Opportunity Page Data Fetching Visualization

![Opportunity-page-fetching-visual](/visualizations/compschihi-opportunity-page-visual-v1.png)
