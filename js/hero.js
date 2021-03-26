console.log('and again...');

let xhttps = new XMLHttpRequest();
// const url = "http://jservice.io/api/random";
const url = "https://www.vaccinespotter.org/api/v0/states.json";

function getData () {
    xhttps.open("GET", url, true);
    xhttps.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)  {
            let data = JSON.parse(this.responseText);
            states(data);
        }
    }
    xhttps.send();
}

function showlist(select)  {
    let label = document.createElement("label");
    label.innerHTML = "Select a state from the dropdown list ...  >>   ";
    label.htmlFor = "state";
    document.getElementById("dropdown").appendChild(label).appendChild(select);
 }

function selectData () {
    document.getElementById('submit').onclick = function() {
        let e = document.getElementById("state");
        let text = e.options[e.selectedIndex].text;
        // document.getElementById("container").innerHTML = 'The selected text is ' + text;
        window.location.href="statepage.html#"+text;
    }
}

function append(select, option, inText) {
    let drop = document.getElementById('dropdown');
    option.innerText = inText;
    drop.appendChild(option).appendChild;
    select.appendChild(option);
    return;
}

function states (data)   {
    let select = document.createElement("select");
    let option= document.createElement('option');
    append(select, option, "Select a State");
    select.name = "state";
    select.id = "state";
    data.forEach (name =>    {
        option = document.createElement('option');
        option.value = name.name;
        option.text = name.name; 
        append(select, option, name.name);
    });
    showlist(select);
    selectData();
}

/* toggle between hiding and showing the dropdown content on click*/
function dropMenu() {
    document.getElementById("dropdown").classList.toggle("show");
}
  
getData();
