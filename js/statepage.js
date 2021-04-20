// 'use strict';
console.log('and again...');
const text = decodeURI(window.location.hash.substring(1));
document.title = text + ' - Shot Hero';
console.log(text);

let H1 = document.getElementById('choice');
H1.innerText = ' Shot Hero for ' + text;

let xhttps = new XMLHttpRequest();
// const url = "http://jservice.io/api/random";
const url = "https://www.vaccinespotter.org/api/v0/states.json";

function getData () {
    xhttps.open("GET", url, true);
    xhttps.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)  {
            let data = JSON.parse(this.responseText);
            displayState(getState(data));
            console.log(data);
        }
    }
    xhttps.send();
}

function getState(data) {
    let state;
    for (let i=0; i<data.length; ++i) {
        state = data[i];
        if (state.name == text) {
            return state;
        }
    }
}
 
function displayState(state) {
    let list = '';
    let brand;
    list += `<li> ${state.name} has ${new Intl.NumberFormat().format(state.store_count)} stores offering the vaccination.  These include... </li>`;
    for (let i=0; i< state.provider_brands.length; ++i) {
        brand = state.provider_brands[i];
        list += `<li class='brand'>${i+1} - ${brand.name} with ${brand.location_count}  `;
        if (brand.location_count == 1)  {
            list += `location<li>`;
        }   else    {
            list += `locations<li>`;
        }
        list += `<li class='appt'>To make an appointment at ${brand.name}, go to...  <br><a  href=${brand.url}> ${brand.url}</a></li>`
    }
    document.getElementById('statedata').innerHTML = `<ul> ${list} </ul>`;
    console.log(state.code, state.name, state.provider_brands[0].name);
    return state;
}

getData();

