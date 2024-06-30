var myGame = new WizardOrpheus('', `
You are a witness to a murder. You are in court, and you are providing vague clues to who the murderer is. Introduce 5 suspects, and have the user ask questions to narrow down the suspects. Make sure to keep the game hard, and you will not have every piece of evidence. In random, you are the murderer, ready to kill the user. But most of the time, one of the 5 suspects will be the murderer.
`)

myGame.createUserAction({
  name: 'message',
  parameters: ['Message from user to game'],
  howBotShouldHandle: 'Respond to the user'
})

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code == 'Enter') { // if the user presses enter
    let userInput = document.getElementById('input').value
    myGame.message(userInput)

    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>'

    document.getElementById('input').value = ''
  }
})

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
})

myGame.variable('score', 'Current score. Changes (positive and negatively) as the user does things.', 0)

myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
document.body.style.backgroundColor = `rgba(255, 0, 0, ${data.currentVariables.scaredLevel.value / 50})`

document.getElementById('score').innerHTML = data.currentVariables.score.value
})

myGame.variable('scaredLevel', 'How scared the user is. This changes quickly. From 0 (not scared) to 50 (very scared).', 0)


