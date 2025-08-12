document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

import {parts} from "../data/data-services.json"
console.log(parts)

import {url} from "../data/data-services.json"
console.log(url)

//---------reference where we display the item

const showHere = document.querySelector("#showHere")
//---------reference to the HTML dialig element

const mydialog = document.querySelector("#mydialog")
const mytittle = document.querySelector("#mydialog h2")
const myinfo = document.querySelector("#mydialo p")
const myclose = document.querySelector("#mydialog button")
myclose.addEventListener("click", () => mydialog.closest())

//-----------loop through the array of json items---

function displayItems(data) {

}   // end function
 