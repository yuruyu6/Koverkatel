//Created by @grooo0
//Created by @grooo0
//Created by @grooo0

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getRecordsValue(value) {
  document.getElementById("recordsNumber").value = value;
}

function doMainAction() {
  let resultString = "";
  createStringArray().forEach((element) => {
    resultString += element + "\n";
  });
  document.getElementById("resultOutput").value = resultString;
}

function createStringArray() {
  var selectedMode = getRadioValue("options");
  let dataString = document.getElementById("dataString").value;
  var stringArray = [];
  var newString = "";
  for (var i = 0; i < document.getElementById("recordsNumber").value; i++) {
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
  if (!isNaN(symbolG)) {
    return symbolG + getRandomPunct();
  } else {
    for (let i = 0; i < letterDict.length; i++) {
      if (letterDict[i][0] === symbolG) {
        return letterDict[i][1];
      }
    }
    return symbolG;
  }
}

var getRandomPunct = () =>
  punctDict[Math.floor(Math.random() * punctDict.length)];

function copy() {
  let button = document.getElementById("copyData");
  let textarea = document.getElementById("resultOutput");
  textarea.select();
  document.execCommand("copy");
  button.textContent = "Скопировано!";
  setTimeout(function () {
    button.textContent = "Скопировать";
  }, 1750);
}

let punctDict = [".", "-", "/"];

let letterDict = [
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
  ["S", "С"],
  ["s", "с"],
  ["v", "w"],
  ["K", "Q"],
  ["k", "q"],
  ["V", "W"],
  ["Y", "У"],
  ["y", "У"],
  ["W", "VV"],
  ["w", "vv"],
  ["Y", "U"],
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
