const urlParams = new URLSearchParams(window.location.search);
const parcours = /*urlParams.get('parcours')*/"INO";
const dataUrl = "https://opensheet.elk.sh/1eT4jfPbo-h-0p3I4btQZAKYgD4YctEBU0hNlbSQ-feU/"+parcours;

var d;
var filter = [];
var filtered_data = [];
var activeVue = "grid";

fetch(
  /*"https://opensheet.elk.sh/1eT4jfPbo-h-0p3I4btQZAKYgD4YctEBU0hNlbSQ-feU/INO"*/
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
    ].join(" ");
    article.className = "card " + classString;

    var article_content =
      '<div class="card-header">' +
      filtered_data[i].semestre +
      /*" | " +
      filtered_data[i].option +*/
      "</div>";
    article_content += '<div class="card-body">';
    /*article_content += "<p>" + filtered_data[i].semestre + "</p>";*/
    if (filtered_data[i].type.toLowerCase() == "sae") {
      article_content += '<span class="badge bg-info mb-2">SAÉ</span>';
    }
    article_content +=
      '<h6 class="card-title">' + filtered_data[i].libelle + "</h6>";
    /*article_content +=
      '<p class="card-subtitle mb-2 text-muted">Card subtitle</p>';*/
    article_content += "</div>";

    article_content +=
      '<div class="card-footer justify-content-between"><small class="text-muted"><strong>' +
      filtered_data[i].h_tot +
      "h</strong> | dont " +
      filtered_data[i].h_tp +
      "h TP</small></div>";
    article_content += "</div>";

    article.innerHTML = article_content;
    mainContainer.appendChild(article);
  }
}

function displayList() {
  var mainContainer = document.getElementById("dataContainer");
  mainContainer.innerHTML = "";

  var table = document.createElement("table");
  table.className = "table table-sm table-hover";
  table.innerHTML =
    "<thead><tr><th>Sem.</th><th>Libellé</th><th class='text-center'>h. form.</th><th class='text-center'>dont TP</th><th class='text-center'>h. projet</th></tr></thead>";
  var tbody = document.createElement("tbody");

  for (var i = 0; i < filtered_data.length; i++) {
    var tr = document.createElement("tr");
    var classString = [
      filtered_data[i].type.toLowerCase(),
      filtered_data[i].semestre.toLowerCase(),
      filtered_data[i].competence.toLowerCase(),
    ].join(" ");
    tr.className = classString;
    var tr_content = "<td>" + filtered_data[i].semestre + "</td>";
    tr_content += "<td>";
    if (filtered_data[i].type.toLowerCase() == "sae") {
      tr_content += '<div class="badge bg-info me-2">SAÉ</div>';
    }
    tr_content += filtered_data[i].libelle + "</td>";
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
  }

  table.appendChild(tbody);
  mainContainer.appendChild(table);
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

    console.log(filter);

    filterData();
  });
});

/****** SORT BUTTONS ******/
var sem_button = document.getElementById("sort_sem");
sem_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "semestre");
  displayData();
});
var sem_button = document.getElementById("sort_type");
sem_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "type");
  displayData();
});
var sem_button = document.getElementById("sort_comp");
sem_button.addEventListener("click", function () {
  filtered_data = sort_by_key(filtered_data, "competence");
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
