let sum = document.querySelector('.sum');
let currentPayment = document.querySelector('.current-payment');


let btnGenerate = document.querySelector('.block-inputs__btn');
let thenElements = document.querySelectorAll('.then');
let ifElements = document.querySelectorAll('.if');


let ifValues = [];
let thenValues = [];
let banknotes = [1, 2, 3, 4, 5, 10, 20, 50, 100];




getDataAttributesFromElementsOfArray(getArrayFromNodeList(ifElements), ifValues);



btnGenerate.addEventListener('click', (() => {
  getRandomValues();
}));


// function getRandomValues() {

//   let minValueSum = +document.getElementById('min-value').value;
//   let maxValueSum = +document.getElementById('max-value').value;
//   let decimalPlaces = +document.getElementById('decimal-places').value;

//   let thenValues = [];
//   let randomSum = getRandomFloat(minValueSum, maxValueSum, decimalPlaces);
//   let randomPayment = arrayRandElement(banknotes);


//   if (randomPayment >= randomSum) {

//     ifValues.map((elem) => {
//       thenValues.push((elem - randomSum).toFixed(decimalPlaces));
//     })

//     getArrayFromNodeList(thenElements).map((elem, index) => {
//       elem.innerHTML = `${thenValues[index]} евро`;
//     });

//     sum.innerHTML = `${randomSum} евро`;
//     currentPayment.innerHTML = `${randomPayment} евро`; 
    
//   } else {
//     getRandomValues();
//   }

// };

function getRandomValues() {

  let minValueSum = +document.getElementById('min-value').value;
  let maxValueSum = +document.getElementById('max-value').value;
  let decimalPlaces = +document.getElementById('decimal-places').value;

  let thenValues = [];
  let randomSum = getRandomFloat(minValueSum, maxValueSum, decimalPlaces);
  let randomPayment = arrayRandElement(banknotes);


  if (randomPayment >= randomSum) {

    ifValues.map((elem) => {
      sum.innerHTML = `${randomSum} евро`;
      currentPayment.innerHTML = `${randomPayment} евро`;
      
      let randomSumTo005 roundTo005(randomSum);

      thenValues.push((elem - randomSumTo005).toFixed(decimalPlaces));
    })

    getArrayFromNodeList(thenElements).map((elem, index) => {
      elem.innerHTML = `${thenValues[index]} евро`;
    });   
  } else {
    getRandomValues();
  }

};


//функция получает массив из нодлиста
function getArrayFromNodeList(nodeList) {
  return Array.from(nodeList);
};

//функция получает data-атрибут "data" из каждого HTML элемента массива fromArray
//и записывает в toArray
function getDataAttributesFromElementsOfArray(fromArray, toArray) {
  fromArray.map(elem => {
    elem.getAttribute('data');
    toArray.push(elem.getAttribute('data'));
  })
};

//функция возвращает рандомное число в промежутке min-max и 
//округляет его до decimal знаков после запятой
function getRandomFloat(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
};

//фукция возвращает значение рандомного элемента массива
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//функция округляет значение числа до 0.05
function roundTo005(num) {
  return Math.round(num / 0.05) * 0.05;
}
