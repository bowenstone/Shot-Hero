console.log('and again...');

const text = window.location.hash.substring(1);
console.log(text);
document.title = text + ' - Shot Hero';

let H1 = document.getElementById('choice');
H1.innerText = 'Shot Hero - ' + text;

let xhttps = new XMLHttpRequest();
// const url = "http://jservice.io/api/random";
const url = "https://www.vaccinespotter.org/api/v0/states.json";

function getData () {
    xhttps.open("GET", url, true);
    xhttps.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)  {
            let data = JSON.parse(this.responseText);
            displayData(data);
            console.log(data);
        }
    }
    xhttps.send();
}

function displayData(data) {
    let state;
    let string;
    let drop = document.getElementById('container');
    let holder = document.getElementById('holder');
    let parent = document.getElementById('statedata');
    let node = document.createElement("LI");
    // drop.appendChild(node).appendChild;
    for (let i=0; i<data.length; ++i) {
        state = data[i];
        if (state.name == text) {
            for (let prop in state) {
                string = `${text}'s ${prop} is ${state[prop]}`;
                let textnode = document.createTextNode(string);  
                node.appendChild(textnode);   
                parent.appendChild(node);     
                console.log(`${prop} is ${state[prop]}`);
            }
            console.log(i, state.code, state.name, state.provider_brands[0].name);
            break;
        }
    }
}

  
getData();

