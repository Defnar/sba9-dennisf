# Readme Instructions
Write a reflection addressing:
- How you implemented React and TypeScript features
- The challenges you encountered and how you overcame them
- Your approach to component composition and state management

# Answers
## How I implemented React and Typescript Features
- I found typescript to be very useful in this project, with the size of different various data structures moving around the program.  Everytime I needed a new data set, type, or even Partial dataset I implemented a new type or interace in order to help ensure data consistency and integrity as various data moves around the program.  As for react, I used multiple features I researched for this project to moreso control the program as I needed it.  useEffect was useful in setting functions that interact only as components or data changed and needed specific functions, in conjunction with useInterval so I could track time and deadline without overloading the program with calls to test every task against it's due date on every render.

## The challenges I React and Typescript
- The biggest challenges I faced were trying to work with React's rendering cycle and not overloading or infinite looping the entire app, or needlessly calculating things that didn't need to be calculated.  I ended up researching ways to have functions only call on updates or as needed, and came across useEffect() for this.  There are several places within the app you'll find useEffect so something isn't running on repeat (such as isFormModalOpen, which only needs to run when the add task form is opened or closed, or the statcounter, which only needs to run when tasks are updated).
- I also struggled with dependencies also causing infinite rendering/looping.  Ty vs code for having the option to ignore that warning and not placing things into the dependency that will just auto-run the function on repeat.  (I need to look more into the callback() that vs code was recommending to fix this)
- I also had some struggles with the Date object not working quite the way I needed it to work, but I got around it by using valueAsDate and creating Date Objects only using the parameters needed and ignoring time.

## Your approach to component composition
- My general idea or understanding is to have states in the lowest parent they can be stored in depending on who needs access.  The entire app uses tasks, for example, so I stored tasks in dashboard as the closest parent before app, where as the data for form input/output only needs to be within form, so that state sits in form. In this way, you limit the callback functions and variables being tunneled down to lower-nested children within the app.
- I don't think I designed this one very well, and I only realized near the end that I did not delegate the logic well.  I can think of several ways I could potentially compose this better.  I think I could, theoretically, save the tasks state in tasklist, use callback functions to pass task data up to dashboard and over to task form, and vice versa.  This would let me keep data and data manipulation in task list like the instructions mentioned doing.  I ended up shoving too much stuff into dashboard for this app.
