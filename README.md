# ChiSe - The Pinterest clone
#### Video Demo:  https://www.youtube.com/watch?v=ZR5ZL0fMIVQ
#### Description:
Pinterest is a social media web application that enables sharing images, short videos, gifs, etc. under the format of "pins".

ChiSe follow a similar pattern but is limited to image only (image file formats that are supported are jpg, jpeg, png and webp).

### Phase 1
#### Users
When navigating to the app, users will be redirected to the login page because the app requires an account in order to interact with it. When a user is not logged in, he/she can only navigate between the log in page and the sign up page, in which there will be a form for logging in or signing up.

Note: Both sign in and sign up processes strictly follow certain validations, if any of the required fields aren't valid, the form won't be submitted.

After an account is created, users can now interact with:
- Pins
- Other users

User who created a pin has full authority over that pin, they can decide whether to delete, edit or read the pin.

User who is not the creator of a certain pin can only view, save or report the pin.

Same goes for user-user interaction in which user can follow another user and a user has full control over his/her own account, but account deletion is still unvailable.

#### Pins
To create a pin, user must include:
1. The pin's image file
2. Tag(s)

Other than the above, optionally, user can also:
1. Add a title
2. Add a description
3. Add a destination link
4. Save the pin to the saved section after upload
5. Decide whether or not the comment section is disabled

After the pin is created, the page will be redirected to the home page and the pin will appear in the feed. At the same time, a page corresponding to the pin will also be created.

While users can only see some of the details about a pin in the feed, they can see it's full detail by clicking on the pin to navigate to the page mentioned above. Other pins will also appear underneath that pin.

##### Settings
The current changes that a user can apply to their account are their profile and their private data.

### The ideas
This app is heavily inspired by Pinterest, which is one of the reasons why the design looks very similar. However this ChiSe app is still incomplete, as there are unimplemented functionalities such as searching, commenting, etc.

This app is built with NextJS as the meta framework that uses React as the UI framework, Tailwind for styling, and Firebase for backend services.

I personally picked NextJS because it is my favorite framework and also because I had prior experience with React, and Tailwind just fits in as it usually does. However, originally I plan on using a SQL database because the app itself is a social media app so handling relationships would be perfect for a SQL database.

The app took turn from using SQLite (built-in), which turns out to be not so secured, to using MySQL (Planet Scale) with Prisma (ORM). But I later discovered that entities don't necessarily form relationships with each other because in the first phase of the project, no recommendation algorithm is needed because of small scale.

Writing queries to fetch data that has little to none relation towards each other seems like an overkill, so I took a different approach to use a document database instead, and in this case, Firebase is the one that I chose.

Not only that they provide tons of services, Firebase is also something that I just got my hands on recently, so I challenged myself to learn how to use it whilst building the app.

The most difficult struggle that I had to overcome was to implement a fully manangeable validation system for authentication while also making sure that the routes are protected client side. Since auth is now handled by Firebase and I cannot retrieve the user data (or token) in the middleware, I had to settle with the protected route solution which can be found in the hooks folder and is not robust in any way.

Another problem that really ache my head is the fact that there isn't an actual solution for compressing images client-side. Most of the solutions I found were being server-side, which really hurt's the performance of the app when a user upload a pin when they can just have the image compressed on the client to improve speed. The solution that I took for this was to use the DOM manipulation of JS to generate a smaller + less resolution image in an element and turn it to a file to upload instead of the original one, code for this can be found in the hooks/DbProvider.js.

### A few last words
As I mentioned before this app is still incomplete and I'm look for better solutions.

One of the problems that can be addressed directly is the inconsistence of state manangement (be it server state or client state). Props drilling happens a lot because of layers of different providers wrapped arount the entire app which cause a huge bundle size. This problem is crucial because it cause great decrease in performance, but it will soon be addressed in the next phase of the project where I introduce global state manangement with jotai (or zustand depending on how I want to manage states).

Other problems are: lack of crucial functionalities such as searching and commenting, no truncate when text is too long, security rules, caching, lack of code clarity. These problems together with other features will soon arrive so stay tune
