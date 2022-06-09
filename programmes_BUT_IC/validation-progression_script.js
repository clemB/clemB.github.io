var note_inputs = document.querySelectorAll("input[type=number]");
var note_max = 17;
var note_min = 4;

var note_manquante = false;

var annee=1;

var notes_a1 = [];
var notes_a2 = [];
var notes_a3 = [];
var val_a1 = [];
var val_a2 = [];
var val_a3 = [];

var nb_comp = 5;

var ref_comp = [];

var ref_comp_com =  [   [1,1,1,1,1,0],
                        [1,1,1,1,1,0],
                        [1,0,1,1,1,0]  ];
                    
var ref_comp_ino =  [   [1,1,1,1,0,0],
                        [1,1,1,1,1,0],
                        [1,0,1,1,1,0]  ];

var ref_comp_jou =  [   [1,1,1,1,0,0],
                        [1,1,1,1,1,1],
                        [1,0,0,0,1,1]  ];

var ref_comp_mlp =  [   [1,1,1,1,0,0],
                        [1,1,1,1,1,0],
                        [1,0,1,1,1,0]  ];

var ref_comp_pub =  [   [1,1,1,1,1,0],
                        [1,1,1,1,1,0],
                        [1,0,0,1,1,0]  ];

const count = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);


var ref_comp_buttons = document.querySelectorAll(".ref-comp>table");
ref_comp_buttons.forEach(function (ref_comp_parcours){
    ref_comp_parcours.addEventListener("click", function () {
        if(this.dataset.parcours=="generic"){
            createRefComp();
        }
        ref_comp = eval("ref_comp_"+this.dataset.parcours);

        masqueComp();
        display(annee);

        document.getElementById("intro").classList.add("d-none");
        document.getElementById("choix-ref").classList.add("d-none");
        document.getElementById("jury").classList.remove("d-none");

    });
});


var remplir1_btn = document.getElementById("remplir1_btn");
remplir1_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a1");
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
    resetValidation(1);
    reset_alert();
});
var remplir2_btn = document.getElementById("remplir2_btn");
remplir2_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a2");
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
    resetValidation(2);
    reset_alert();
});
var remplir3_btn = document.getElementById("remplir3_btn");
remplir3_btn.addEventListener("click", function () {
    var note_inputs_annee = document.querySelectorAll("input[type=number].a3");
    note_inputs_annee.forEach(function (note) {
        note.value = tirage_alea(6,20);
    });
    resetValidation(3);
    reset_alert();
});
var jury1_btn = document.getElementById("jury-1");
jury1_btn.addEventListener("click", function () {
    document.querySelector("#tuto").classList.add("d-none");
    var jury_ok = true;
    var note_inputs_annee = document.querySelectorAll("input[type=number].a1");
    note_inputs_annee.forEach(function (note) {
        if(note.value == ""){
            jury_ok = false;
        };
    });
    if(jury_ok){
        jury(1);
    }
});

var jury2_btn = document.getElementById("jury-2");
jury2_btn.addEventListener("click", function () {
    var jury_ok = true;
    var note_inputs_annee = document.querySelectorAll("input[type=number].a2");
    note_inputs_annee.forEach(function (note) {
        if(note.value == ""){
            jury_ok = false;
        };
    });
    if(jury_ok){
        jury(2);
    }
});

var jury3_btn = document.getElementById("jury-3");
jury3_btn.addEventListener("click", function () {
    var jury_ok = true;
    var note_inputs_annee = document.querySelectorAll("input[type=number].a3");
    note_inputs_annee.forEach(function (note) {
        if(note.value == ""){
            jury_ok = false;
        };
    });
    if(jury_ok){
        jury(3);
    }
});

function resetValidation(currentAnnee){
    for(var i=0; i<this["val_a"+currentAnnee].length ;i++){ 
        var td = document.querySelector("tr.a"+currentAnnee+">td.c"+(i+1));
        var moyenne = document.querySelector("#a"+currentAnnee+"c"+(i+1));
        moyenne.innerHTML = "";
        td.dataset.statut = "";
    }
}

function reset_alert(){
    var alert = document.querySelector("#alert");
    alert.classList.add("d-none");
}

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
    for(var c=0; c<6; c++){
        if(ref_comp[a-1][c]){
            var selector_n1 = "tr.a"+a+" .c"+(c+1)+" .s"+((a*2)-1);
            var selector_n2 = "tr.a"+a+" .c"+(c+1)+" .s"+((a*2));
            var selector_moy = document.querySelector("#a"+a+"c"+(c+1));
            var n1 = parseInt(document.querySelector(selector_n1).value);
            var n2 = parseInt(document.querySelector(selector_n2).value);

            if(n1 && n2){
                note_a[c] = (n1+n2)/2 ;
                selector_moy.innerHTML = (n1+n2)/2; // affichage moyenne
            }else{
                //alert("manque des notes");
                console.log("note qui manque");
                note_manquante = true;
                break;
            }
        }        
    }
    return note_a;
}

