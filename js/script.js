const langs = [
    "Hello World",
    "مرحبا بالعالم",
    "Salam Dünya",
    "Прывітанне Сусвет",
    "Здравей свят",
    "ওহে বিশ্ব",
    "Zdravo svijete",
    "Hola món",
    "Kumusta Kalibutan",
    "Ahoj světe",
    "Helo Byd",
    "Hej Verden",
    "Hallo Welt",
    "Γειά σου Κόσμε",
    "Hello World",
    "Hello World",
    "Hola Mundo",
    "Tere, Maailm",
    "Kaixo Mundua",
    "سلام دنیا",
    "Hei maailma",
    "Bonjour le monde",
    "Dia duit an Domhan",
    "Ola mundo",
    "હેલો વર્લ્ડ",
    "Sannu Duniya", "Привіт Світ",
    "ہیلو ورلڈ",
    "Salom Dunyo",
    "Chào thế giới",
    "העלא וועלט",
    "Mo ki O Ile Aiye",
    "你好，世界",
    "你好，世界",
    "你好，世界",
    "Sawubona Mhlaba"
];


let charSize = 20;
let fallRate = charSize / 2;
let streams;

class Char {
    constructor(value, x, y, speed) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw() {
        const flick = random(100);
        // 10 percent chance of flickering a number instead
        if (flick < 10) {
            fill(120, 30, 100);
            text(round(random(9)), this.x, this.y);
        } else {
            text(this.value, this.x, this.y);
        }
        this.y = this.y > height ? 0 : this.y + this.speed;
    }
}

class Stream {
    constructor(text, x) {
        const y = random(text.length);
        const speed = random(2, 10);
        this.chars = [];

        for (let i = text.length; i >= 0; i--) {
            this.chars.push(
                new Char(text[i], x, (y + text.length - i) * charSize, speed)
            );
        }
    }
    draw() {
        fill(120, 100, 100);
        this.chars.forEach((c, i) => {
            const lit = random(100);
            if (lit < 30) {
                if (i === this.chars.length - 1) {
                    fill(120, 30, 100);
                } else {
                    fill(120, 100, 90);
                }
            }

            c.draw();
        });
    }
}

function createStreams() {
    // create random streams from langs that span the width
    for (let i = 0; i < width; i += charSize) {
        streams.push(new Stream(random(langs), i));
    }
}

function reset() {
    streams = [];
    createStreams();
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    reset();
    frameRate(20);
    colorMode(HSB);
    noStroke();
    textSize(charSize);
    textFont("monospace");

    background(0);
}

function draw() {
    background(0, 0, 25, 0.8);
    streams.forEach((s) => s.draw());
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
    background(0);
    reset();
}


var range = document.querySelector(".slider");
var output = document.getElementById("demo");


output.innerHTML = range.value;

range.oninput = function () {
    output.innerHTML = this.value;
}
var button = document.querySelector(".generate");
var result = document.querySelector(".password");

button.addEventListener('click', () => {
    result.innerHTML = '';
    var upperCase = document.querySelector(".upperCase");
    var lawerCase = document.querySelector(".lawerCase");
    var number = document.querySelector(".number");

    for (let i = 0; i < range.value; i++) {
        let flag = generate(0, 2);
        if (upperCase.checked && flag == 1) {
            result.innerHTML += getUpper();
        } else if (lawerCase.checked && flag == 2) {
            result.innerHTML += getLawyer();
        } else if (number.checked && flag == 0) {
            result.innerHTML += generate(0, 9);
        } else {
            i--;
        }
    }

});

var copyPassword = document.querySelector(".copy");
copyPassword.addEventListener('click', () => {
    navigator.clipboard.writeText(result.innerHTML).then(() =>
        console.log("copy was successful!"));
});

function getUpper() {
    return String.fromCharCode(generate(65, 90));
}

function getLawyer() {
    return String.fromCharCode(generate(97, 122));
}

function generate(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}







