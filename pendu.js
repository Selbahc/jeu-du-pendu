//Vérifier si lettre saisie figure dans le mot secret, et si oui, la rajouter au mot deviné
function checkAndReplace(answerArray, letter, secretArray) {
  if (secretArray.indexOf(letter) === -1) remainingAttempts--;
  for (var i = 0; i < answerArray.length; i++) {
    if (secretArray[i] == letter) answerArray[i] = letter;
  }
  return answerArray;
}

//Nb vies restantes
var remainingAttempts = 7;

//Phrase pour le nombre de vies
var livesElt = document.querySelector('#lives');
livesElt.innerHTML = 'Encore ' + remainingAttempts + ' essais restants';
//Photo pour le nombre de vies
var imgElt = document.querySelector('#img-pendu');
imgElt.innerHTML = '<img src="images/pendu' + remainingAttempts + '.png" alt="avancee pendu">';

//Faire choisir un mot à deviner
var wordElt = prompt('Choisissez le mot à faire deviner').toUpperCase().split('');

//Le mot à afficher et compléter
var answerElt = document.querySelector('#answer');
answerElt.textContent = '_'.repeat(wordElt.length);
var answerContent = answerElt.textContent.split('');

//Lettre essayée
var attemptElt = document.querySelector('#value-attempt');

//Au clic sur le bouton, appeler la fonction checkAndReplace, actualiser le nombre de vies, vider l'input. Le cas échéant, afficher la phrase de victoire ou de game over
var buttonElt = document.querySelector('#attempt-submit');
buttonElt.addEventListener('click', function() {
  answerElt.innerHTML = checkAndReplace(answerContent, attemptElt.value.toUpperCase(), wordElt).join('');

  imgElt.innerHTML = '<img src="images/pendu' + remainingAttempts + '.png" alt="avancee pendu">';
  livesElt.innerHTML = 'Encore ' + remainingAttempts + ' essai(s) restant(s)';
  attemptElt.value = '';

  if (answerElt.innerHTML.indexOf('_') == -1) alert('Bravo, Vous avez gagné !');
  if (remainingAttempts == 0) alert("Vous avez fini pendu !")
});
