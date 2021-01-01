function getNum(name) {
    for (var i in elements) {
        if (elements[i].symbol == name) {
            return (elements[i].number);
        }
    }
}

function getName(num) {
    for (var i in elements) {
        if (elements[i].number == num) {
            return (elements[i].symbol);
        }
    }
}

function pow(arr) {
    args = arr.split(' ');
    out = ''
    for (i in args) {
        if (args[i].endsWith(']')) {
            out = out + ' ' + args[i];
        } else {
            out = out + ' ' + args[i].slice(0, 2) + '<sup>' + args[i].slice(2) + '</sup>';
        }
    }
    return out;
}


function setup() {
    var options = '';
    for (var i = 0; i < elements.length; i++)
        options += '<option value="' + elements[i].symbol + '" />';
    document.getElementById('elem').innerHTML = options;
    generateTable();
}

function update(sym, input) {

    var selected = document.getElementsByClassName("selected");
    while (selected.length) {
        selected[0].className = selected[0].className.replace(/\bselected\b/g, "");
    }

    if (sym) {
        X = sym;
        document.getElementById("X").value = sym;
        document.getElementById("Z").value = getNum(X);
    } else {
        if (input == 'X') {
            X = document.getElementById("X").value;
            document.getElementById("Z").value = getNum(X);
        } else if (input == 'Z') {
            update(elements[document.getElementById("Z").value - 1].symbol);
        }
    }

    ptjs = elements[getNum(X) - 1];

    document.getElementById("mass_number").innerHTML = Math.round(ptjs.atomic_mass);
    document.getElementById("atomic_number").innerHTML = ptjs.number;
    document.getElementById("symbol").innerHTML = `<br><h1 style="color:#${ptjs.cpkhex}; text-shadow: 0px 0px 5px; ">` + getName(getNum(X)) + '</h1><br>'

    document.getElementById("elemname").innerHTML = ptjs.name;
    document.getElementById("elemname").setAttribute('href', ptjs.source);
    document.getElementById("category").innerHTML = ptjs.category;
    document.getElementById("box").setAttribute('style', `background-color:#${intToRGB(hashCode(ptjs.category))};`);
    document.getElementById("summary").innerHTML = ptjs.summary;

    //general info
    if (ptjs.electronegativity_pauling) document.getElementById("en").innerHTML = ptjs.electronegativity_pauling;
    else document.getElementById("en").innerHTML = 'none';
    if (ptjs.electron_affinity) document.getElementById("ea").innerHTML = ptjs.electron_affinity;
    else document.getElementById("ea").innerHTML = 'none';
    if (ptjs.melt) document.getElementById("mp").innerHTML = ptjs.melt;
    else document.getElementById("mp").innerHTML = 'none';
    if (ptjs.boil) document.getElementById("bp").innerHTML = ptjs.boil;
    else document.getElementById("bp").innerHTML = 'none';
    if (ptjs.density) document.getElementById("density").innerHTML = ptjs.density;
    else document.getElementById("density").innerHTML = 'none';
    if (ptjs.molar_heat) document.getElementById("mh").innerHTML = ptjs.molar_heat;
    else document.getElementById("mh").innerHTML = 'none';

    if (ptjs.electron_configuration == ptjs.electron_configuration_semantic) {
        document.getElementById("config").innerHTML = pow(ptjs.electron_configuration);
    } else {
        document.getElementById("config").innerHTML = pow(ptjs.electron_configuration) + '<br>or<br>' + pow(ptjs.electron_configuration_semantic)
    }

    if (ptjs.ionization_energies.length != 0) document.getElementById("Ie").innerHTML = ptjs.ionization_energies.join('<br>');
    else document.getElementById("Ie").innerHTML = "none";

    //shells

    document.getElementById("shells").innerHTML = ptjs.shells.join(' ') + "<br>";

    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', document.getElementById("shells").clientWidth * 0.9);
    canvas.setAttribute('height', document.getElementById("shells").clientWidth * 0.9);

    var size = document.getElementById("shells").clientWidth * 0.9 / ptjs.shells.length;

    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    //nuclei
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, size * 0.2, 0, 2 * Math.PI);
    if (ptjs.cpkhex != null) ctx.fillStyle = '#' + ptjs.cpkhex;
    else ctx.fillStyle = 'black'
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 4;
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = size / 4 + "px codesaver";
    ctx.textAlign = "center";
    ctx.fillText(ptjs.symbol, canvas.width / 2, (canvas.height / 2) + size / 12);
    ctx.shadowBlur = 0;

    //shells
    for (i = 0; i < ptjs.shells.length; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, ((i + 1) * size / 5) + size * 0.2, 0, 2 * Math.PI);
        ctx.stroke();
        for (a = 0; a < ptjs.shells[i]; a++) {
            drawElectrons(canvas.width / 2, canvas.height / 2, ((i + 1) * size / 5) + size * 0.2, a * 360 / ptjs.shells[i] + 90, size / 20);
        }
    }

    document.getElementById("shells").appendChild(canvas);

}

function generateTable() {
    var table = document.getElementById('pdt');
    for (i = 1; i < 11; i++) {
        var newRow = document.createElement('tr');
        for (a = 1; a < 19; a++) {
            for (g in elements) {
                if (elements[g].ypos == i && elements[g].xpos == a) {
                    var newCell = document.createElement("td");
                    newCell.textContent = elements[g].symbol;
                    newCell.setAttribute('onclick', 'update("' + elements[g].symbol + '"); this.classList.add("selected");');
                    if (elements[g].cpkhex == null) newCell.setAttribute('style', `color:transparent; border: 2px solid #${intToRGB(hashCode(elements[g].category))}; text-shadow: 1px 1px 0px black; background-color: white;`);
                    else newCell.setAttribute('style', `color: white; border: 2px solid #${intToRGB(hashCode(elements[g].category))}; text-shadow: 1px 1px 0px black; background-color: #${elements[g].cpkhex};`);
                    newCell.id = `items`;
                    newCell.classList.add(elements[g].symbol);
                    newRow.appendChild(newCell);
                    console.log(elements[g].symbol);
                    break;
                } else {
                    var newCell = document.createElement("td");
                    newCell.setAttribute('border', '0px');
                    newCell.id = 'tdnull';
                    newCell.textContent = '';
                }
            }
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
}

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function drawElectrons(x, y, length, angle, size) {
    var radians = angle / 180 * Math.PI;
    var endX = x + length * Math.cos(radians);
    var endY = y - length * Math.sin(radians);

    ctx.beginPath();
    ctx.arc(endX, endY, size, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}