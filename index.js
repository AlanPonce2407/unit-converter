// QuerySelectors
const convertBtn = document.querySelector("#convertBtn");
const savedConversionBtn = document.querySelector("#savedConversionBtn");
const deleteConversionBtn = document.querySelector("#deleteConversionBtn");

// EventListeners
convertBtn.addEventListener("click", convert);
savedConversionBtn.addEventListener("click", showSavedConversions);
deleteConversionBtn.addEventListener("click", deleteSavedConversions);

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

// Función para convertir llamada por el botón en HTML
function convert() {
  const inputElement = document.getElementById("inputValue");
  const unitTypeElement = document.getElementById("unitType");
  const resultElement = document.getElementById("result");

  const inputValue = inputElement.value;
  const selectedUnitType = unitTypeElement.value;

  try {
    const unitType = searchUnitType(selectedUnitType);
    if (!unitType) {
      throw new Error(
        "Tipo de unidad inválido. Por favor ingrese una unidad válida."
      );
    }

    const conversionFunction = unitConverter.getConversionFunction(
      unitType.unitType
    );
    const result = `${inputValue} ${unitType.unitType} es igual a ${unitConverter.convert(
      parseFloat(inputValue),
      conversionFunction
    )} ${getTargetUnit(unitType.unitType)}.`;

    // Guardar la conversión en localStorage
    saveConversionToLocalStorage(result);

    resultElement.textContent = result;
  } catch (error) {
    resultElement.textContent = error.message;
  }
}


function updateRealTimeConversion() {
  const inputValue = inputElement.value;
  const selectedUnitType = document.getElementById("unitType").value;

  try {
    const unitType = searchUnitType(selectedUnitType);
    if (!unitType) {
      throw new Error(
        "Tipo de unidad inválido. Por favor ingrese una unidad válida."
      );
    }

    const conversionFunction = unitConverter.getConversionFunction(
      unitType.unitType
    );
    const realTimeResult = `${inputValue} ${unitType.unitType} es igual a ${unitConverter.convert(
      parseFloat(inputValue),
      conversionFunction
    )} ${getTargetUnit(unitType.unitType)}.`;

    // Obtener el contenedor existente y limpiarlo antes de agregar el nuevo input
    const realTimeConversionContainer = document.getElementById("realTimeConversion");
    realTimeConversionContainer.innerHTML = "";

  } catch (error) {
    // Manejar el error si es necesario
    console.error(error.message);
  }
}

function saveConversionToLocalStorage(conversion) {
  // Obtener las conversiones almacenadas actualmente
  const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];

  // Agregar la nueva conversión al array
  savedConversions.push(conversion);

  // Guardar el array actualizado en localStorage
  localStorage.setItem("savedConversions", JSON.stringify(savedConversions));
}

function showSavedConversions() {
  const savedConversions = JSON.parse(localStorage.getItem("savedConversions")) || [];
  const resultElement = document.getElementById("result");

  if (savedConversions.length > 0) {
    const formattedConversions = savedConversions.map((conversion, index) => `<p>${index + 1}. ${conversion}</p>`).join("");
    resultElement.innerHTML = formattedConversions;
  } else {
    resultElement.textContent = "No hay conversiones guardadas.";
  }
}

function deleteSavedConversions() {
  localStorage.removeItem("savedConversions");
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `<p>Elementos Borrados</p>`
}