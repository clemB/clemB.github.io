const urlParams = new URLSearchParams(window.location.search);
const parcours = urlParams.get('parcours');
// Source de données pour le tableau 1
const dataUrl1 = "https://opensheet.elk.sh/15x5WdUlCt_8d4j5JyzorDzj6JZ5ivW2voxt1VW7I0TU/"+parcours;
// Source de données pour le tableau 2 (modifier cette ligne pour charger depuis une autre source)
const dataUrl2 = "https://opensheet.elk.sh/1DhvL0ztY_3HiNN1h2Hoa9aw4Ptjak-g8klj1Jz_xEwU/"+parcours;

const parcours_item = document.getElementById("btn_"+parcours.toLowerCase());

var d; // data array for table 1
var d2; // data array for table 2
var filter = [];
var filtered_data = []; // filtered data for table 1
var filtered_data2 = []; // filtered data for table 2

var com_color = "hsl(0, 78%, 62%)";
var ino_color = "hsl(180, 62%, 55%)";
var jou_color = "hsl(322, 47%, 38%)";
var mlp_color = "hsl(212, 86%, 64%)";
var pub_color = "hsl(34, 97%, 64%)";

var current_color = eval(parcours.toLowerCase()+"_color");
var current_parcours = parcours_item.textContent;

/* SET CURRENT PROPERTIES */
document.getElementById("current_page").textContent = current_parcours;
document.documentElement.style.setProperty('--color-spe', current_color);
parcours_item.classList.toggle("active");

/* TOGGLE FILTER PANEL */
const toggleFilterBtn = document.getElementById("toggle-filter-btn");
const filterPanel = document.getElementById("filter-panel");
const mainPanel = document.getElementById("main-panel");
const toggleFilterArrow = document.getElementById("toggle-filter-arrow");
const leftHoverZone = document.getElementById("left-hover-zone");
let filterVisible = false;

toggleFilterBtn.addEventListener("click", function() {
  filterVisible = !filterVisible;
  if (filterVisible) {
    filterPanel.classList.remove("hidden");
    mainPanel.classList.remove("expanded");
    toggleFilterArrow.classList.remove("bi-caret-right-fill");
    toggleFilterArrow.classList.add("bi-caret-left-fill");
  } else {
    filterPanel.classList.add("hidden");
    mainPanel.classList.add("expanded");
    toggleFilterArrow.classList.remove("bi-caret-left-fill");
    toggleFilterArrow.classList.add("bi-caret-right-fill");
  }
});

// Auto-hide filter panel on mouse leave
leftHoverZone.addEventListener("mouseenter", function() {
  if (!filterVisible) {
    filterVisible = true;
    filterPanel.classList.remove("hidden");
    mainPanel.classList.remove("expanded");
    toggleFilterText.textContent = "Masquer les filtres";
  }
});

filterPanel.addEventListener("mouseenter", function() {
  if (!filterVisible) {
    filterVisible = true;
    filterPanel.classList.remove("hidden");
    mainPanel.classList.remove("expanded");
    toggleFilterText.textContent = "Masquer les filtres";
  }
});

filterPanel.addEventListener("mouseleave", function() {
  if (filterVisible) {
    filterVisible = false;
    filterPanel.classList.add("hidden");
    mainPanel.classList.add("expanded");
    toggleFilterText.textContent = "Afficher les filtres";
  }
});

