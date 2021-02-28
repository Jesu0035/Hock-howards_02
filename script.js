"use strict";

window.addEventListener("DOMContentLoaded", start);

const Student = {
firstName: "",
lastName: "", 
nickname: "",
imageFilename: "",
house: "",
};

const allStudents = [];
const settings = {
filterBy: "all",
sortBy: "firstname",
 sortDir: "asc",
};
/* const createModal = document.querySelector(".modal"); */

function start() {
 registerButtons();
 loadJSON();
}

function registerButtons() {
document.querySelectorAll("[data-action='filter']")
.forEach((button) => button.addEventListener("click", selectFilter));

 document.querySelectorAll("[data-action='sort']").forEach((button) => button.addEventListener("click", selectSort));

}

function loadJSON() {
 fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
jsonData.forEach((jsonObject) => {
const student = Object.create(Student);

const fullNameTrim = jsonObject.fullname.trim();
const firstSpace = fullNameTrim.indexOf(" ");
const lastSpace = fullNameTrim.lastIndexOf(" ");

let firstName = fullNameTrim.substring(0, firstSpace);
let firstNameTrim = firstName.trim();
let firstNameFinal = firstNameTrim.charAt(0).toUpperCase() + firstNameTrim.substring(1).toLowerCase();

let middleName = fullNameTrim.substring(firstSpace + 1, lastSpace);
let middleNameTrim = middleName.trim();
let middleNameFinal = middleNameTrim.charAt(0).toUpperCase() + middleNameTrim.substring(1).toLowerCase();

    
let lastName = fullNameTrim.substring(lastSpace);
let lastNameTrim = lastName.trim();
let lastNameFinal = lastNameTrim.charAt(0).toUpperCase() + lastNameTrim.substring(1).toLowerCase();

const house = jsonObject.house.trim();
const houseFinal = house[0].toUpperCase() + house.substring(1).toLowerCase();


student.firstName = firstNameFinal;
student.middleName = middleNameFinal;
student.lastName = lastNameFinal;
  
student.house = houseFinal;
allStudents.push(student);
});

console.log(allStudents);
displayList(allStudents);

}


function selectFilter(event) {
const filter = event.target.dataset.filter;
  
setFilter(filter);
}

function setFilter(filter) {
  settings.filterBy = filter;
  buildList();
}

function filterList(filteredList) {
if (settings.filterBy === "griff") {
    filteredList = allStudents.filter(isGriff);
} else if (settings.filterBy === "huff") {
    filteredList = allStudents.filter(isHuff);
} else if (settings.filterBy === "rav") {
    filteredList = allStudents.filter(isRav);
} else if (settings.filterBy === "sly") {
    filteredList = allStudents.filter(isSly);
}
return filteredList;
  
}

function isGriff(student) {
return(student.house === "Gryffindor") 
    
}

function isHuff(student) {
return(student.house === "Hufflepuff") 
  
}

function isRav(student) {
 return (student.house === "Ravenclaw") 
}

function isSly(student) {
return (student.house === "Slytherin")

}

function selectSort(event) {

const sortBy = event.target.dataset.sort;
const sortDir = event.target.dataset.sortDirection;

//toggle direction
if (sortDir === "asc") {
event.target.dataset.sortDirection = "desc";
} else {
event.target.dataset.sortDirection = "asc";
}
//console.log(`User selected ${sortBy} - ${sortDir}`);
setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  buildList();
}

function sortList(sortedList) {
let direction = 1;
if (settings.sortDir === "desc") {
 direction = -1;
} else {
settings.direction = 1;
  }

sortedList = sortedList.sort(sortByProperty);

function sortByProperty(nameA, nameB) {

    console.log(`sortBy is ${settings.sortBy}`);
    if (nameA[settings.sortBy] < nameB[settings.sortBy]) {
      console.log(nameA);
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

return sortedList;

}

function buildList() {
const currentList = filterList(allStudents);
const sortedList = sortList(currentList);

  displayList(sortedList);
}

function displayList(allStudents) {
document.querySelector("#list tbody").innerHTML = "";
allStudents.forEach(displayStudent);
}


function displayStudent(student) {
  
const firstLetter = student.firstName.substring(0, 1);
const clone = document.querySelector("template#student").content.cloneNode(true);

clone.querySelector("[data-field=firstName]").textContent = student.firstName;

if (student.middleName.includes('"')) {
    clone.querySelector("[data-field=nickName]").textContent = student.middleName;
    clone.querySelector("[data-field=middleName]").textContent = " ";
} else {
    clone.querySelector("[data-field=middleName]").textContent = student.middleName;
    clone.querySelector("[data-field=nickName]").textContent = " ";
  }

clone.querySelector("[data-field=lastName]").textContent = student.lastName;
 clone.querySelector("[data-field=avatar]").children[0].src =
    "images/" + student.lastName + "_" + firstLetter + ".png"; 
  clone.querySelector("[data-field=house]").textContent = student.house;
/* ----------- modal doesnt work properly, when click --------- */
 
/* const button = clone.querySelector("#myBtn");

const modal = document.querySelector('.modal');
button.addEventListener('click',  e =>{
 createModal (eachStudent, modal) 
  modal.classList.toggle('active')
  
  })

 function createModal(){
   const modal = document.querySelector('.modal');

 }
  modal.style.display = 'block'; */
    /* ........... modal----------- */

  document.querySelector("#list tbody").appendChild(clone);

 /*   modal.addEventListener('click', () => {
    modal.style.display = 'none';
}) */ 
};
  