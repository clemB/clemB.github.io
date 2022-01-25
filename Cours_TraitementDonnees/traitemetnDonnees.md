---
author: Clément Borel
title: Traitement des données
date: 14 décembre 2021
output:
  revealjs::revealjs_presentation:
    theme: sky
    highlight: pygments
    center: true
---
# Traitement des données
## Vers définition de donnée
L’étymologie fournit un point de départ original, le verbe _donner_ n’étant pas neutre ; en anglais, _datum_ et son pluriel _data_ sont issus du latin _dare_ qui signifie... donner. Pour Howard Becker, ce choix est un accident de l’histoire (Becker, 1952) : on aurait dû pointer non pas « _ce qui a été donné_ » au scientifique par la nature, mais plutôt ce qu’il a choisi de prendre, les sélections qu’il a opérées parmi l’ensemble des données potentielles. Pour évoquer le caractère partiel et sélectif inhérent aux données, il eût fallu choisir _captum_ plutôt que _datum_.

Les définitions habituelles naviguent ainsi entre statut, fonction, origine et représentation de la donnée.

Dans la littérature sur les bases de données, on peut citer (Elmasri et Navathe, 2016), ouvrage de référence qui définit brièvement et de façon incidente le [concept](https://www.insee.fr/fr/information/5008707?sommaire=5008710#) : « [_By data, we mean known facts that can be recorded and that have implicit meaning_](https://www.insee.fr/fr/information/5008707?sommaire=5008710#) ». On met donc en exergue le support, l’importance de la sémantique, et on retrouve l’idée de fait.

(Borgman, 2015) étudie plus en profondeur le sujet et aboutit à la définition suivante : « \[...\] [_data are representations of observations, objects or other entities used as evidence of phenomena for the purposes of research or scholarship_](https://www.insee.fr/fr/information/5008707?sommaire=5008710#) ». On retrouve l’idée de représentation du réel (utilisée pour définir l’information), et on constate avec intérêt qu’on ne se limite pas aux observations. Les mots « entité », « objet » apparaissent, l’entité étant définie ensuite par l’auteur comme « _quelque chose qui a une existence réelle_ », matérielle ou digitale. Mais on se place dans le contexte d’une utilisation académique.

(Kitchin, 2014) consacre tout un [chapitre](https://www.insee.fr/fr/information/5008707?sommaire=5008710#) à explorer le mot « _data_ ». Il y explicite par exemple la « matière » dont sont faites les données : elles sont abstraites, discrètes, agrégeables, et ont un sens indépendamment du format, du support, du contexte. Il effectue surtout une distinction essentielle entre _fait_ et _donnée_ : si un fait est faux, il cesse d’être un fait, mais si une donnée est fausse, elle reste une donnée. Ainsi, les données sont ce qui existe préalablement à l’interprétation qui les transforme en faits, preuves, informations ([encadré 1](https://www.insee.fr/fr/information/5008707?sommaire=5008710#encadre1)).

Plus généralement, on peut constituer une pyramide données > information > connaissance > sagesse ([figure 1](https://www.insee.fr/fr/information/5008707?sommaire=5008710#figure1)), où chaque couche précède l’autre, et [se déduit de la précédente](https://www.insee.fr/fr/information/5008707?sommaire=5008710#) par un « processus de distillation » (abstraire, organiser, analyser, interpréter, etc.), qui ajoute du sens, de l’organisation, et révèle des liens. Ce que l’on peut imager par la formulation de (Weinberger, 2012) : « _L’information est aux données ce que le vin est à la vigne_ »), ou celle de (Escarpit, 1991) : « _Informer, c’est donner forme_ ».

