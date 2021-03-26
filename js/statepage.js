console.log('and again...');

const text = window.location.hash.substring(1);
console.log(text);
document.title = text + ' - Shot Hero';

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
    console.log('the state is ' + text);
    drop.appendChild(node).appendChild;
    drop.innerHTML = 'The selected text is ' + text;
    for (let i=0; i<data.length; ++i) {
        state = data[i];
        if (state.name == text) {
            for (let prop in state) {
                string = `The state ${prop} is ${state[prop]}`;
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

function selectData () {
    document.getElementById('submit').onclick = function() {
        let e = document.getElementById("state");
        let text = e.options[e.selectedIndex].text;
        document.getElementById("container").innerHTML = 'The selected text is ' + text;
        window.location.href="statepage.html";
    }
}
  
getData();

