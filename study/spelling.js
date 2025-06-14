// tabs
function tab(tab) {
  var tabs = document.querySelectorAll(".pgtb");
  // remove the selected class from all tabs
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('selected');
  }
  // add the selected class to the clicked tab
  document.getElementById(tab).classList.add('selected');
  var pages = document.querySelectorAll(".page");
  // hide all pages
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  // show the page corresponding to the clicked tab
  document.getElementById(tab + "Pg").style.display = "block";
}
// set the default tab to the first one
tab("li");
document.getElementsByClassName("pgtb")[0].classList.add('selected');

if (!localStorage.getItem('lists')) {
  localStorage.setItem('lists', JSON.stringify({}));
}
var lists = JSON.parse(localStorage.getItem('lists'));
console.log(lists);

// load the lists
function loadLists() {
  for (var i = 0; i < Object.keys(lists).length; i++) {
    // create element
    var listItem = document.createElement("li");
    listItem.className = "file";
    // unique id for each list item
    listItem.id = "list" + i;
    // click function
    listItem.onclick = "displayList(" + i + ");";
    // name the lists
    var listNames = Object.keys(lists);
    listItem.innerHTML = listNames[i];
    // append element
    document.getElementById("fileList").appendChild(listItem);
  }
}
loadLists();

function displayList() {
  console.log("ill do it later");
}

// parse new list file
function parseFile() {
  var lines;
  var input = document.getElementById('fileInput');
  // check if the input is valid
  if (!input || !input.files || !input.files[0]) return;
  var file = input.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var text = e.target.result;
    lines = text.split(/\r?\n/);
    // lines is now an array of strings, one for each line
    for (var i = 0; i < lines.length; i++) {
      var allSpellings = lines[i].split(':')[0]; // separate all the spellings which are before the colon
      var definition = lines[i].split(':').slice(1).join(':').trim(); // separate the word definition, restore colons that were removed, and remove whitespace
      var spellingArray = allSpellings.split('/'); // separate each alternate spelling by the slash
      //create an object for each word
      lines[i] = {
        "spellings": spellingArray,
        "definition": definition
      };
    }
    // create the spelling list inside of an object
    console.log(lines);

    lists[input.value.slice(12).split(".")[0]] = lines;
    console.log(lists);
    // save the list and update list menu
    localStorage.setItem('lists', JSON.stringify(lists));
    loadLists();
  };
  reader.readAsText(file);
}