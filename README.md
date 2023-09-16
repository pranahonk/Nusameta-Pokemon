# Search Books - Next.js Application

This is a Next.js application for searching and displaying books. It uses various technologies and libraries including Chakra UI, Redux Toolkit, React Query, and more. The application allows users to search for books, view details about them, and paginate through the results.

## Features

- Search for books by title.
- Filter books by title.
- Filter books by year of release.
- Switch between grid and list view.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```shell 
   git clone https://github.com/pranahonk/SynergizeTech-fe-test

2. Navigate to the project directory:
    ```shell
    cd SynergizeTech-fe-test
    ```
3. Install the project dependencies using Yarn or npm:
    ```shell
    yarn
    # or
    npm install
   ```

4. Start the development server:
    ```shell
    yarn dev
    ```
   
## Usage
Once the development server is running, open your web browser and navigate to `http://localhost:3000` to access the application. You can start searching for books and using the filters immediately.
![Local Image](./public/img.png)
![Local Image](./public/img_1.png)
![Local Image](./public/img_2.png)

## API Reference
This project uses the Google Books API for retrieving book information. The API endpoint is:

```shell
   https://www.googleapis.com/books/v1/volumes
```
you will need to set up environment variables in a .env file. Here's an example .env file:

```shell
NODE_ENV="development"
BOOK_KEY="YOUR-GOOGLE-BOOK-API-KEY"
```

## Deployment

to deploy this application, you can follow the deployment guidelines for Next.js applications. You may deploy it to platforms like Vercel, Netlify, or your own server.


## Built With
This project was built using the following libraries and technologies:

- [Chakra UI Icons](https://chakra-ui.com/icons): Icon library for Chakra UI.
- [Chakra UI](https://chakra-ui.com/): A simple, modular, and accessible component library for React.
- [Emotion](https://emotion.sh/): A performant and flexible CSS-in-JS library.
- [React Hook Form](https://react-hook-form.com/): A library for managing form state and validation in React.
- [Redux Toolkit](https://redux-toolkit.js.org/): A set of tools and best practices for Redux.
- [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
- [Framer Motion](https://www.framer.com/motion/): A library for adding animations and transitions to React applications.
- [Next.js](https://nextjs.org/): A popular React framework for building server-rendered React applications.
- [PostCSS](https://postcss.org/): A tool for transforming CSS with JavaScript.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Datepicker](https://reactdatepicker.com/): A simple and reusable datepicker component for React.
- [React Query](https://react-query.tanstack.com/): A library for fetching and caching data in React.
- [React Redux](https://react-redux.js.org/): Official React bindings for Redux.


## Contributing
If you'd like to contribute to this project, please create a pull request to the master branch.

## License
This project is licensed under the MIT License.
