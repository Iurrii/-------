//====DATA====//

//sources of settings and controls elements from DOM
let minValueSum = +document.getElementById("min-value").value;
let maxValueSum = +document.getElementById("max-value").value;
let decimalPlaces = +document.getElementById("decimal-places").value;
let btnGenerate = document.querySelector(".js-btn-generate");

//outputs
let sum = document.querySelector(".js-sum");
let currentPayment = document.querySelector(".js-payment");

//nodeLists
let thenElements = document.querySelectorAll(".js-then");
let ifElements = document.querySelectorAll(".js-if");

//JS variables
const ifValues = [];
const thenValues = [];
const banknotes = [1, 2, 3, 4, 5, 10, 20, 50, 100];
//====DATA-END====//


//====CODE====//

//получает атрибуты элементов с классом if
//записывает их в массив ifValues
getDataAttributesFromElementsOfArray(
  getArrayFromNodeList(ifElements),
  ifValues
);

btnGenerate.addEventListener("click", () => {
  generateValues();
});
//====CODE-END====//


//====FUNCTIONS====//

function generateValues() {
  let thenValues = [];
  //сгенерировать рандомное значение суммы покупки согласно аргументам
  let randomSum = getRandomNumber(minValueSum, maxValueSum, decimalPlaces);
  //сгенерировать рандомное значение оплаты клиента
  //переделать на использование ifValues
  let randomPayment = getValueRandElemFromArr(banknotes);

  if (randomPayment >= randomSum) {
    ifValues.map((elem) => {
      let randomSumTo005 = roundTo005(randomSum);
      //в массив thenValues записать округлённое значение выражения
      thenValues.push((elem - randomSumTo005).toFixed(decimalPlaces));
    });

    //найти родителя элемента-переменной randomPayment и изменить его класс
    let elementPayment = getParentForElemWithData(ifElements, randomPayment);
    toggleClassToActiveElem(ifElements, elementPayment, "active-line");

    //вывести на экран randomSum и randomPayment
    sum.innerHTML = `${randomSum} евро`;
    currentPayment.innerHTML = `${randomPayment} евро`;

    //вывести на экран список элементов с содержимым из массива thenValues
    getArrayFromNodeList(thenElements).map((elem, index) => {
      elem.innerHTML = `${thenValues[index]} евро`;
    });
  } else {
    generateValues();
  }
}

//get an array from a NodeList
//функция получает массив из нодлиста
function getArrayFromNodeList(nodeList) {
  return Array.from(nodeList);
}

//функция получает data-атрибут "data" из каждого HTML элемента массива fromArray
//и записывает в toArray
function getDataAttributesFromElementsOfArray(fromArray, toArray) {
  fromArray.map((elem) => {
    elem.getAttribute("data");
    toArray.push(elem.getAttribute("data"));
  });
}

//функция ищет родителя у элемента с заданным data из списка элементов 
function getParentForElemWithData(arr, data) {
  let parent = null;

  arr.forEach((item) => {
    let dataAttribute = +item.getAttribute("data");
    dataAttribute === data && (parent = item.parentElement)
  });
  return parent;
}

function toggleClassToActiveElem(arr, elem, className) {
  arr.forEach((item) => {
      item.parentElement.classList.remove(className);
    if (item.parentElement === elem) {
      item.parentElement.classList.toggle(className);
    }
  });
}

//функция возвращает рандомное число в промежутке min-max и
//округляет его до decimal знаков после запятой
function getRandomNumber(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

//функция возвращает значение рандомного элемента массива
function getValueRandElemFromArr(arr) {
  var randomElem = Math.floor(Math.random() * arr.length);
  return arr[randomElem];
}

//round the value of the number to 0.05
//функция округляет значение числа до 0.05
function roundTo005(num) {
  return Math.round(num / 0.05) * 0.05;
}
