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
    - **webpack/**: Webpack configuration files
  - **functions**: Cloud functions source code
  - **public**: Built frontend from client client folder to push to deploy

## Getting the app running

### Client/Frontend
1. Run ```npm install``` to install dependencies
2. Run ```npm run build``` to create a production build or ```npm run dev``` to start development mode
3. Using VSCode live server extension, open the index.html file in the admin folder with live server

### Server/Cloud Functions
TBA


## Development

### Adding new pages on frontend
Create a .tsx file for your new page in the src/pages directory and copy the following
```
import * as React from "react";
import { createRoot } from "react-dom/client";

const New-page-function-name = () => {
  return (
    <>
      
    </>
  );
};

const root = document.getElementById("root");
createRoot(root).render(<New-page-function-name />);
```
Replace the "New-page-function-name" with the name of your new page and make sure its capitalized. 

If you were in development mode with ```npm run dev```, kill that terminal and restart development mode to start compiling the new page. 

Create a new HTML file in the admin folder and copy and paste the contents from index.html but make sure to replace the 
```
<script src="./dist/Index.js"></script>
```
on line 16 with the name of your new javaScript page file
```
<script src="./dist/New-page-function-name.js"></script>
```