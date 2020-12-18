let anteckningslogg = []; // array för att innehålla anteckningar

// Objekt logg: för att skapa nya inlägg

function Logg(titel, content, bild, imp) {
  //konstruktör
  this.titel = titel;
  this.content = content;
  this.bild = bild;
  this.imp = imp;
  
}

// forminit kaller funktion addform vilket visar ny form

document
  .getElementById("newlogg")
  .addEventListener("click", function forminit() {
    addForm();
  });

function addForm() {
  // Skapa en ny form
  let form = document.createElement("form");
  form.id = "newloggform";
  //form.setAttribute("action", addToAnteckningslogg); ( inte gjort än)

  // Titel
  let titeldiv = document.createElement("div");
  let titellabel = document.createElement("label");
  let titelinput = document.createElement("input");
  titeldiv.appendChild(titellabel);
  titeldiv.appendChild(titelinput);
  titellabel.textContent = "Vänligen skriv en Titel";
  titellabel.setAttribute("for", "titel");
  titelinput.id = "titel";
  titelinput.setAttribute("type", "text");
  titelinput.setAttribute("name", "titel");
  titelinput.required = true;

  // Append titeldiv till form
  form.appendChild(titeldiv);

  //Content
  let contentdiv = document.createElement("div");
  let contentlabel = document.createElement("label");
  let contentinput = document.createElement("textarea");
  contentdiv.appendChild(contentlabel);
  contentdiv.appendChild(contentinput);
  contentlabel.textContent = "Inlägg.....";
  contentlabel.setAttribute("for", "content");
  contentinput.id = "content";
  contentinput.setAttribute("cols", 22);
  contentinput.setAttribute("rows", 10);
  contentinput.setAttribute("type", "text");
  contentinput.setAttribute("name", "content");

  contentinput.required = true;

  // Append contentdiv till form
  form.appendChild(contentdiv);

  //Bild-url länk
  let bilddiv = document.createElement("div");
  let bildlabel = document.createElement("label");
  let bildinput = document.createElement("input");
  bilddiv.appendChild(bildlabel);
  bilddiv.appendChild(bildinput);
  bildlabel.textContent = "Bild om Önskas";

  bildlabel.setAttribute("for", "bild");
  bildinput.id = "bild";
  bildinput.setAttribute("type", "bild");
  bildinput.setAttribute("name", "bild");
  bildinput.setAttribute("placeholder", "https://example.com");
  bildinput.required = false;

  // Append contentdiv till form
  form.appendChild(bilddiv);


  // Veckodag Paragraph
  let veckodagen = document.createElement("P");
  veckodagen.id = "veckodag";
  
  veckodagen.textContent = " Idag är " +  getveckodag();
  function getveckodag() {
  var d = new Date();
  var dag = new Array(7);
  dag[0] = "Söndag";
  dag[1] = "Måndag";
  dag[2] = "Tisdag";
  dag[3] = "Onsdag";
  dag[4] = "Torsdag";
  dag[5] = "Fredag";
  dag[6] = "Lördag";

  var n = dag[d.getDay()];
  return n;
  }
  
    
  // Append veckodagen till form
  form.appendChild(veckodagen);
  



  //Yes or No
  let impdiv = document.createElement("div");
  let implabel = document.createElement("label");
  let yesdiv = document.createElement("div");
  let yesinput = document.createElement("input");
  let yeslabel = document.createElement("label");
  let nodiv = document.createElement("div");
  let noinput = document.createElement("input");
  let nolabel = document.createElement("label");

  // Append impdiv till form
  form.appendChild(impdiv);

  //yesdiv.classList.add('radio');
  //nodiv.classList.add('radio');
  yesdiv.appendChild(yesinput);
  yesdiv.appendChild(yeslabel);
  nodiv.appendChild(noinput);
  nodiv.appendChild(nolabel);
  impdiv.appendChild(implabel);
  impdiv.appendChild(yesdiv);
  impdiv.appendChild(nodiv);
  implabel.textContent = "Viktigt?";
  yeslabel.textContent = "Yes";
  yeslabel.setAttribute("for", "yes");
  yesinput.setAttribute("type", "radio");
  yesinput.id = "yes";
  yesinput.setAttribute("name", "imp");
  yesinput.required = true;
  nolabel.textContent = "No";
  nolabel.setAttribute("for", "no");
  noinput.setAttribute("type", "radio");
  noinput.id = "no";
  noinput.setAttribute("name", "imp");
  noinput.required = true;

  //Done button
  let donebutton = document.createElement("button");
  donebutton.id = "done";
  donebutton.textContent = "Done";

  // Append donebutton till form
  form.appendChild(donebutton);

  //Remove button
  let removebutton = document.createElement("button");
  removebutton.setAttribute("type", "button");
  removebutton.addEventListener("click", () =>
    document.getElementById("newloggform").remove()
  );
  //Remove form if pressed
  removebutton.classList.add("removeform");

  // Append removebutton till form
  form.appendChild(removebutton);

  //Lägger fokus till klickade elementet
  titeldiv.addEventListener("click", () => {
    titelinput.focus();
  });
  contentdiv.addEventListener("click", () => {
    contentinput.focus();
  });
  bilddiv.addEventListener("click", () => {
    bildinput.focus();
  });

  //Append till "buttonandform" div
  document.getElementById("buttonandform").appendChild(form);

  //********Fuktioner för att göra element Dragable på skärmen:****////
  dragElement(document.getElementById("newloggform"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // Om header finns
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      //Om heardern inte finns
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Få mouse position på startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // När mouse rörs kllas ny fuktion:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Nya position räknas
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // sätter elements nya position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // Stoppar när mouse är up och inte rör sig
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

//********Fukntion för att lägga nya inlägg till arrayen anteckningslogg********//
// TO DO:
//function addToAnteckningslogg() 



//********Fukntion för att visa anteckning och uppdatera view********//

 //TO DO:
//function updateLoggBoken() 
  

//********Fukntion för att ta bort inlägget********//

// TO DO:
//function removeLogg(element) { //Tar bort inlägget

// anteckningslogg.splice(element.target.dataset.ID, 1); //Tar bort från arrayen
//  updateLoggBoken(); //uppdaterar view
//}; 




















  
