# Chatbot

## Usage

First, you will need to put the chatbot button and root in your HTML.
The minimal structure is the following:
```html
<div class="chatbot" id="chatbot-button">
    <button class="button-icon">Open</button>
    <button class="button-icon not-visible">Close</button>
    <div id="chatbot_root" class="chatbot-container not-visible"></div>
</div>
```
The structure, class and id names are important and can't be changed. However, you can change the button content at your will.

This is the default content of the buttons:
```html
<div class="chatbot" id="chatbot-button">
    <button class="button-icon">
      <svg width="32" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g clip-path="url(#messages__clip0_14307_15730)"><path fill-opacity="0.01" d="M0 0h24v24H0z"></path><mask id="messages__b" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type: alpha;"><g clip-path="url(#messages__clip1_14307_15730)"><g clip-path="url(#messages__clip2_14307_15730)"><mask id="messages__a" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23" style="mask-type: alpha;"><path d="M2.571 22.286h-.008.008z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.143 4.286c1.414 0 2.571 1.157 2.571 2.571v8.572c0 1.414-1.157 2.571-2.571 2.571H7.209l-4.037 4.037c-.162.162-.384.247-.606.248-.11 0-.219-.017-.32-.068-.317-.128-.532-.445-.532-.788V6.857c0-1.414 1.157-2.571 2.572-2.571h12.857zM4.286 6c-.472 0-.857.386-.857.857v12.506l2.82-2.82c.162-.163.377-.249.608-.249h10.286c.471 0 .857-.385.857-.857V6.866c0-.472-.386-.857-.857-.857H4.286V6z"></path><path d="M20.571.857c1.415 0 2.572 1.158 2.572 2.572V12c0 .472-.386.857-.857.857-.472 0-.857-.385-.857-.857V3.43c0-.472-.386-.857-.858-.857H7.714c-.471 0-.857-.386-.857-.857 0-.472.386-.858.857-.858h12.857z"></path></mask><g mask="url(#messages__a)"><path d="M-1.714-1.714h27.429v27.429H-1.714z"></path></g></g></g></mask><g mask="url(#messages__b)"><path d="M0 0h24v24H0V0z"></path></g></g><defs><clipPath id="messages__clip0_14307_15730"><path d="M0 0h24v24H0z"></path></clipPath><clipPath id="messages__clip1_14307_15730"><path d="M0 0h24v24H0z"></path></clipPath><clipPath id="messages__clip2_14307_15730"><path transform="translate(-1.714 -1.714)" d="M0 0h27.429v27.429H0z"></path></clipPath></defs></svg>
    </button>
    <button class="button-icon not-visible">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 18" class="conversations-visitor-close-icon"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g fill="currentColor" transform="translate(-927 -991) translate(900.277 962)"><g transform="translate(27 29)"><path d="M10.627 9.013l6.872 6.873.708.707-1.415 1.414-.707-.707-6.872-6.872L2.34 17.3l-.707.707L.22 16.593l.707-.707L7.8 9.013.946 2.161l-.707-.708L1.653.04l.707.707L9.213 7.6 16.066.746l.707-.707 1.414 1.414-.707.708-6.853 6.852z"></path></g></g></g></svg>
    </button>
    <div id="chatbot_root" class="chatbot-container not-visible"></div>
  </div>
```

After that you will need to add the script and CSS to load the chatbot
```html
<script type="module" src="chatbot.js"></script>
<link rel="stylesheet" href="chatbot.css">
```

Finally, you will need to initialize the chatbot by listening to the `chatbot-loaded` event and then calling the `initChatbot` function.  
This function takes one argument of type [`TConfig`](./src/types/TConfig.ts).  

Example: 
```typescript
document.addEventListener("chatbot-loaded", () => initChatbot({ ... })
);
```
## Configuration

To use the chatbot, you will need to provide at least a title and a list [`TQuestions`](./src/types/TQuestions.ts) object.  
You can also provide a callback `onEnd` that will take the data you or the user sent during the chatbot.  
You can finally customize the end message text by setting the `endMessage` property and the new chat button text by setting the `endButtonText` property. 

### Example

```typescript
const config: TConfig = {
  title: "Chatbot title",
  questions: { ... },
  onEnd: (data) => console.log(data),
  endMessage: "Thanks for chatting with us!",
  endButtonText: "Open new chat",
};
```

### [`TQuestions`](./src/types/TQuestions.ts)

The `TQuestions` object is a map of question id to `TQuestion` object.  
Each `TQuestion` object contains at least a question as a string or a list of string (a list will display a chat bubble for each element).  
It can also contain an action as a `TAction` object.  
It may also contain a list of `TAnswer` objects.  
And it may have a `goto` string that if provided will redirect automatically to the question with the given id.
The chatbot will always start at the question with id `start`.

### Exemple

```json
{
  "start": {
    "question": "First question",
    "answers": [
      { "text": "Answer 1", "next": "other_id" },
      { "text": "Answer 2", "next": "other_id", "action": { "action": "set", "property": "prop1", "value": "value1" } }
    ]
  },
  "other_id": {
    "question": ["Question", "In 2 messages"],
    "goto": "end",
    "action": { "action": "ask", "property": "prop2" }
  },
  "end": {
    "question": "End of chatbot",
    "action": { "action": "end" }
  }
}
```

### `TAction`

The `TAction` object contains an `action` property that can be either `ask`, `set` or end.  
If the action is `ask`, the chatbot will ask the user a question and wait for a response to set the `property` to the response.  
If the action is `set`, the chatbot will set the given `property` to the given `value`.
If the action is `end`, the chatbot will end the conversation and call the `onEnd` callback with the data provided by the user.
An action can also contain a `goto` property that will redirect the chatbot to the question with the given id.

### `TAnswer`

The `TAnswer` object contains a `text` property that will be displayed as a message and a `next` property that will redirect the chatbot to the question with the given id.  
It can also contain an `action` property that will be executed after the message is displayed.
The `at` property is used internally and you don't need to set it.

## Customization

You can customize the chatbot colors by setting variables in the `theme` layer.  
To not be overridden by the chatbot default, you must place your custom style after the link to `chatbot.css`.  

### Variables

| Name                   | Default            | Description                                                                           |
|------------------------|--------------------|---------------------------------------------------------------------------------------|
| --color-primary        | rgb(178, 69, 146)  | The main color. Used on header, selected response, options hover and endButton color. |
| --color-primary-dark   | rgb(154, 12, 113)  | Dark declination of the primary color. Used on hover of enButton.                     |
| --color-onprimary      | rgb(255, 255, 255) | Text color on primary container. Used in header text and button icon color.           |
| --color-question       | rgb(245, 243, 242) | Question container background color.                                                  |
| --color-question-text  | rgb(0, 0, 0)       | Question text color. Used in end message text.                                        |
| --color-background     | rgb(255, 255, 255) | Chatbot background color.                                                             |
| --color-option         | rgb(51, 71, 91)    | Option border and text color.                                                         |
| --color-option-hover   | --color-primary    | Option border and text color on hover. By default same as primary.                    |
| --color-input          | rgb(30, 41, 57)    | Footer input text and border color.                                                   |
| --color-input-disabled | rgb(166, 160, 155) | Footer input text and border color when disabled (no input required).                 |

