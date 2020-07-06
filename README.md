[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Golf Scorekeeper API
A password-protected backend API utilizing Express with Mongoose and MongoDB that enables authenticated users to CRUD their rounds of golf.

## Technologies Used
- Express
- Mongoose
- MongoDB


## Planning and Development Process
- I tested curl scripts for user authentication, ensuring only authenticated users could make successful API calls
- I built User and Round schemas/models using Mongoose
- I used a user as an owner reference to establish a one-to-many relationship between one user with many rounds.

## Future Versions
- Enabling comments between users

## Entity Relationship Diagram
[User-Rounds ERD](https://i.imgur.com/7Wbo0EW.jpg)
