# Social-Media-App

Social-Media-App
Implemented user model and performed CRUD operations (Create, Read, Update, Delete).
Implemented Role-based authentication with roles such as admin and user.
Created Posts and Comments model and performed CRUD operations.
Implemented a Review System where users can create reviews for posts created by creators.
Utilized Cloudinary free hosting service for storing and retrieving images.
Secured APIs to restrict access based on user roles (e.g., only admins can delete creators, users, and posts).
Fetched all comments and reviews associated with each post when retrieving the post.
Fetched user's posts along with their profile information.
Ensured protection of sensitive information such as passwords from being exposed.
Implemented request validation using Joi.
Implemented an error handling strategy.

Project Structure

- .env
- .gitignore

- Assets

  -> Images

  -> Images-2

- Controllers
  -> authenticationController.js
  -> commentController.js
  -> postController.js
  -> reviewController.js

- db.js

- Helpers
  -> AppError.js
  -> tokenAuth.js
  -> validationSchema.js
  -> verifyAdmin.js

- index.js

- Models
  -> posts.js
  -> reviewModel.js
  -> Users.js

- package-lock.json
- package.json
- README.md

- Routes
  -> commentRoute.js
  -> postRoute.js
  -> reviewRoute.js
  -> userRoutes.js

- uploads
