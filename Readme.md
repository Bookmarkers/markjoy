# bookmarq

![GitHub repo size](https://img.shields.io/github/repo-size/Bookmarkers/markjoy)
![Contributors](https://img.shields.io/badge/contributors-3-yellow)

Click below to watch our demo:

[![2004 Demo Day Presentation](http://img.youtube.com/vi/laxrZAfsxZo/0.jpg)](https://www.youtube.com/watch?v=laxrZAfsxZo&list=PLx0iOsdUOUmkqg_8ixMky0s59-C2RJnDB&index=2&t)

bookmarq is a bookmark management and productivity tool that allows the user to assign bookmarks to relevant goals and categories. The user can also define "blocked" websites; upon visiting one of the blocked URLs, the user will be redirected to the user home page that suggests readings based on their saved links.

Developed with Node.js, Express, Sequelize, PostgreSQL, React, Redux, and Semantic UI.

## Usage

Visit our web application [here](https://markjoy.herokuapp.com/)

Install our Chrome extension [here](https://github.com/Bookmarkers/extension)

Please watch our demo for a complete user flow.

## Contributors

* [@yanjaaw](https://github.com/yanjaaw) 🤔 💻 🐛
* [@vjrodriguez](https://github.com/vjrodriguez) 🤔 💻 🐛
* [@jiannapark](https://github.com/jiannapark) 🤔 💻 🐛 

## Bookmarkers' Eyes Only ✨

<details>
  
  ### GENERAL

* [Tasks and Roles, Schema design](https://docs.google.com/spreadsheets/d/1kYgUQhWzOdwSfBvEf4vBLWRi_LOee8W9BV-fL2SOMNY/edit?ts=5efbb45f#gid=0)
* [MVP details, Team Contract, Github Org info](https://docs.google.com/document/d/1k9i_jV-R90ww2q3NZ-o9igq9lcLuM2A8qnBKjagLfks/edit#)
* [Wireframe v1](https://docs.google.com/presentation/d/1tLYkjwOF82MOE2ZbAxyEVhmRg5nHaw0BwLE2fUhls40/edit#slide=id.g8227949d86_1_13)
* [Deployed on Heroku!](https://markjoy.herokuapp.com/)

#### Naming conventions

| Directory         | Example          | Casing       | Description                        |
| ----------------- | ---------------- | ------------ | ---------------------------------- |
| client/components | bookmark-form.js | (kebab-case) | filepath name for components       |
| client/components | AllComponents    | (PascalCase) | inside the component files         |
| client/store      | addBookmark.js   | (camelCase)  | filepath name for redux            |
| server/db/models  | user_blocked.js  | (snake_case) | filepath name for Sequelize models |
| server/db/models  | UserBlocked      | (PascalCase) | Sequelize model names              |

#### Basics: Research & User testing

* [ ] Read up on ways to import current Chrome browser bookmarks into our extension
* [ ] Read up on ways to redirect from blocked sites

#### Importing existing Chrome browser bookmarks

* [ ] Export it as an HTML file - how to do it in code?
  * [ ] Stretch goal: intelligently sort all folder content into one category.
* [ ] Importing and making sense of the bookmarks - how to do it in code?

#### Redirecting or layering over blocked sites

* [ ] When the user goes to a blocked site, no matter the length of the url, they are redirected to our SPA
  * [ ] AND/OR (stretch goal?) user goes to a blocked site and there is a layer and/or header on that page with the goalie bookmark suggestions

### UX/UI

* [ ] Sorting bookmarks with buttons and/or dropdown menu?
* [ ] On-the-page alert of bookmark added / bookmark removed
* [ ] Rounded buttons for suggestions of which goal/category to put this newly added bookmark in.

### Stretch goals

#### Testing

* [ ] Everyone writes their own ~3 tests for each file after the project has started to take shape / stabilize.


* [x] Create a Readme file to keep track of tasks and goals.
* [x] Download / use similar apps to see what we like and don't
* [x] Schema design v.1
* [x] Project tasks
* [x] User stories
* [x] Come up with 5-ish main categories (defaults) + name for the unsorted category
* [x] Review and implement schema design v1.1
* [x] Finalize Wireframe v1.0
* [x] Finalize Tech stack by EOD Thursday July 2nd
* [x] Read up on PWA's
* [x] Experiment with PWA's
* [x] Research Vue and Firestore
* [x] Lightweight favicon
* [Wireframe OLD example](https://www.figma.com/file/SBvVSY7WpNCI8OjR4xJSOb/Bookmarkers?node-id=0%3A1)

</details>
