//пользовательские настройки и элементы управления
let minValueSum = +document.getElementById("min-value").value;
let maxValueSum = +document.getElementById("max-value").value;
let decimalPlaces = +document.getElementById("decimal-places").value;
let btnGenerate = document.querySelector(".generate-btn");

//точки вывода данных
let sum = document.querySelector(".sum");
let currentPayment = document.querySelector(".current-payment");

//nodeList'ы
let thenElements = document.querySelectorAll(".then");
let ifElements = document.querySelectorAll(".if");

//JS переменные
const ifValues = [];
const thenValues = [];
const banknotes = [1, 2, 3, 4, 5, 10, 20, 50, 100];
let previousElement = null;



btnGenerate.addEventListener("click", () => {
  getRandomValues();
});

//получает атрибуты элементов с классом if
//записывает их в массив ifValues
getDataAttributesFromElementsOfArray(
  getArrayFromNodeList(ifElements),
  ifValues
);



function getRandomValues() {
  let thenValues = [];
  //сгенерировать рандомное значение суммы покупки согласно аргументам
  let randomSum = getRandomFloat(minValueSum, maxValueSum, decimalPlaces);
  //сгенерировать рандомное значение оплаты клиента
  let randomPayment = arrayRandElement(banknotes);

  //найти и изменить элемент
  searchParentForElementWithData(ifElements, randomPayment);

  if (randomPayment >= randomSum) {
    ifValues.map((elem) => {
      let randomSumTo005 = roundTo005(randomSum);
      //в массив thenValues записать округлённое значение выражения 
      thenValues.push((elem - randomSumTo005).toFixed(decimalPlaces));
    });

    //вывести на экран рандомную сумму и рандомный платёж
    sum.innerHTML = `${randomSum} евро`;
    currentPayment.innerHTML = `${randomPayment} евро`;

    //вывести на экран список элементов с содержимым из массива thenValues
    getArrayFromNodeList(thenElements).map((elem, index) => {
      elem.innerHTML = `${thenValues[index]} евро`;
    });
  } else {
    getRandomValues();
  }
}

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

//функция ищет родителя у элемента из списка элементов с заданным data
function searchParentForElementWithData(listOfElements, data) {
  listOfElements.forEach((item) => {

    let dataAttribute = +item.getAttribute("data");

    if (dataAttribute === data) {

      previousElement = item.parentElement;
      //если текущий элемент != прошлому
      if (item.parentElement !== previousElement) {
        //переключить класс у найденного элемента
        highlightingElementToggle(item.parentElement, "active-line");  
        
      } else {
        item.parentElement.classList.add('active-line');
      }

    } else {
      item.parentElement.classList.remove("active-line");
    }
  });
}

//переключает класс у элемента
function highlightingElementToggle(element, className) {
  element.classList.toggle(className);
}

//функция возвращает рандомное число в промежутке min-max и
//округляет его до decimal знаков после запятой
function getRandomFloat(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

//функция возвращает значение рандомного элемента массива
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

//функция округляет значение числа до 0.05
function roundTo005(num) {
  return Math.round(num / 0.05) * 0.05;
}
