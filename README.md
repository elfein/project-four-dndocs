# DnDocs - Dungeons & Dragons Assistant

This application assists D&D players with the calculation side of their favorite game. With DnDocs, users can create multiple characters within one account, then keep track of the character's weapons, items, spells, and other stats. 

Using Fight Mode, users can generate die rolls including skill-related modifiers, and input changes to their character's health points.

Using the Character Log, users can see a visual representation of their character's information.

## [Link to App](https://project-four-dndocs.herokuapp.com/)

## Technologies Used

- Ruby on Rails
- PostgreSQL
- React.js
- Active Record
- styled-components
- react-router-dom
- a small amount of D3

## Credits

- [react-d3-radar](https://www.npmjs.com/package/react-d3-radar)
- [D&D 5e API](http://www.dnd5eapi.co/)
- [Game-icons.net](https://game-icons.net/)
- [Font Awesome Icons](https://fontawesome.com/)
- [CSS Tricks](https://css-tricks.com/forums/topic/trying-to-set-state-using-with-time-delay/)
- [Michael Menz's D3 Tutorial on Youtube](https://www.youtube.com/watch?v=219xXJRh4Lw)

## App Features
- Calls to 3rd Party API to autofill spell names and descriptions
- Mobile-first design to benefit tabletop players
- Responsive data visualizations
- Intuitive Fight Mode that logs each health point-related action
- Full CRUD on accounts, characters, weapons, items, and spells
- Character icons that update according to character class

## Planning
### [User Stories on Trello](https://trello.com/b/0YHdmU5Y/dndocs-app)

### [Wireframes](https://66.media.tumblr.com/40d467653b7a8a5889131ace3fe2f014/tumblr_pi58l05u211uj0ljmo1_1280.jpg)

### [ERDs](https://66.media.tumblr.com/1238c7c9edf02affcb9b089c59bc504d/tumblr_pi58l05u211uj0ljmo2_r1_1280.png)

## Considerations
- __I would love to keep building out functionality over time, so my friends and I could actually handle in-person games more easily.__ The game is still nowehere near capable of handling all the edge-cases involved in a real game, such as multiple damage-types per spell or weapon, character-specific proficiencies, advantage and disadvantage on rolls, and more. 

- __Integrating D3 was my reach goal and a large source of struggle.__ I'm still hoping to get more practice with both D3 and methods to integrate it into React.

- __Would still like bring in 3rd Party API to assist with weapon creation in the same way it has been brought in for spells.__ It was really fun to handle populating suggested spell names and information.

- I'm also interested in making this interactive for multiple players, which would be a large hurdle on its own.