/* LOAD DATA */
Promise.all([
  fetch(dataUrl1).then(response => response.json()),
  fetch(dataUrl2).then(response => response.json())
])
  .then(function ([data1, data2]) {
    d = data1;
    d2 = data2;
    console.log("Data 1:", d);
    console.log("Data 2:", d2);
    filterData();
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

/* FUNCTIONS */

function filterData() {
  filtered_data = [];
  filtered_data2 = [];

  // Filter data for table 1
  for (var i = 0; i < d.length; i++) {
    if (
      !filter.includes(d[i].semestre.toLowerCase()) &&
      !filter.includes(d[i].type.toLowerCase()) &&
      !filter.includes(d[i].competence.toLowerCase())
    ) {
      filtered_data.push(d[i]);
    }
  }
  
  // Filter data for table 2
  for (var i = 0; i < d2.length; i++) {
    if (
      !filter.includes(d2[i].semestre.toLowerCase()) &&
      !filter.includes(d2[i].type.toLowerCase()) &&
      !filter.includes(d2[i].competence.toLowerCase())
    ) {
      filtered_data2.push(d2[i]);
    }
  }
  
  filtered_data = sort_by_key(filtered_data, "competence");
  filtered_data = sort_by_key(filtered_data, "semestre"); /* default order */
  
  filtered_data2 = sort_by_key(filtered_data2, "competence");
  filtered_data2 = sort_by_key(filtered_data2, "semestre"); /* default order */
  
  displayData();
}

function displayData() {
  displayList();
}

function displayGrid() {
  var mainContainer = document.getElementById("dataContainer");
  mainContainer.innerHTML = "";

  for (var i = 0; i < filtered_data.length; i++) {

    var article = document.createElement("article");
    var classString = [
      filtered_data[i].type.toLowerCase(),
      filtered_data[i].semestre.toLowerCase(),
      filtered_data[i].competence.toLowerCase(),
      "c-pointer"
    ].join(" ");
    article.className = "card " + classString;
    article.setAttribute("onClick", "displayFiche('"+i+"')");
    article.setAttribute("data-bs-toggle","modal");
    article.setAttribute("data-bs-target", "#my-modal");

    var article_content = '';
    article_content += '<div class="card-body">';
    article_content += '<span class="card-subtiltle text-muted fw-light">'+ filtered_data[i].semestre +'&nbsp;</span>';

    if (filtered_data[i].type.toLowerCase() == "sae") {
      
      if(filtered_data[i].libelle.toLowerCase().startsWith("stage")){
        article_content += '<span class="badge bg-parcours mb-2 float-end">STAGE</span>';
      }else if(filtered_data[i].libelle.toLowerCase().startsWith("portfolio")){
        article_content += '<span class="badge bg-parcours mb-2 float-end">PORTFOLIO</span>';
      }
      article_content += '<span class="badge bg-dark mb-2 float-end">SAÉ</span>';
      
    }

    article_content += '<p class="card-title mt-2">' + filtered_data[i].libelle + "</p>";

    // article_content += "<br/>"
    article_content += filtered_data[i].comp_1 ? '<span class="ue-outline ue-outline-1">UE 1</span>' : '';
    article_content += filtered_data[i].comp_2 ? '<span class="ue-outline ue-outline-2">UE 2</span>' : '';
    article_content += filtered_data[i].comp_3 ? '<span class="ue-outline ue-outline-3">UE 3</span>' : '';
    article_content += filtered_data[i].comp_4 ? '<span class="ue-outline ue-outline-4">UE 4</span>' : '';
    article_content += filtered_data[i].comp_5 ? '<span class="ue-outline ue-outline-5">UE 5</span>' : '';
    article_content += filtered_data[i].comp_6 ? '<span class="ue-outline ue-outline-6">UE 6</span>' : '';

    if(filtered_data[i].type.toLowerCase() == "ressource"){
      article_content += '<p class="card-subtitle mb-2 text-muted">'+ filtered_data[i].mots_cles +'</p>';
    }
    
    article_content += "</div></a>";

    article_content +=
      '<div class="card-footer justify-content-between d-flex"><small class="text-muted"><strong>' +
      filtered_data[i].h_tot + 'h</strong>';
      
      if(filtered_data[i].h_tp>0){
        article_content += ' | dont '+ filtered_data[i].h_tp +'h TP';
      }
      
      article_content += '</small>';

      if(filtered_data[i].h_proj>0){
        article_content += '<small class="text-muted">'+ filtered_data[i].h_proj + 'h proj.</small>';
      }
      
      article_content += '</div>';

    article.innerHTML = article_content;

    mainContainer.appendChild(article);
  }
  
  // Display data for table 2
  for (var i = 0; i < filtered_data2.length; i++) {

    var article = document.createElement("article");
    var classString = [
      filtered_data2[i].type.toLowerCase(),
      filtered_data2[i].semestre.toLowerCase(),
      filtered_data2[i].competence.toLowerCase(),
      "c-pointer"
    ].join(" ");
    article.className = "card " + classString;
    article.setAttribute("onClick", "displayFiche2('"+i+"')");
    article.setAttribute("data-bs-toggle","modal");
    article.setAttribute("data-bs-target", "#my-modal");

    var article_content = '';
    article_content += '<div class="card-body">';
    article_content += '<span class="card-subtiltle text-muted fw-light">'+ filtered_data2[i].semestre +'&nbsp;</span>';

    if (filtered_data2[i].type.toLowerCase() == "sae") {
      
      if(filtered_data2[i].libelle.toLowerCase().startsWith("stage")){
        article_content += '<span class="badge bg-parcours mb-2 float-end">STAGE</span>';
      }else if(filtered_data2[i].libelle.toLowerCase().startsWith("portfolio")){
        article_content += '<span class="badge bg-parcours mb-2 float-end">PORTFOLIO</span>';
      }
      article_content += '<span class="badge bg-dark mb-2 float-end">SAÉ</span>';
      
    }

    article_content += '<p class="card-title mt-2">' + filtered_data2[i].libelle + "</p>";

    article_content += filtered_data2[i].comp_1 ? '<span class="ue-outline ue-outline-1">UE 1</span>' : '';
    article_content += filtered_data2[i].comp_2 ? '<span class="ue-outline ue-outline-2">UE 2</span>' : '';
    article_content += filtered_data2[i].comp_3 ? '<span class="ue-outline ue-outline-3">UE 3</span>' : '';
    article_content += filtered_data2[i].comp_4 ? '<span class="ue-outline ue-outline-4">UE 4</span>' : '';
    article_content += filtered_data2[i].comp_5 ? '<span class="ue-outline ue-outline-5">UE 5</span>' : '';
    article_content += filtered_data2[i].comp_6 ? '<span class="ue-outline ue-outline-6">UE 6</span>' : '';

    if(filtered_data2[i].type.toLowerCase() == "ressource"){
      article_content += '<p class="card-subtitle mb-2 text-muted">'+ filtered_data2[i].mots_cles +'</p>';
    }
    
    article_content += "</div></a>";

    article_content +=
      '<div class="card-footer justify-content-between d-flex"><small class="text-muted"><strong>' +
      filtered_data2[i].h_tot + 'h</strong>';
      
      if(filtered_data2[i].h_tp>0){
        article_content += ' | dont '+ filtered_data2[i].h_tp +'h TP';
      }
      
      article_content += '</small>';

      if(filtered_data2[i].h_proj>0){
        article_content += '<small class="text-muted">'+ filtered_data2[i].h_proj + 'h proj.</small>';
      }
      
      article_content += '</div>';

    article.innerHTML = article_content;

    mainContainer.appendChild(article);
  }
  
  /* to fix last grid article stretch problem */
  for(var i=0; i<3;i++){
    var spacer = document.createElement("div");
    mainContainer.appendChild(spacer);
  }

}

function displayList() {
  var mainContainer = document.getElementById("dataContainer");
  mainContainer.innerHTML = "";

  // Grouper les données par semestre
  var semestres1 = {};
  var semestres2 = {};
  var allSemestres = [];

  filtered_data.forEach(function(item, index) {
    var sem = item.semestre;
    if (!semestres1[sem]) {
      semestres1[sem] = [];
      if (!allSemestres.includes(sem)) allSemestres.push(sem);
    }
    semestres1[sem].push({data: item, index: index});
  });

  filtered_data2.forEach(function(item, index) {
    var sem = item.semestre;
    if (!semestres2[sem]) {
      semestres2[sem] = [];
      if (!allSemestres.includes(sem)) allSemestres.push(sem);
    }
    semestres2[sem].push({data: item, index: index});
  });

  // Trier chaque semestre selon l'ordre personnalisé
  Object.keys(semestres1).forEach(function(sem) {
    var dataToSort = semestres1[sem].map(function(entry) { return entry.data; });
    dataToSort = sort_by_custom_order(dataToSort);
    semestres1[sem] = dataToSort.map(function(data, idx) {
      return {data: data, index: filtered_data.indexOf(data)};
    });
  });

  Object.keys(semestres2).forEach(function(sem) {
    var dataToSort = semestres2[sem].map(function(entry) { return entry.data; });
    dataToSort = sort_by_custom_order(dataToSort);
    semestres2[sem] = dataToSort.map(function(data, idx) {
      return {data: data, index: filtered_data2.indexOf(data)};
    });
  });

  // Fonction pour créer une ligne de tableau
  function createTableRow(item, index, isSecondTable) {
    var tr = document.createElement("tr");
    var classString = [
      item.type.toLowerCase(),
      item.semestre.toLowerCase(),
      item.competence.toLowerCase()
    ];
    
    // Seulement le tableau de gauche est cliquable
    if (!isSecondTable) {
      classString.push("c-pointer");
      tr.setAttribute("onClick", "displayFiche('"+index+"')");
      tr.setAttribute("data-bs-toggle","modal");
      tr.setAttribute("data-bs-target", "#my-modal");
    }
    
    tr.className = classString.join(" ");

    var tr_content = '<td class="text-muted fw-light">' + item.semestre + '</td>';
    tr_content += '<td class="fw-bold">';
    
    if (item.type.toLowerCase() == "sae") {
      tr_content += '<div class="d-inline-flex">';
      if(item.libelle.toLowerCase().startsWith("stage")){
        tr_content += '<span class="badge bg-parcours order-1">STAGE</span>';
      }else if(item.libelle.toLowerCase().startsWith("portfolio")){
        tr_content += '<span class="badge bg-parcours order-1">PORTFOLIO</span>';
      }
      tr_content += '<span class="badge bg-dark">SAÉ</span><span class="me-2 order-2"></span>';
      tr_content += '</div>';
    }

    tr_content += '<p class="d-inline order-3 mb-0">'+item.libelle+"</p></td>";

    var ue_content = "";
    ue_content += item.comp_1 ? '<span class="ue-num ue-num-1">1</span>' : '';
    ue_content += item.comp_2 ? '<span class="ue-num ue-num-2">2</span>' : '';
    ue_content += item.comp_3 ? '<span class="ue-num ue-num-3">3</span>' : '';
    ue_content += item.comp_4 ? '<span class="ue-num ue-num-4">4</span>' : '';
    ue_content += item.comp_5 ? '<span class="ue-num ue-num-5">5</span>' : '';
    ue_content += item.comp_6 ? '<span class="ue-num ue-num-6">6</span>' : '';

    tr_content += "<td class='text-center'>"+ue_content+"</td>";
    tr_content += "<td class='text-center'>" + item.h_tot + "</td>";
    
    if(item.h_tp>0){
      tr_content += "<td class='text-center'>" + item.h_tp + "</td>";
    }else{
      tr_content += "<td class='text-center'>-</td>";
    }
    
    if(item.h_proj>0){
      tr_content += "<td class='text-center'>" + item.h_proj + "</td>";
    }else{
      tr_content += "<td class='text-center'>-</td>";
    }

    tr.innerHTML = tr_content;
    return tr;
  }

  // Créer une section par semestre
  allSemestres.forEach(function(semestre, semestreIndex) {
    var section = document.createElement("section");
    section.className = "semester-section w-100";

    var tablesContainer = document.createElement("div");
    tablesContainer.className = "d-flex gap-4 w-100";

    // Tableau 1
    var tableWrapper1 = document.createElement("div");
    var classes1 = "flex-1";
    if (compareEnabled) {
      classes1 += " old-program-opacity";
      if (semestreIndex === 0) classes1 += " old-program-label";
    }
    tableWrapper1.className = classes1;
    var table1 = document.createElement("table");
    table1.className = "table table-sm t-hover";
    if (semestreIndex === 0) {
      table1.innerHTML = "<thead><tr><th>Sem.</th><th>Libellé</th><th class='text-center'>&nbsp;<br/>UE</th><th class='text-center'>h. form.</th><th class='text-center'>dont TP</th><th class='text-center'>h. projet</th></tr></thead>";
    }
    var tbody1 = document.createElement("tbody");

    if (semestres1[semestre]) {
      semestres1[semestre].forEach(function(entry) {
        tbody1.appendChild(createTableRow(entry.data, entry.index, false));
      });
    }

    table1.appendChild(tbody1);
    tableWrapper1.appendChild(table1);
    tablesContainer.appendChild(tableWrapper1);

    // Tableau 2 - seulement si la comparaison est activée
    if (compareEnabled) {
      var tableWrapper2 = document.createElement("div");
      tableWrapper2.className = semestreIndex === 0 ? "flex-1 new-program" : "flex-1";
      var table2 = document.createElement("table");
      table2.className = "table table-sm t-hover new-program-table";
      if (semestreIndex === 0) {
        table2.innerHTML = "<thead><tr><th>Sem.</th><th>Libellé</th><th class='text-center'>&nbsp;<br/>UE</th><th class='text-center hours-col'>h. form.</th><th class='text-center hours-col'>dont TP</th><th class='text-center hours-col'>h. projet</th></tr></thead>";
      }
      var tbody2 = document.createElement("tbody");

      if (semestres2[semestre]) {
        semestres2[semestre].forEach(function(entry) {
          tbody2.appendChild(createTableRow(entry.data, entry.index, true));
        });
      }

      table2.appendChild(tbody2);
      tableWrapper2.appendChild(table2);
      tablesContainer.appendChild(tableWrapper2);
    }

    section.appendChild(tablesContainer);
    mainContainer.appendChild(section);
  });
}

function displayFiche(index){
  displayFicheCommon(index, filtered_data, false);
}

function displayFiche2(index){
  displayFicheCommon(index, filtered_data2, true);
}

function displayFicheCommon(index, dataSource, isNewProgram){
  var modalTitle = document.querySelector("#modal-title");
  var modalBody = document.querySelector("#modal-body");

  /* UE */
  var ue_content = "";
  ue_content += dataSource[index].comp_1 ? '<span class="ue ue-1">UE 1</span>' : '';
  ue_content += dataSource[index].comp_2 ? '<span class="ue ue-2">UE 2</span>' : '';
  ue_content += dataSource[index].comp_3 ? '<span class="ue ue-3">UE 3</span>' : '';
  ue_content += dataSource[index].comp_4 ? '<span class="ue ue-4">UE 4</span>' : '';
  ue_content += dataSource[index].comp_5 ? '<span class="ue ue-5">UE 5</span>' : '';
  ue_content += dataSource[index].comp_6 ? '<span class="ue ue-6">UE 6</span>' : '';

  /* description */
  var converter = new showdown.Converter();
  var obj = dataSource[index].objectif;
  var desc = dataSource[index].description;
  var desc_complete = obj ? obj+"<br><br>" : "";
  desc_complete += desc;


  /* heures */
  var h_string = "<small>";
  h_string += "<strong>"+dataSource[index].h_tot +"h</strong>";
  if(dataSource[index].h_tp>0){
    h_string += "<span class='text-muted'>&nbsp;dont "+ dataSource[index].h_tp+"h TP</span>";
  }
  if(dataSource[index].h_proj>0){
    h_string += "<br/>"+ dataSource[index].h_proj+"h. projet";
  }
  h_string += "<small>";

  /* remplissage modal */
  modalTitle.innerHTML = "<span class='text-muted fw-light'>"+dataSource[index].semestre +" | </span>"+ dataSource[index].libelle+ "<div class='text-muted fw-light small'>"+ue_content+"</div>";

  var modalBody_content = "";
  
  // Avertissement pour le nouveau programme
  if(isNewProgram) {
    modalBody_content += '<div class="alert alert-warning" role="alert"><i class="bi bi-exclamation-triangle-fill"></i> <strong>Description non contractuelle</strong></div>';
  }
  
  modalBody_content += '<h5>Description</h5>';
  modalBody_content += '<p>'+converter.makeHtml(desc_complete)+'</p>';
  if(dataSource[index].mots_cles){
    modalBody_content += '<hr>';
    modalBody_content += '<h5>Mots-clés</h5>';
    modalBody_content += '<p>'+ dataSource[index].mots_cles +'</p>';
  }
  modalBody_content += "<hr>";
  modalBody_content += "<p>"+h_string+"</p>";

  modalBody.innerHTML = modalBody_content;

}

function sort_by_key(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

// Fonction de tri personnalisé pour l'ordre : Ressources communes, SAE communes, Ressources spécifiques, SAE spécifiques, Stage, Portfolio
function sort_by_custom_order(array) {
  return array.sort(function (a, b) {
    // Déterminer l'ordre de priorité
    function getPriority(item) {
      var type = item.type.toLowerCase();
      var competence = item.competence.toLowerCase();
      var libelle = item.libelle.toLowerCase();
      
      // Portfolio en dernier
      if (libelle.includes("portfolio")) return 6;
      // Stage avant portfolio
      if (libelle.includes("stage")) return 5;
      
      // SAE spécifique
      if (type === "sae" && competence === "spe") return 4;
      // Ressources spécifiques
      if (type === "ressource" && competence === "spe") return 3;
      // SAE communes
      if (type === "sae" && competence === "com") return 2;
      // Ressources communes
      if (type === "ressource" && competence === "com") return 1;
      
      return 7; // Par défaut
    }
    
    var priorityA = getPriority(a);
    var priorityB = getPriority(b);
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // Si même priorité, trier par code (ordre croissant)
    var codeA = a.code || "";
    var codeB = b.code || "";
    return codeA < codeB ? -1 : codeA > codeB ? 1 : 0;
  });
}

/****** FILTERS CHECKBOXES ******/
var checkboxes = document.querySelectorAll("input[type=checkbox]");
let enabledSettings = [];

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    filter = Array.from(checkboxes)
      .filter((i) => !i.checked)
      .map((i) =>
        i.id.slice(2).toLocaleLowerCase()
      ); /* slice(2) pour supprmier "s_" de l'id de chaque switch + forcer en  minuscule */

    filterData();
  });
});

/****** COMPARE TOGGLE ******/
var compareToggle = document.getElementById("compare-toggle");
var compareEnabled = false;

compareToggle.addEventListener("change", function () {
  compareEnabled = this.checked;
  displayData();
});