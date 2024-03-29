const urlParams = new URLSearchParams(window.location.search);
const parcours = urlParams.get('parcours');
const dataUrl = "https://opensheet.elk.sh/15x5WdUlCt_8d4j5JyzorDzj6JZ5ivW2voxt1VW7I0TU/"+parcours;
const parcours_item = document.getElementById("btn_"+parcours.toLowerCase());

var d; // current data array variable
var filter = [];
var filtered_data = [];
var activeVue = "list";

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

/* LOAD DATA */
fetch(
  dataUrl
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    d = data;
    console.log(d);
    filterData();
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

/* FUNCTIONS */

function filterData() {
  filtered_data = [];

  for (var i = 0; i < d.length; i++) {
    if (
      !filter.includes(d[i].semestre.toLowerCase()) &&
      !filter.includes(d[i].type.toLowerCase()) &&
      !filter.includes(d[i].competence.toLowerCase())
    ) {
      filtered_data.push(d[i]);
    }
  }
  filtered_data = sort_by_key(filtered_data, "competence");
  // filtered_data = sort_by_key(filtered_data, "type");
  filtered_data = sort_by_key(filtered_data, "semestre"); /* default order */
  displayData();
}

function displayData() {
  if (activeVue == "grid") {
    displayGrid();
  } else {
    displayList();
  }
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
  /* to fix last grid article stretch problem */
  for(var i=0; i<3;i++){
    var spacer = document.createElement("div");
    mainContainer.appendChild(spacer);
  }

}

function displayList() {
  var mainContainer = document.getElementById("dataContainer");
  mainContainer.innerHTML = "";

  var table = document.createElement("table");
  table.className = "table table-sm t-hover";
  table.innerHTML =
    "<thead><tr><th>Sem.</th><th>Libellé</th><th class='text-center'>UE</th><th class='text-center'>h. form.</th><th class='text-center'>dont TP</th><th class='text-center'>h. projet</th></tr></thead>";
  var tbody = document.createElement("tbody");

  for (var i = 0; i < filtered_data.length; i++) {
    var tr = document.createElement("tr");
    var classString = [
      filtered_data[i].type.toLowerCase(),
      filtered_data[i].semestre.toLowerCase(),
      filtered_data[i].competence.toLowerCase(),
      "c-pointer"
    ].join(" ");
    tr.className = classString;
    tr.setAttribute("onClick", "displayFiche('"+i+"')");
    tr.setAttribute("data-bs-toggle","modal");
    tr.setAttribute("data-bs-target", "#my-modal");

    var tr_content = '<td class="text-muted fw-light">' + filtered_data[i].semestre + '</td>';
    tr_content += '<td class="fw-bold">';
    // if (filtered_data[i].type.toLowerCase() == "sae") {
    //   tr_content += '<div class="badge bg-dark me-2">SAÉ</div>';
    // }
    // tr_content += '<div class="d-flex">';
    if (filtered_data[i].type.toLowerCase() == "sae") {
      tr_content += '<div class="d-inline-flex">';
      if(filtered_data[i].libelle.toLowerCase().startsWith("stage")){
        tr_content += '<span class="badge bg-parcours order-1">STAGE</span>';
      }else if(filtered_data[i].libelle.toLowerCase().startsWith("portfolio")){
        tr_content += '<span class="badge bg-parcours order-1">PORTFOLIO</span>';
      }
      tr_content += '<span class="badge bg-dark">SAÉ</span><span class="me-2 order-2"></span>';
      tr_content += '</div>';
    }
    // tr_content += '</div>';

    tr_content += '<p class="d-inline order-3 mb-0">'+filtered_data[i].libelle+"</p></td>";

    var ue_content = "";
    // ue_content += filtered_data[i].comp_1 ? '<span class="ue ue-1">1</span>' : '';
    // ue_content += filtered_data[i].comp_2 ? '<span class="ue ue-2">2</span>' : '';
    // ue_content += filtered_data[i].comp_3 ? '<span class="ue ue-3">3</span>' : '';
    // ue_content += filtered_data[i].comp_4 ? '<span class="ue ue-4">4</span>' : '';
    // ue_content += filtered_data[i].comp_5 ? '<span class="ue ue-5">5</span>' : '';
    // ue_content += filtered_data[i].comp_6 ? '<span class="ue ue-6">6</span>' : '';

    ue_content += filtered_data[i].comp_1 ? '<span class="ue-num ue-num-1">1</span>' : '';
    ue_content += filtered_data[i].comp_2 ? '<span class="ue-num ue-num-2">2</span>' : '';
    ue_content += filtered_data[i].comp_3 ? '<span class="ue-num ue-num-3">3</span>' : '';
    ue_content += filtered_data[i].comp_4 ? '<span class="ue-num ue-num-4">4</span>' : '';
    ue_content += filtered_data[i].comp_5 ? '<span class="ue-num ue-num-5">5</span>' : '';
    ue_content += filtered_data[i].comp_6 ? '<span class="ue-num ue-num-6">6</span>' : '';

    tr_content += "<td class='text-center'>"+ue_content+"</td>";


    tr_content += "<td class='text-center'>" + filtered_data[i].h_tot + "</td>";
    if(filtered_data[i].h_tp>0){
      tr_content += "<td class='text-center'>" + filtered_data[i].h_tp + "</td>";
    }else{
      tr_content += "<td class='text-center'>-</td>";
    }
    if(filtered_data[i].h_proj>0){
      tr_content += "<td class='text-center'>" + filtered_data[i].h_proj + "</td>";
    }else{
      tr_content += "<td class='text-center'>-</td>";
    }

    tr.innerHTML = tr_content;

    tbody.appendChild(tr);

    if(i<filtered_data.length-1){
      if(filtered_data[i+1].semestre != filtered_data[i].semestre){
        var tr_empty = document.createElement("tr");
        tr_empty.innerHTML = '<td colspan="5"></td>';
        tr_empty.classList.add("spacer");
        tbody.appendChild(tr_empty);
      }
    }
  }

  table.appendChild(tbody);
  mainContainer.appendChild(table);
}

function displayFiche(index){
  var modalTitle = document.querySelector("#modal-title");
  var modalBody = document.querySelector("#modal-body");

  /* UE */
  var ue_content = "";
  ue_content += filtered_data[index].comp_1 ? '<span class="ue ue-1">UE 1</span>' : '';
  ue_content += filtered_data[index].comp_2 ? '<span class="ue ue-2">UE 2</span>' : '';
  ue_content += filtered_data[index].comp_3 ? '<span class="ue ue-3">UE 3</span>' : '';
  ue_content += filtered_data[index].comp_4 ? '<span class="ue ue-4">UE 4</span>' : '';
  ue_content += filtered_data[index].comp_5 ? '<span class="ue ue-5">UE 5</span>' : '';
  ue_content += filtered_data[index].comp_6 ? '<span class="ue ue-6">UE 6</span>' : '';

  /* description */
  var converter = new showdown.Converter();
  var obj = filtered_data[index].objectif;
  var desc = filtered_data[index].description;
  var desc_complete = obj ? obj+"<br><br>" : "";
  desc_complete += desc;


  /* heures */
  var h_string = "<small>";
  h_string += "<strong>"+filtered_data[index].h_tot +"h</strong>";
  if(filtered_data[index].h_tp>0){
    h_string += "<span class='text-muted'>&nbsp;dont "+ filtered_data[index].h_tp+"h TP</span>";
  }
  if(filtered_data[index].h_proj>0){
    h_string += "<br/>"+ filtered_data[index].h_proj+"h. projet";
  }
  h_string += "<small>";

  /* remplissage modal */
  modalTitle.innerHTML = "<span class='text-muted fw-light'>"+filtered_data[index].semestre +" | </span>"+ filtered_data[index].libelle+ "<div class='text-muted fw-light small'>"+ue_content+"</div>";

  var modalBody_content = "";
  modalBody_content += '<h5>Description</h5>';
  modalBody_content += '<p>'+converter.makeHtml(desc_complete)+'</p>';
  if(filtered_data[index].mots_cles){
    modalBody_content += '<hr>';
    modalBody_content += '<h5>Mots-clés</h5>';
    modalBody_content += '<p>'+ filtered_data[index].mots_cles +'</p>';
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

/****** SORT BUTTONS ******/
var sem_button = document.getElementById("sort_sem");
sem_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "semestre");
  this.classList.toggle("active");

  displayData();
});
var type_button = document.getElementById("sort_type");
type_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "type");
  this.classList.toggle("active");

  displayData();
});
var comp_button = document.getElementById("sort_comp");
comp_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "competence");
  this.classList.toggle("active");
  displayData();
});

/****** VUE BUTTONS ******/
var grid_button = document.getElementById("btn_grid");
var list_button = document.getElementById("btn_list");

grid_button.addEventListener("click", function () {
  activeVue = "grid";
  this.classList.toggle("active");
  list_button.classList.toggle("active");
  displayData();
});

list_button.addEventListener("click", function () {
  activeVue = "list";
  this.classList.toggle("active");
  grid_button.classList.toggle("active");
  displayData();
});