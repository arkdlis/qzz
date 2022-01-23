# Qzz

Quiz party game

React, NestJs, socket.io

## TODO:

- finish QuizController.tsx (full mocked behavior of quiz, local xstate)
- socket communication: back <-> front
- quiz state on backend (use xstate)
- multiplayer
- konfiguracja gry

## SPECS:

- styles
  - dynamic theme based on two colors - colors can switch after every question (based on css variables?)
  - minimalistic, bold design
  - scalable ui - based on percentage of screen size
  - design for landscape orientation (but look fine on vertical too)
  - animated variable fonts?
- Basic POC Quiz Loop
  - question
  - answers (always four)
  - timer (configurable)
  - answer selection with time recorded
  - possible to change answer (configurable) - new time is recorded
  - when time is out, display new question
  - randomize questions (configurable)
  - randomize order of answers (configurable)
- session backend
  - one user creates game, unique code is generated
  - other users can join game using shared code
  - users can join as players or spectators (use case: display spectator view on big screen, users join with their smartphones)
- modes
  - quick play (preconfigured) / custom game (configurable)
  - team play (?with turns?)
  - number of rounds
  - trivia categories
- extras
  - higher stakes with each turn
  - climb the ladder
  - perks - przeszkadzajki (odwrócony tekst, zamazane litery, mniej czasu, opóźnienie wyświetlenia odpowiedzi, jakaś akcja do zrobienia żeby odsłonić odpowiedź) i dopalacze (mnożniki punktów, wykreślenie niepoprawnej odpowiedzi)
  - voting for category of questions
- misc/palette
  - each player starts with different theme palette, when they join they have the same palette
  - palette changes after each question to prompt that there is new question (configurable - some may find frequent changes annoying)
  - other idea - different color for each player/team?

- other games within the same app? teambuilding & icebreakers
  - trivia quiz
  - ego
    - each turn one player selects preferred answer on personal matter, others have to guess what he choose
  - https://www.quizbreaker.com/
    - users answers questions
    - their answers are used in quiz (players have to guess who gave that answer)
  - trivia in turns without answers, the other team has answers
  - kalambury / draw it