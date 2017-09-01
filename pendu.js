//Desactiver l'action du formulaire
document.querySelector('.form-container').addEventListener('submit', (e) => {
  e.preventDefault();
})

//Vérifier si lettre saisie figure dans le mot secret, et si oui, la rajouter au mot deviné
function checkAndReplace(answerArray, letter, secretArray) {
  if (secretArray.indexOf(letter) === -1) remainingAttempts--;
  for (var i = 0; i < answerArray.length; i++) {
    if (secretArray[i] == letter) answerArray[i] = letter;
  }
  return answerArray;
}

//Si le mot à deviner est vide, en piocher un dans la liste
const pickAWord = (string) => {
  const random = Math.floor((Math.random() * wordsArray.length) + 1); //wordsArray défini dans mots.js
  secretWord = wordsArray[random].toUpperCase().split('');
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
var secretWord = prompt('Choisissez le mot à faire deviner\n(Laissez vide si vous souhaitez que l\'ordinateur le choisisse pour vous)').toUpperCase().split('');
secretWord.length < 1 ? pickAWord(secretWord) : secretWord;
console.log(secretWord.join(''));

//Afficher le nombre de caracteres correspondant au mot secret
var answerElt = document.querySelector('#answer');
answerElt.textContent = '_'.repeat(secretWord.length);
var answerContent = answerElt.textContent.split('');

var attemptElt = document.querySelector('#value-attempt'); //Lettre essayée

//Au clic sur le bouton, appeler la fonction checkAndReplace, actualiser le nombre de vies, vider l'input. Le cas échéant, afficher la phrase de victoire ou de game over
var buttonElt = document.querySelector('#attempt-submit');
buttonElt.addEventListener('click', function() {
  answerElt.innerHTML = checkAndReplace(answerContent, attemptElt.value.toUpperCase(), secretWord).join('');

  imgElt.innerHTML = '<img src="images/pendu' + remainingAttempts + '.png" alt="avancee pendu">';
  livesElt.innerHTML = 'Encore ' + remainingAttempts + ' essai(s) restant(s)';
  attemptElt.value = '';

  if (answerElt.innerHTML.indexOf('_') == -1) alert(`Bravo, Vous avez gagné ! \n Il s'agissait bien de ${secretWord.join('')}`);
  if (remainingAttempts == 0) {
    alert('Vous avez fini pendu !');
    answerElt.textContent = secretWord.join('');
  }
});
