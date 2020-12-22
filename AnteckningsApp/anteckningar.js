let anteckningslogg = []; // array för att innehålla anteckningar

// Objekt logg: för att skapa nya inlägg

function Logg(titel, content, viktigt) {
  //konstruktör
  this.titel = titel;
  this.content = content;
  this.viktigt = viktigt;
}

// AddForm för att framkalla form när man klickar på nyttinlägg knappen

document.getElementById("newlogg").addEventListener("click", addForm);

function addForm() {
  // Skapa en ny form
  let form = document.createElement("form");
  form.id = "newloggform";
  //form.setAttribute("action", addToAnteckningslogg);

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

  // Veckodag Paragraph
  let veckodagen = document.createElement("P");
  veckodagen.id = "veckodag";

  veckodagen.textContent = " Idag är " + getveckodag();
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
  implabel.textContent = "Ikke Viktigt?";
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
  donebutton.addEventListener("click", addToAnteckningslogg);

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

function addToAnteckningslogg() {
  let titel = document.getElementById("newloggform").elements[0].value;
  let content = document.getElementById("newloggform").elements[1].value;

  let viktigt;

  if (document.getElementById("newloggform").elements[3].checked) {
    viktigt = true;
  } else if (document.getElementById("newloggform").elements[4].checked) {
    viktigt = false;
  }
  const logg = new Logg(titel, content, viktigt); //skapas ny objekt
  anteckningslogg.push(logg); //läggs till anteckningslogg arrayen
  document.getElementById("newloggform").remove();
  updateLoggBoken();
  pushLocalStorage();
}

//********Fukntion för att visa anteckning och uppdatera view********//

function updateLoggBoken() {
  var dagId = "dag" + new Date().getDay();
  var dag = document.getElementById(dagId);

  dag.textContent = " ";
  anteckningslogg.forEach((element) => {
    // Skapar ny elements
    let div = document.createElement("div");
    let titel = document.createElement("h2");
    let content = document.createElement("p");
    let viktigt = document.createElement("p");
    let remove = document.createElement("button");

    // tilldelar värden till alla elements
    titel.textContent = element.titel;
    content.textContent = element.content;
    viktigt.textContent = element.viktigt ? "viktig" : "Ikke Viktig";
    if (element.viktigt) {
      div.className = "note red";
    } else {
      div.className = "note";
    }

    remove.dataset.ID = anteckningslogg.indexOf(element);
    remove.addEventListener("click", removeLogg);

    //Lägger elemts till

    div.appendChild(titel);
    div.appendChild(content);
    div.appendChild(viktigt);
    div.appendChild(remove);

    remove.classList.add("remove");

    //append allt till dag
    dag.appendChild(div);
    pushLocalStorage();
  });
}

//********Fukntion för att ta bort inlägget********//

function removeLogg(element) {
  anteckningslogg.splice(element.target.dataset.ID, 2);
  updateLoggBoken();
  pushLocalStorage();
}

//********Fukntion för att att pusha och ta emot från LocalStorage********//

function pushLocalStorage() {
  localStorage.setItem("anteckningslogg", JSON.stringify(anteckningslogg));
}

function pullLocalStorage() {
  if (!localStorage.anteckningslogg) {
    updateLoggBoken()
  } else {
    let anteckningsloggLocal = localStorage.getItem("anteckningslogg");
    anteckningsloggLocal = JSON.parse(anteckningsloggLocal);
    anteckningslogg = anteckningsloggLocal;
    updateLoggBoken()
  }
}
pullLocalStorage();