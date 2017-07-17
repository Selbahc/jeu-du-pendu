function checkAndReplace(answerArray, letter, secretArray) {
  if (secretArray.indexOf(letter) === -1) remainingAttempts--;
  for (var i = 0; i < answerArray.length; i++) {
    if (secretArray[i] == letter) answerArray[i] = letter;
  }
  return answerArray;
}

var remainingAttempts = 7;

var livesElt = document.querySelector('#lives');
livesElt.innerHTML = 'Encore ' + remainingAttempts + ' essais restants';

var wordElt = prompt('Choisissez le mot à faire deviner').toUpperCase().split('');

var answerElt = document.querySelector('#answer');
answerElt.textContent = '_'.repeat(wordElt.length);
var answerContent = answerElt.textContent.split('');

var attemptElt = document.querySelector('#value-attempt');

var buttonElt = document.querySelector('#attempt-submit');
buttonElt.addEventListener('click', function() {
  answerElt.innerHTML = checkAndReplace(answerContent, attemptElt.value.toUpperCase(), wordElt).join('');
  livesElt.innerHTML = 'Encore ' + remainingAttempts + ' essai(s) restant(s)';
  attemptElt.value = '';
  if (answerElt.innerHTML.indexOf('_') == -1) alert('Bravo, Vous avez gagné !');
  if (remainingAttempts == 0) alert("T'es pendu gros naze!")
});
