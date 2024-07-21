# DriversClutch

## Description
Our application provides a central portal for private driving learners. Students can get information on different private instructors, book private lessons and school tests, and do extra theory practice on this application. Driving instructors can use our page to view their students' information and lesson progress, and mark out their unavailable timings for lesson slots. 

## Deployed Application
https://driversclutch.vercel.app/


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [File Directory](#directory)
- [Node Packages](#packages)
- [Acknowledgments](#acknowledgments)


## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/wenkaixie/HEAP-HEAP-HOORAY
2. Navigate to the frontend directory:
    ```sh
    cd driversclutch/frontend
3. Install dependencies:
    ```sh
    npm i
4. Set up environment variables (if any):
    ```sh
    cp .env.local .env.local
5. Navigate to the backend directory:
    ```sh
    cd driversclutch/backend
6. Install dependencies:
    ```sh
    npm i
7. Set up environment variables (if any):
    ```sh
    cp .env .env


## Usage
To start the project:
1. Set the "url" in "/driversclutch/frontend/src/app/firebase/firebase_config.js" to "http://localhost:8001"
2. Run in the frontend directory:
    ```sh
    npm run dev
3. Run in the backend directory:
    ```sh
    node index.js


## File Directory
HEAP-HEAP-HOORAY\
    |- README.md
    |- .gitattributes
    |- .gitignore
    |- driversclutch\
                |- backend\
                            |
                            |- firebase\
                            |
                            |- node_modules\
                            |    |- <generated npm files here>
                            |
                            |- routes\
                            |    |- <routers for different features>
                            |
                            |
                            |- controllers\
                            |
                            |
                            |- middlewares\
                            |
                            |
                            |- .env
                            |- .gitignore
                            |- index.js
                            |- jsconfig.json
                            |- vercel.json
                            |- package-lock.json
                            |- package.json
                |- frontend\
                            |
                            |- next\
                            |    |- <build output for the project>
                            |
                            |- node_modules\
                            |    |- <generated npm files here>
                            |
                            |- pages\
                            |    |- <pages in the project>
                            |
                            |- public\
                            |    |- <images used for the project>
                            |
                            |- src\
                                    |
                                    |- components\
                                    |    |- <components used in the project>
                                    |
                                    |- firebase\
                                    |    |- <firebase files to link to the database>
                            |
                            |- utils\
                            |    |- <axios for api>
                            |
                            |- .env
                            |- .gitignore
                            |- jsconfig.json
                            |- next.config.mjs
                            |- package-lock.json
                            |- package.json


## Some Common Node Packages Used
1. Frontend:
- Axios
- Stripe
- dayjs
- next/link
2. Backend:
- firebase
- Express
- cors
- body-parser


## Acknowledgements
Driversclutch is created by HEAP 2024 Group 4, which includes:
- Koh Sheng Wei
- Tan Zu Wei
- Xie Wenkai
- Yong Yuan Qi
- Gau Yi Chi