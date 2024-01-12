// Objeto que contiene las funciones de conversión
const unitConverter = {
  convertKgToPounds: function (kilos) {
    return kilos * 2.20462;
  },
  convertLitersToGallons: function (liters) {
    return liters * 0.264172;
  },
  convertMetersToFeet: function (meters) {
    return meters * 3.28084;
  },
  convertKmToMiles: function (kilometers) {
    return kilometers * 0.621371;
  },
  convertGrToOz: function (grams) {
    return grams * 0.035274;
  },
};

// Array de tipos de unidades
const unitTypes = ["kg", "gr", "lt", "mt", "km"];

// Método para buscar una función de conversión por tipo de unidad
unitConverter.getConversionFunction = function (unitType) {
  switch (unitType.toLowerCase()) {
    case "kg":
      return this.convertKgToPounds;
    case "gr":
      return this.convertGrToOz;
    case "lt":
      return this.convertLitersToGallons;
    case "mt":
      return this.convertMetersToFeet;
    case "km":
      return this.convertKmToMiles;
    default:
      throw new Error(
        "Tipo de unidad inválido. Por favor ingrese una unidad válida."
      );
  }
};

// Método para realizar la conversión
unitConverter.convert = function (value, conversionFunction) {
  const result = conversionFunction(value);
  return result.toFixed(2);
};

// Método para obtener la unidad de destino
function getTargetUnit(unitType) {
  switch (unitType.toLowerCase()) {
    case "kg":
      return "libras";
    case "gr":
      return "onzas";
    case "lt":
      return "galones";
    case "mt":
      return "pies";
    case "km":
      return "millas";
    default:
      throw new Error(
        "Tipo de unidad inválido. Por favor ingrese una unidad válida."
      );
  }
}

// Método de búsqueda en el array de tipos de unidades
function searchUnitType(query) {
  const foundUnit = unitTypes.find(
    (unitType) => unitType.toLowerCase() === query.toLowerCase()
  );
  if (foundUnit) {
    const conversionDescription = getConversionDescription(foundUnit);
    return { unitType: foundUnit, conversionDescription };
  } else {
    return null;
  }
}

// Método de filtrado en el array de tipos de unidades
function filterUnitTypes(query) {
  const filteredTypes = unitTypes.filter((unitType) =>
    unitType.toLowerCase().includes(query.toLowerCase())
  );
  return filteredTypes;
}

// Método para obtener la descripción de la conversión
function getConversionDescription(unitType) {
  const targetUnit = getTargetUnit(unitType);
  return `de ${unitType} a ${targetUnit}`;
}

// Bucle principal
while (true) {
  // Prompt en la que el usuario ingresa un número
  let inputUnit;
  do {
    inputUnit = prompt("Ingrese el valor:");
    // Revisa si es un número
    if (isNaN(inputUnit)) {
      alert("Por favor ingrese un número válido.");
    }
  } while (isNaN(inputUnit));

  // Prompt que le pregunta al usuario qué tipo de unidad quiere convertir
  const userInput = prompt(
    `Ingrese el tipo de unidad o use 'search' o 'filter': ${unitTypes.join(
      ", "
    )}`
  );

  // Verifica si el usuario quiere buscar o filtrar
  if (userInput.toLowerCase() === "search") {
    const searchQuery = prompt("Ingrese el tipo de unidad a buscar:");
    const foundUnit = searchUnitType(searchQuery);
    if (foundUnit) {
      const result = `${inputUnit} ${
        foundUnit.unitType
      } es igual a ${unitConverter.convert(
        parseFloat(inputUnit),
        unitConverter.getConversionFunction(foundUnit.unitType)
      )} ${getTargetUnit(foundUnit.unitType)}.`;
      console.log(result);
      alert(
        `Tipo de unidad encontrado: ${foundUnit.unitType}, ${foundUnit.conversionDescription}`
      );
    } else {
      alert("Tipo de unidad no encontrado.");
    }
  } else if (userInput.toLowerCase() === "filter") {
    const filterQuery = prompt(
      "Ingrese el texto para filtrar tipos de unidad:"
    );
    const filteredUnits = filterUnitTypes(filterQuery);
    if (filteredUnits.length > 0) {
      alert(`Tipos de unidad filtrados: ${filteredUnits.join(", ")}`);
    } else {
      alert("Ningún tipo de unidad encontrado.");
    }
  } else {
    try {
      // Verifica si el tipo de unidad ingresado está en el array
      const unitType = searchUnitType(userInput);
      if (!unitType) {
        throw new Error(
          "Tipo de unidad inválido. Por favor ingrese una unidad válida."
        );
      }

      // Obtiene la función de conversión según el tipo de unidad
      const conversionFunction = unitConverter.getConversionFunction(
        unitType.unitType
      );

      // Realiza la conversión
      const result = `${inputUnit} ${
        unitType.unitType
      } es igual a ${unitConverter.convert(
        parseFloat(inputUnit),
        conversionFunction
      )} ${getTargetUnit(unitType.unitType)}.`;
      console.log(result);
      alert(result);
    } catch (error) {
      alert(error.message);
    }
  }

  // Pregunta si el usuario desea realizar otra conversión
  const continuePrompt = confirm("¿Desea realizar otra conversión?");
  if (!continuePrompt) {
    break; // Sale del bucle si el usuario elige no continuar
  }
}
