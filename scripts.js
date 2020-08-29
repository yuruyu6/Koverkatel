//Created by @grooo0
//Created by @grooo0
//Created by @grooo0
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getRecordsValue(value) {
  document.getElementById("recordsNumber").value = value;
}

function useTransliteration(str) {
  const ru = new Map([
    ["а", "a"],
    ["б", "b"],
    ["в", "v"],
    ["г", "g"],
    ["д", "d"],
    ["е", "e"],
    ["є", "e"],
    ["ё", "e"],
    ["ж", "j"],
    ["з", "z"],
    ["и", "i"],
    ["ї", "yi"],
    ["й", "i"],
    ["к", "k"],
    ["л", "l"],
    ["м", "m"],
    ["н", "n"],
    ["о", "o"],
    ["п", "p"],
    ["р", "r"],
    ["с", "s"],
    ["т", "t"],
    ["у", "u"],
    ["ф", "f"],
    ["х", "h"],
    ["ц", "c"],
    ["ч", "ch"],
    ["ш", "sh"],
    ["щ", "shch"],
    ["ы", "y"],
    ["э", "e"],
    ["ю", "u"],
    ["я", "ya"],
  ]);
  str = str.replace(/[ъь]+/g, "");
  return Array.from(str).reduce(
    (s, l) =>
      s +
      (ru.get(l) ||
        (ru.get(l.toLowerCase()) === undefined && l) ||
        ru.get(l.toLowerCase()).toUpperCase()),
    ""
  );
}

window.onload = function () {
  handleButton("startProcess", "dataString", "resultOutput");
  handleButton("startProcess", "dataStringReceiver", "resultOutputReceiver");
  handleButton(
    "startProcess",
    "dataStringPhoneNumber",
    "resultOutputPhoneNumber"
  );
  handleButton("startProcess", "dataStringAdress", "resultOutputAdress");
  handleCopyButton("copyData", "resultOutput");
  handleCopyButton("copyDataReceiver", "resultOutputReceiver");
  handleCopyButton("copyDataPhoneNumber", "resultOutputPhoneNumber");
  handleCopyButton("copyDataAdress", "resultOutputAdress");
};

function handleButton(buttonId, dataStringId, resultOutputId) {
  var inputElement = document.getElementById(buttonId);
  if (inputElement)
    inputElement.addEventListener("click", function () {
      doMainAction(dataStringId, resultOutputId);
    });
}

function doMainAction(dataStringId, resultOutputId) {
  let resultString = "";
  let dataString = document.getElementById(dataStringId);
  if (dataString) dataString = dataString.value;
  else return;
  createStringArray(dataString).forEach((element) => {
    resultString += element + "\n";
  });
  document.getElementById(resultOutputId).value = resultString;
}

function createStringArray(dataString) {
  const defaultValue = 1;
  var selectedMode = getRadioValue("options");
  var stringArray = [];
  var newString = "";
  let recordsNumber = document.getElementById("recordsNumber")
    ? document.getElementById("recordsNumber").value
    : defaultValue;
  const cyrillicPattern = /[\u0400-\u04FF]/;

  if (cyrillicPattern.test(dataString)) {
    dataString = useTransliteration(dataString);
  }

  for (var i = 0; i < recordsNumber; i++) {
    for (var j = 0; j < dataString.length; j++) {
      if (document.getElementById("useLetterChanger").checked) {
        if (Math.random() < selectedMode)
          newString += changeSymbol(dataString.charAt(j));
        else newString += dataString.charAt(j);
      } else {
        if (Math.random() < selectedMode)
          newString += dataString.charAt(j) + getRandomPunct();
        else newString += dataString.charAt(j);
      }
    }
    stringArray.push(newString);
    newString = "";
  }
  stringArray = stringArray.filter(onlyUnique);
  return stringArray;
}

function getRadioValue(theRadioGroup) {
  var elements = document.getElementsByName(theRadioGroup);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      return elements[i].value;
    }
  }
}

function changeSymbol(symbolG) {
  var selectedMethodIndex = document.getElementById("choose-method")
    .selectedIndex;
  if (!isNaN(symbolG)) {
    return symbolG + getRandomPunct();
  } else {
    switch (selectedMethodIndex) {
      case 0:
        return getChangedSymbolFromDict(letterDict0, symbolG);
      case 1:
        return getChangedSymbolFromDict(letterDict1, symbolG);
      default:
        console.log("The selected method is not available");
        break;
    }
    getChangedSymbolFromDict(letterDict1, symbolG);
  }
  return symbolG;
}

function getChangedSymbolFromDict(dict, symbol) {
  for (let i = 0; i < dict.length; i++) {
    if (dict[i][0] === symbol) {
      return dict[i][1];
    }
  }
  return symbol;
}

var getRandomPunct = () =>
  punctDict[Math.floor(Math.random() * punctDict.length)];

function handleCopyButton(buttonId, resultOutputId) {
  var inputElement = document.getElementById(buttonId);
  if (inputElement)
    inputElement.addEventListener("click", function () {
      copy(inputElement, resultOutputId);
    });
}

function copy(button, resultOutputId) {
  let textarea = document.getElementById(resultOutputId);
  textarea.select();
  document.execCommand("copy");
  button.textContent = "Скопировано!";
  setTimeout(function () {
    button.textContent = "Скопировать";
  }, 1750);
}

let punctDict = ["-", "/"];

let letterDict0 = [
  ["A", "/\\"],
  ["a", "@"],
  ["B", "8"],
  ["b", "6"],
  ["D", "|)"],
  ["d", "cI"],
  ["E", "[="],
  ["e", "3"],
  ["F", "PH"],
  ["f", "ph"],
  ["G", "6"],
  ["P", "|>"],
  ["Q", "O."],
  ["S", "$"],
  ["s", "$"],
  ["v", "\\/"],
  ["K", "|<"],
  ["k", "|<"],
  ["V", "\\/"],
  ["Y", "Ј"],
  ["y", "j"],
  ["q", "k"],
  ["W", "VV"],
  ["X", "}{"],
  ["x", "h"],
  ["U", "J"],
  ["I", "l"],
  ["i", "l"],
  ["l", "I"],
  ["L", "|_"],
  ["M", "|Y|"],
  ["m", "nn"],
  ["N", "//"],
  ["o", "()"],
  ["O", "()"],
  ["H", "|-|"],
];

let letterDict1 = [
  ["A", "А"],
  ["a", "а"],
  ["B", "8"],
  ["b", "ь"],
  ["D", "|)"],
  ["d", "cI"],
  ["E", "I"],
  ["e", "і"],
  ["F", "PH"],
  ["f", "ph"],
  ["G", "J"],
  ["P", "Р"],
  ["Q", "O."],
  ["q", "k"],
  ["S", "С"],
  ["s", "с"],
  ["v", "w"],
  ["K", "Q"],
  ["k", "q"],
  ["V", "W"],
  ["Y", "J"],
  ["y", "у"],
  ["W", "VV"],
  ["w", "vv"],
  ["X", "Х"],
  ["U", "J"],
  ["I", "l"],
  ["i", "l"],
  ["l", "I"],
  ["L", "|_"],
  ["M", "М"],
  ["m", "nn"],
  ["N", "//"],
  ["o", "о"],
  ["O", "О"],
  ["H", "Н"],
];

//Created by @grooo0
//Created by @grooo0
//Created by @grooo0
