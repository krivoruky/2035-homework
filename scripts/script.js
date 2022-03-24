const formElem = document.forms[0]; 
const wordElem = formElem.word; 
const translationElem = formElem.translation; 
const colorElem = formElem.color; 
const productsElem = document.querySelector('#products') 
const findElem = document.querySelector('#find') 
let products = []; 
 
formElem.addEventListener('submit', event => { 
  event.preventDefault(); 
  findElem.value = ''; 
  products.push({ 
   word: wordElem.value, 
   translation: translationElem.value, 
   color: colorElem.value, 
  }) 
  rerender(products); 
}); 
 
findElem.addEventListener('input', event => { 
 const value = event.target.value; 
 rerender(value.length ? products.filter(elem => elem.word.startsWith(value)) : products); 
}) 
 
function rerender(words){ 
 productsElem.innerText = ''; 
 for (let i = 0; i < words.length; i++){ 
  const card = document.createElement('div'); 
  const closeElem = document.createElement('div'); 
  const cards_wordElem = document.createElement('h1'); 
 
  closeElem.addEventListener('click', () => { 
   findElem.value = ''; 
   products = products.filter(elem => elem.word !== (words[i].word || words[i].translation)); 
   rerender(products); 
  }); 
 
  let change = true; 
  card.addEventListener('dblclick', () => { 
   if (change == true) { 
    cards_wordElem.innerText = products[i].translation; 
    change = false; 
   } 
   else { 
    cards_wordElem.innerText = products[i].word; 
    change = true 
   } 
  }); 
   
  card.classList.add('card'); 
  closeElem.classList.add('close'); 
 
  card.append(cards_wordElem, closeElem); 
  productsElem.appendChild(card); 
  cards_wordElem.innerText = words[i].word; 
  card.style.backgroundColor = words[i].color; 
  closeElem.innerText = '✖'; 
 } 
}