function jury(annee){

    var nb_comp = countComp(annee);
    var passage = true;
    var explication = [];
    var notes = calcul_moyenne_annee(annee);  


    /* RÉSULTATS ANNEE A (VALIDÉ ou NON VALIDÉ) */ 
    for(var i=0; i<notes.length ;i++){ 
        var td = document.querySelector("tr.a"+annee+">td.c"+(i+1));
        var current_statut = notes[i]>=10 ? "val" : "nval";
        this["val_a"+annee][i] = current_statut;
        td.dataset.statut = current_statut;

        // validation du niveau de compétence inférieur si niveau de comp. validé
        // if(current_statut == "val"){
        //     this["val_a"+(annee-1)][i] = current_statut;
        // }
    }

    /* PROGRESSION */
    // compensation ?
    if(annee>1){
        for(var i=0 ; i<this["val_a"+(annee-1)].length; i++){
            if(this["val_a"+(annee-1)][i]=="nval" && this["val_a"+(annee)][i]=="nval"){
                passage = passage & false;
                explication.push("Le niveau de la compétence "+(i+1)+" non acquis ne permet pas de valider le niveau inférieur de cette même compétence");
            }
        }
    }

    // niveaux terminaux acquis ?
    for(var i=0 ; i<this["val_a"+annee].length; i++){
        if(annee<3){
            if(this["val_a"+annee][i]=="nval" && !ref_comp[annee][i]){
                passage = passage & false;
                explication.push("Dernier niveau de la compétence "+(i+1)+" non acquis");
            }
        }else{
            if(this["val_a"+annee][i]=="nval" && ref_comp[(annee-1)][i]){
                passage = passage & false;
                explication.push("Vous devez valider toutes les compétences pour obtenir le diplôme.");
                break;
            }
        }
    }

    // niveau inférieur à 8 ?
    for(var i=0 ; i<this["val_a"+annee].length; i++){
        if(this["val_a"+annee][i]=="nval" && notes[i]<8){
            passage = passage & false;
            explication.push("Niveau de la compétence "+(i+1)+" non acquis et inférieur à 8.");
        }
    }

    // plus de la moitié de compétences aquises ?
    if(count(this["val_a"+annee],"val")<=(nb_comp/2)){
        passage = passage & false;
        explication.push("Moins de la moitié des niveaux de compétence de l'année acquis");
    }else{
        passage = passage & true;
        explication.push("Acquisition de plus de la moitié des niveaux de compétence de l'année");
    }


    // Passage année suivante
    if(passage){
        /* COMPENSATION ANNEE A-1 */
        if (annee >1){
            for(var i=0 ; i<this["val_a"+annee].length; i++){
                if(this["val_a"+annee][i]=="val" && this["val_a"+(annee-1)][i] == "nval"){
                    this["val_a"+(annee-1)][i] = "val";
                    var td = document.querySelector("tr.a"+(annee-1)+">td.c"+(i+1));
                    td.dataset.statut = "val";

                    explication.push("Le niveau inférieur de la comptence "+(i+1)+" est acquis car acquisition du niveau supérieur" ); // enregistrer la compétence compensée
                }
            }
        }
        if(annee < 3){
            display(annee+1);
        }else{
            /* DIPLOME */
            explication.push("Vous validez toutes les compétences. Vous obtenez votre BUT.");
        }
    }

    /* AFFICHAGE RESULTATS JURY */
    decision_string = passage ? "Passage" : "Redoublement";
    if(annee==3 && passage){
        decision_string="Diplôme";
        confetti();
    }
    alert_color = passage ? "alert-success" : "alert-danger";
    explication_string = explication.join("<br>");

    var decision = document.querySelector("#decision");
    var explic = document.querySelector("#explication");
    //var liste = document.querySelector("#liste");
    decision.innerHTML = decision_string;
    explic.innerHTML = explication_string;
    //liste.innerHTML = liste_string;

    var alert = document.querySelector("#alert");
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
    alert.classList.remove("d-none");
    alert.classList.add(alert_color);

}

function countComp(a){
    var sum = 0;
    for(var c=0; c<6; c++){
        sum += ref_comp[a-1][c];
    }
    return sum;
}

function display(annee){
    var tr_annee = document.querySelector(".a"+annee);
    tr_annee.classList.toggle("d-disable");

    document.querySelector(".actions.a"+annee).classList.toggle("d-none");

    if(annee>1){
        var tr_annee_prec = document.querySelector(".a"+(annee-1));
        tr_annee_prec.classList.add("d-close");

        document.querySelector(".actions.a"+(annee-1)).classList.add("d-none");
    }
    
}

function masqueComp(){
    for(var comp=0; comp<6; comp++){
        if(ref_comp[0][comp]+ref_comp[1][comp]+ref_comp[2][comp]==0){
            var comp_to_hide = document.querySelectorAll(".c"+(comp+1));
            comp_to_hide.forEach(function (item) {
                item.classList.add("d-none")
            });
        }

        for(var a=0; a<3 ;a++){
            if(!ref_comp[a][comp]){
                document.querySelector(".a"+(a+1)+">.c"+(comp+1)).classList.add("d-invisible");
            }
        }
    }

}