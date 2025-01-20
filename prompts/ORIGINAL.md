- Abort when things take toolong and the user created another update
- Throttling of the update request

I want to build a POC with react, typescript and a backend server, for example fastify.

The goal is the following showcase: I want to build a showcase for a huge form that goes over multiple sections. For the sake of the example we will implement 3 sections of a form and a final page that shows if all the validations on the 3 sections are without errors and the form is ready to submit or not.

The 3 section are like the following:
Section 1 is a form with personal data, name, surname, date of birth, gender, etc.
Section 2 is a form with address data, state of living, country, postal code, etc., feel free to take a smaller data set for states and country, it does not matter if the data does not make sense.
Section 3 is about parents, what is their name, birthdate, if they are still alive, and if they are alive, where do they life, with a checkbox if they life at the same address that was mentioned previous or, if the checkbox is not checked, they life on another address that the user needs to put in.
The final section/page has, as mentioned, the collected data of all sections listed and gives hints about problems with validations. When the user clicks on the hints with the validations, he's directed to the error section with the error and focusses the regarding field.

Implement some some common validations for the fields, like required and date of birth not in future etc., don't go to far with the validations, hence it is a POC.

Create a good structured and separate data model and application structure, that makes it possible to remove and adds sections to the form very easily for a developer.

Keep in mind that we want to show the user that there are sections that have validation errors, but also, that not all sections should show "We have validation errors" when the user opens the page. The user should have seen the section and worked in the section before the application gives him the hint that the user made mistakes.

The values that the user enters should be persisted on the client and ultimately on the server as well. It should be possible to send small updates to the server, without interfering with the user experience and blocking the UI. If the server is not reachable, maybe because the internet is slow or the user's device has no internet for a time, the UI should still work as intended and save all the actions locally on client until the server is reachable again. If multiple local action occur before the server comes back, for example:

- User changes name to Robert
- User changes last name to Schmidt
- User changes name to Roberto
  These actions should be combined into one request as long as the server is not reachable, and the final request could look like this:

```
{ name: "Roberto", lastName: "Schmidt" }
```

The last action wins in this scenario, so the first action "Changes name to Robert", is virtually not present anymore, because the user changed the name afterwards to "Roberto".

Requirements:

- On blur, all fields trigger their respective validation
- On blur, the value in a field is (if valid), persisted
- The user interaction is not blocked during the process of persisting a value
- The request to the backend is throttled by 2 seconds, to check if the user does any more user inputs before we send an update to the backend
- If an update to the backend takes more than 5 seconds, and the user is interacting with the form again and makes updates, we abort the request to the backend and mark it as failed, and prepend the changes of the failed request to the next one.
- The backend should allow partial updates of a model, that also means that the model `id` needs to be allocated before the user sees the actual form, that said, the initial screen for a user is on the route `/forms`, the users are able to see all the forms that they have created (for simplicity we assume that there is only one user, and his ID is always 1, hardcoded in the backend)
- The users can resume to a form that they started previously by clicking on them in the list, it will lead them to the route `/forms/{id}` and show them the form. They will send to the first section that has not been filled up completely (e.g. where they left off)
- On the route `/forms`, is a button that allows the user to create a new form, when the user clicks on that button, a POST is going to the server and the server answers with an ID, which is put into the url by the client and forwards the user to that route, e.g. `/route/{ID}`
