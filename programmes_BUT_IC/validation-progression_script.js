var note_inputs = document.querySelectorAll("input[type=number]");
var note_max = 17;
var note_min = 4;

var notes_a1 = [];
var notes_a2 = [];
var notes_a3 = [];
var val_a1 = [];
var val_a2 = [];
var val_a3 = [];

var nb_comp = 5;

var remplir1_btn = document.getElementById("remplir1_btn");
remplir1_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a1");
    var td_annee = document.querySelectorAll(".a1>td");
    td_annee.forEach(function (td) {
        td.classList.remove("comp-valid");
        td.classList.remove("comp-invalid");
    });
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
});
var remplir2_btn = document.getElementById("remplir2_btn");
remplir2_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a2");
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
});
var remplir3_btn = document.getElementById("remplir3_btn");
remplir3_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a3");
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
});
var jury1_btn = document.getElementById("jury-1");
jury1_btn.addEventListener("click", function () {
    notes_a1 = calcul_moyenne_annee(1);
    jury(1);
    // console.log(notes_a1);
});

var jury2_btn = document.getElementById("jury-2");
jury2_btn.addEventListener("click", function () {
    notes_a2 = calcul_moyenne_annee(2);
    jury(2);
});

var jury3_btn = document.getElementById("jury-3");
jury3_btn.addEventListener("click", function () {
    notes_a3 = calcul_moyenne_annee(3);
    jury(3);
});

function tirage_alea (min, max){
    var nb_coup = 3;
    var addition = 0;
    for(var i=0;i<nb_coup-1;i++){
        addition += Math.floor(Math.random() * (max - min + 1) + min);
    }
    var moyenne = (addition/nb_coup) + (nb_coup/2);
    return moyenne.toFixed(0);
} 

function calcul_moyenne_annee(a){
    var note_a = [];
    for(var c=0; c<nb_comp; c++){
        var selector_n1 = "tr.a"+a+" .c"+(c+1)+" .s"+((a*2)-1);
        var selector_n2 = "tr.a"+a+" .c"+(c+1)+" .s"+((a*2));
        var selector_moy = document.querySelector("#a"+a+"c"+(c+1));
        var n1 = parseInt(document.querySelector(selector_n1).value);
        var n2 = parseInt(document.querySelector(selector_n2).value);

        if(n1 && n2){
            note_a[c] = (n1+n2)/2 ;
            selector_moy.innerHTML = (n1+n2)/2; // affichage moyenne
        }else{
            // alert("manque des notes");
        }
        
    }
    return note_a;
}

function jury(annee){
    var nb_nval = 0;
    var nb_val = 0;
    var nb_att = 0;
    var decision_string = "";
    var explication_string = "";
    var liste_string ="";
    var notes = eval("notes_a"+annee);
    // this["val_a"+annee][0]="ddsfsdf";


    /* VALIDATION */
    for(var i=0; i<notes.length ;i++){
        var td = document.querySelector("tr.a"+annee+">td.c"+(i+1));

        if(notes[i]<10){
            nb_nval++;
            if(notes[i]>=8){
                nb_att++;
            }
            this["val_a"+annee][i] = "nval";
            td.classList.remove("comp-valid");
            td.classList.add("comp-invalid");
        }else{
            nb_val++; 
            this["val_a"+annee][i] = "val";
            td.classList.remove("comp-invalid");
            td.classList.add("comp-valid");
        }
    }

    console.log(nb_val);

    liste_string = "<ul>";
    liste_string += "<li>validés : "+nb_val+"</li>";
    liste_string += "<li>non validés : "+nb_nval+"</li>";
    liste_string += "<ul><li>(dont) inférieurs à 8 : "+(nb_nval-nb_att)+"</li></ul>";
    liste_string += "</ul>";

    /* PROGRESSION */
    if(nb_nval>nb_att){
        decision_string = "Redoublement";

        explication_string = (nb_nval-nb_att)+" niveau(x) de compétence inférieur à 8.";
        alert_color = "alert-danger";
        
    }else{
        if(nb_val>(nb_comp/2)){
            console.log("passage");
            decision_string = "Passage";
            explication_string = "Plus de la moitié des niveaux de compétences validés : <strong>"+nb_val+" / "+nb_comp+"</strong><br>et aucune inférieure à 8.";
            alert_color = "alert-success";
            display(annee+1);
        }else{
            decision_string = "Redoublement";
            explication_string = "Moins de la moitié des niveaux de compétences validés : <strong>"+nb_val+" / "+nb_comp+"</strong>";
            alert_color = "alert-danger";
        }    
    }

    var decision = document.querySelector("#decision");
    var explic = document.querySelector("#explication");
    var liste = document.querySelector("#liste");
    decision.innerHTML = decision_string;
    explic.innerHTML = explication_string;
    liste.innerHTML = liste_string;

    var alert = document.querySelector("#alert");
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
    alert.classList.remove("d-none");
    alert.classList.add(alert_color);
}

function display(annee){
    var tr_annee = document.querySelector(".a"+annee);
    tr_annee.classList.toggle("d-none");

    document.querySelector(".btn-remplir.a"+(annee-1)).classList.add("d-none");
    document.querySelector(".btn-jury.a"+(annee-1)).classList.add("d-none");
}
