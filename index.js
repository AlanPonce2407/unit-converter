// Funciones que convierten las unidades
function convertKgToPounds(kilos) {
    return kilos * 2.20462;
}

function convertLitersToGallons(liters) {
    return liters * 0.264172;
}

function convertMetersToFeet(meters) {
    return meters * 3.28084;
}

function convertKmToMiles(kilometers) {
    return kilometers * 0.621371;
}

function convertGrToOz(grams) {
    return grams * 0.035274;
}

// Funcion principal
function unitConverter() {
    // Prompt en la que el usuario ingresa un número
    let inputUnit;
    do {
        inputUnit = prompt("Ingrese el valor:");
        // Revisa si es un número
        if (isNaN(inputUnit)) {
            alert("Por favor ingrese un número válido.");
        }
    } while (isNaN(inputUnit));

    // Prompt que le pregunta al usuario que tipo de unidad quiere convertir
    const unitType = prompt("Ingrese el tipo de unidad, 'kg' para kilogramos, 'lt' para litros, 'mt' para metros, 'km' para kilómetros, 'gr' para gramos")

    // Convierte la entrada basada en el tipo de unidad
    let result;
    switch (unitType.toLocaleLowerCase()){
        case 'kg':
            result = convertKgToPounds(parseFloat(inputUnit));
            alert(`${inputUnit} kilogramo/s es igual a ${result.toFixed(2)} libras` )
            break;
        case 'gr':
            result = convertGrToOz(parseFloat(inputUnit));
            alert(`${inputUnit} gramo/s es igual a ${result.toFixed(2)} onzas`)
            break;
        case 'lt':
            result = convertLitersToGallons(parseFloat(inputUnit));
            alert(`${inputUnit} litro/s es igual a ${result.toFixed(2)} galones.`)
            break;
        case 'mt':
            result = convertMetersToFeet(parseFloat(inputUnit));
            alert(`${inputUnit} metro/s es igual a ${result.toFixed(2)} pies.`)
            break;
        case 'km':
            result = convertKmToMiles(parseFloat(inputUnit));
            alert(`${inputUnit} kilómetro/s es igual a ${result.toFixed(2)} millas.`)
            break;
        default:
            alert("Tipo de unidad inválido. Por favor ingrese una unidad válida.")
    }

}

// Corre el conversor de unidades
unitConverter();

