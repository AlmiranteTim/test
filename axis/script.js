function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

var a = randomInteger(6, 9);
var b = randomInteger(11, 14) - a;
var sum = a + b;


function checkValue(inputValue, divValue, div) { // Проверка значения input
    if (divValue == inputValue.value) {
        div.classList.remove('div_error');
        inputValue.classList.remove('error');
        inputValue.disabled = true;
        appendInputValue();
    } else {
        div.classList.add('div_error');
        inputValue.classList.add('error');
    }
    ;

    if (aInput.disabled && bInput.disabled) {
        result.after(SUM); //выводим input суммы.
        result.remove();
    }
    ;
};

function appendInputValue() { // Проверка оставшихся input
    var inputs = document.querySelectorAll('input');
    for (var input of inputs) {

        if (input.disabled) {
            bInput.setAttribute("type", "text");
            bInput.classList.add('first_input');
            canvas.append(bInput);
            bInput.style.left = ((midArrow2 - bInput.clientWidth) + 'px');
            bInput.style.top = (inclineArrow1 / 1.5 + 'px'); //Расположение второго input над дугой
            createArrow2(); // Рисуем дугу
        } else if (!input.disabled)
            return;

    }
    ;
};

function getSUM() { // Проверка input с суммой
    if (SUM.value === String(sum)) {
        SUM.disabled = true;
        SUM.classList.remove('error');
    } else {
        SUM.classList.add('error');
    }
};

var example = document.createElement('div');
document.createElement('div').classList.add('example');
example.innerHTML = `<div class="example"><div class="a">${a}</div> + <div class="b">${b}</div><div class="equally-div"> = </div> <div class="sum">?</div></div>`;
var example1 = example.querySelector('.a');
var example2 = example.querySelector('.b');
var result = example.querySelector('.sum');
document.body.insertAdjacentElement('afterBegin', example);

var canvas = document.body.querySelector('.container');
var context = document.querySelector('.canvas').getContext('2d');
var px = 24.5;
var midArrow1 = (a * px) / 2; //координаты центра первой дуги
var inclineArrow1 = -20; // Изгиб первой дуги
var ArrowEnd1 = a * px + 16; // Координаты конца первой дуги
var midArrow2 = ((a * px) + ((a * px) + (b * px))) / 2; //Координаты центра второй дуги
var inclineArrow2 = -20 / 2; //Изгиб второй дуги
var ArrowEnd2 = (b * px + 12) + (a * px); // Координаты конца второй дуги


(function createArrow2() { //Рисуем первую дугу
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#a95788';
    context.moveTo(29, 78); //левый нижний угол canvas
    context.quadraticCurveTo(midArrow1, inclineArrow1, ArrowEnd1, 79);
    context.stroke();

    context.beginPath(); // Рисуем стрелку первой дуге
    context.moveTo(ArrowEnd1, 79);
    context.lineTo(ArrowEnd1 - 15, 79);
    context.moveTo(ArrowEnd1, 79);
    context.lineTo(ArrowEnd1, 72);
    context.stroke()
})();

function createArrow2() { //Рисуем вторую дугу
    context.beginPath();
    context.moveTo(ArrowEnd1, 79);
    context.quadraticCurveTo(midArrow2, inclineArrow2, ArrowEnd2, 85);
    context.stroke();

    context.beginPath(); // Рисуем стрелку второй дуге
    context.moveTo(ArrowEnd2, 85);
    context.lineTo(ArrowEnd2 - 15, 80);
    context.moveTo(ArrowEnd2, 85);
    context.lineTo(ArrowEnd2, 73);
    context.stroke();
};

//Inputs
var aInput = document.createElement('input');
aInput.setAttribute("type", "text");
aInput.classList.add('first_input');
canvas.append(aInput);
aInput.style.left = ((midArrow1 - aInput.clientWidth / 2) + 'px');
aInput.style.top = (inclineArrow1 + 'px'); //Расположение первого input над дугой

var bInput = document.createElement('input');
var SUM = document.createElement('input');
SUM.setAttribute("type", "text");
SUM.classList.add('SUM');

aInput.oninput = () =>checkValue(aInput, a, example1);
bInput.oninput = () =>checkValue(bInput, b, example2);
SUM.oninput = getSUM;