function getNum(name) {
    for (var i in elements) {
        if (elements[i].symbol == name) {
            return (elements[i].number);
            break;
        }
    }
}

function getName(num) {
    for (var i in elements) {
        if (elements[i].number == num) {
            return (elements[i].symbol);
            break;
        }
    }
}

function cX() {
    var X = document.getElementById("X").value;
    var Z = document.getElementById("Z").value;
    Z = getNum(X);

    document.getElementById("mass_number").innerHTML = Math.round(elements[Z - 1].atomic_mass);
    document.getElementById("atomic_number").innerHTML = Z.toString();
    document.getElementById("symbol").innerHTML = '<br><h1>' + X + '</h1><br>'
    document.getElementById("name").innerHTML = elements[Z - 1].name
    document.getElementById("info").innerHTML = elements[Z - 1].summary
    if (elements[Z - 1].electron_configuration == elements[Z - 1].electron_configuration_semantic) {
        document.getElementById("config").innerHTML = '<br>Configuration<br>' + elements[Z - 1].electron_configuration
    } else {
        document.getElementById("config").innerHTML = '<br>Configuration<br>' + elements[Z - 1].electron_configuration + '<br>or<br>' + elements[Z - 1].electron_configuration_semantic
    }
}

function cZ() {
    var X = document.getElementById("X").value;
    var Z = document.getElementById("Z").value;
    X = getName(Z);

    document.getElementById("mass_number").innerHTML = Math.round(elements[Z - 1].atomic_mass);
    document.getElementById("atomic_number").innerHTML = Z.toString();
    document.getElementById("symbol").innerHTML = '<br><h1>' + X + '</h1><br>'
    document.getElementById("name").innerHTML = elements[Z - 1].name
    document.getElementById("info").innerHTML = elements[Z - 1].summary
    if (elements[Z - 1].electron_configuration == elements[Z - 1].electron_configuration_semantic) {
        document.getElementById("config").innerHTML = '<br>Configuration<br>' + elements[Z - 1].electron_configuration
    } else {
        document.getElementById("config").innerHTML = '<br>Configuration<br>' + elements[Z - 1].electron_configuration + '<br>or<br>' + elements[Z - 1].electron_configuration_semantic
    }
}