# Itunes Search App

Link to deployed app: https://itunes-search-eta.vercel.app/

#### Functionality
- Search using the iTunes Search API
- Each search item includes name, author, type, image, and release date information
- Rating and Like button on every search item
- Filters: by media type, rating and favourites
- Pagination

### Technologies
- Next.js, React, TypeScipt, MUI, MongoDB and Mongoose

MongoDB is used here to store data about ratings and favourites for each search item.

### How to run

To set up the project, you need to provide a link to your MongoDB URL via the `MONGODB_URI` variable in the `.env` file.
Then you can run the project using the following commands:

- npm run dev - Starts Next.js in development mode;
- npm run build - Creates an optimized production build of your application;
- npm run start - Starts Next.js in production mode.
