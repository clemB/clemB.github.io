---
author: Clément Borel
title: Mémo - Nettoyage des données
date: 24 janvier 2022
---
Nous traiterons, dans ce document, des méthodes de nettoyage de données tabulaires avec Google Spreadsheet.

S'il faut nettoyer les données, c'est donc qu'elles sont "sales" ! 
Pour un retour sur les notions de "données", "données sales", "données propres" ainsi que des conseils et astuces sur le nettoyage de données, je vous encourage vivement à jeter un œil à [l’excellente présentation](https://datactivist.coop/dwa_ddj_maroc/3-nettoyage/#1) de **Datactivist** sur ce sujet.

[<!-- https://datactivist.coop/dwa_ddj_maroc/3-nettoyage/#1 -->](https://datactivist.coop/dwa_ddj_maroc/3-nettoyage/#1)Toutes les ressources mises en ligne par Datactivist sont d'ailleurs de très bonne qualité. N'hésitez pas à [les consulter]([https://datactivist.coop/fr/ressources/](https://datactivist.coop/fr/ressources/)).

# Rappel de la méthodologie
Lorsque vous travaillez sur des données, veillez à respecter cette méthodologie qui permettra de structurer et documenter votre travail, afin de le rendre plus compréhensible et plus facilement partageable ; mais aussi retrouver facilement les informations initiales en cas d'erreur ou de mauvaise manipulation des données.

1. Importez les données de base dans une première feuille de calcul; appelez-la **source**. Vous pouvez également adjoindre un nom pertinent qui rappelle la thématique des données. *Ex : "source - villes françaises"* Vous ne toucherez plus cette feuille, elle sert de sauvegarde et contient les données brutes, non traitées.
2. Dupliquez cette feuille et nommez-la **travail** ; c'est dans cette feuille que vous effectuerez les traitements sur vos données.
3. Créez une troisième feuille de calcul **metadata** ; dans cette feuille marquez (au moins) le nom de la source, l'URL de la source (ou la référence biblio), la date de téléchargement ou consultation ; ajoutez toutes entrées qui vous semblent pertinentes pour la documentation de votre travail.

![Méthodologie - Feuilles de calcul.png](../../../Desktop/Méthodologie - Feuilles de calcul.png "Méthodologie - Feuilles de calcul")

Vous pouvez récupérer le [fichier d'exemple]( [https://docs.google.com/spreadsheets/d/15qKtuEWzFDLrGOXwQnK8pFLpCcN7e9mYcAi1i5BvmEk/edit?usp=sharing](https://docs.google.com/spreadsheets/d/15qKtuEWzFDLrGOXwQnK8pFLpCcN7e9mYcAi1i5BvmEk/edit?usp=sharing)).

# Nettoyer, balayer, astiquer...
## Comprendre le jeu de données
Assurez vous d'abord de comprendre les données qui vous sont présentées. Les libellés d'en-tête sont-ils presents et sont-ils compréhensibles ? N'hésitez pas à les réécrire pour qu'ils soient plus parlants et pensez à vous reporter à la documentation du jeu de données s'il celle-ci est accessible.

## Identifier les problèmes
Il est parfois difficile d'identifier les problèmes dans les jeux de données surtout lorsque ceux-ci sont volumineux.

Une bonne pratique consiste à **créer un filtre** sur les données. Ce filtre vous fournit une liste exhaustive des valeurs uniques contenues dans une colonne. Il est ainsi plus aisé de repérer les valeurs manquantes ou encore les doublons mal écrit. 

**Comment créer un filtre ?**

- sélectionnez l'ensemble des données à filtrer
- cliquez sur *Données > Créer un filtre*

![Créer un filtre](../../../Desktop/Créer un filtre.png)

Vous pouvez désormais déplier les options de filtre sur chaque colonne en cliquant sur le triangle vert ▼.

![Options de filtre](../../../Desktop/Options de filtre.png)

Dans l'exemple ci-dessus, la colonne E contient 4 valuers différentes :

- (vide) : aucune valeur
- — : tiret long (pour signifier aucun statut particulier)
- Préfecture
- Sous-préfecture

Ces filtres vous permettent également de modifier la vue ; autrement dit de masquer (temporairement) certains éléments. Il suffit de décocher les valeurs non désirée dans la liste.

Dans mon exemple, je peux choisir de n'afficher que les Préfectures. 
![Filtre Prefecture](../../../Desktop/Filtre Prefecture.png)

Sachez que tous ces filtres se cumulent. Ainsi vous pouvez filtrer vos données d'après différents critères sur plusieurs colonnes. 

**Par exemple**, nous pouvons n'afficher que les préfectures de Nouvelle Aquitaine en filtrant le colonne E (Statut) sur "Préfecture" et la colonne F (Région) sur "Nouvelle Aquitaine" :

![Filtre - Prefectures Nouvelle Aquitaine](../../../Desktop/Filtre - Prefectures Nouvelle Aquitaine.png)

**Attention !** N'oubliez pas de désactiver les filtres lorsque vous n'en avez plus besoin.

## Les types de données
Assurez-vous que le tableur considère les données à leur juste type ; autrement dit, qu'un nombre est bien considéré comme un nombre, une date comme une date, une chaîne de caractères comme une chaîne de caractères, etc.

Des indices visuels peuvent vous aider. En effet, par défaut (si aucune mise en forme contradictoire n'est appliquée), les valeurs numériques (nombres, dates, heures) sont alignées à gauche, les valeurs textuelles sont alignées à gauche.
**Astuce** : il peux être intéressant d'effacer la mise en forme avant toute opération. Pour cela, il suffit de tout sélectionner (CTRL+A) puis *Format > Effacer la mise en forme* (ou CTRL+\)

![Effacer la mise en forme](../../../Desktop/Capture d’écran 2022-01-24 à 14.42.16.png)

Pour s'assurer du format de données d'une colonne, sélectionnez la colonne (cliquez sur la l'entête lettrée) et choisissez le format de données adéquat dans la barre d'outils :

![Format de données](../../../Desktop/FormatDonnees.png)

## Rechercher / remplacer
Votre meilleur ami dans le traitement par lot de grands jeux de données est l'outil "Rechercher/remplacer". Il permet de remplacer toutes les occurrences d'une chaîne de caractères par une autre chaîne ou une chaîne vide (rien donc).

Très utile pour :

- supprimer certains caractères non désirés
- transformer en virgules **,** les points **.** dans les notations anglaises des nombres décimaux
- transformer les erreurs d'encodage des caractères (notamment sur les lettres accentuées et les caractères spéciaux)
-  …

Pour ce faire, sélectionnez la plage de données sur laquelle appliquer la recherche. Puis choississez *Edition > Rechercher et remplacer* (ou `CTRL`+`MAJ`+`H`). Entrez la chaîne recherchée et la chaîne de remplacement ; laissez vide la seconde pour effacer la chaîne recherchée. Cliquez sur *Tout remplacer*.

**Astuce :** Vous pouvez vérifier la validité de votre recherche en cliquant sur *Rechercher* avant de tout remplacer. Utilisez les options cliquables pour encore plus finesse.
 
# Quelques formules courantes
Vous retrouvez quelques exemples d'utilisation de ces formules dans le fichier d'exemple, notamment à la fin des colonnes (à partir de la ligne 285) : https://docs.google.com/spreadsheets/d/15qKtuEWzFDLrGOXwQnK8pFLpCcN7e9mYcAi1i5BvmEk/edit?usp=sharing

## Calculs simples
- **=MIN(*valeurs*)** : renvoie la plus petite valeur d'un ensemble de valeurs.
- **=MAX(*valeurs*)** : renvoie la plus grande valeur d'un ensemble de valeurs.
- **=SUM(*valeurs*)** : renvoie la somme d'un ensemble de valeurs.
- **=AVERAGE(*valeurs*)** : renvoie la  moyenne d'un ensemble de valeurs.

## Calculs Statistiques
- **=STDEV(*valeurs*)** : renvoie l’écart type d'un ensemble de valeurs
- **=VARP(*valeurs*)** : renvoie la variance d'un ensemble de valeurs

## Comptages de valeurs
- **=COUNT(*valeurs*)** : renvoie le nombre de valeurs **numériques** d'un ensemble de données.
- **=COUNTA(*valeurs*)** : renvoie le nombre de valeurs d'un ensemble de données.
- **=COUNTIF(*plage*;*critère*)** : renvoie le nombre de valeurs correspondant au critère.

## Manipulation du texte
- **=CONCATENATE(*plage*)** : concatène (joint bout à bout) les valeurs de la plage 
- **=JOINT("*délimiteur*";*plage*)** : joint, séparé par le délimiteur, les valeurs de la plage
- **=SPLIT("*délimiteur*";*valeur*)** : sépare (dans des cellules séparées) un texte selon un délimiteur
- **=UNIQUE(*plage*)** : Renvoie les valeur (par ligne) de la plage source fournie, en excluant les doublons.
- **=LEFT(*valeur*;*n*)** : renvoie les *n* premiers caractères d'une valeur
- **=RIGHT(*valeur*;*n*)** : renvoie les *n* derniers caractères d'une valeur

**Astuce** : Quand vous avez fait certaines opérations, il peut être intéressant de ne plus considérer ces cellules comme des **formules**, mais de les transformer en **valeurs**. Pensez alors à l'option **"coller uniquement les valeurs"** (ou **CTRL+MAJ+V**).

# Trouver des données
## Les données ouvertes
Une bonne source pour trouver des données est de parcourir les portails open de données ouvertes (open data). 
Voici une liste non exhaustive de portails francophones que vous pouvez utiliser : 

- [data.gouv.fr](https://www.data.gouv.fr)
- [https://data.culture.gouv.fr/pages/home/](https://data.culture.gouv.fr/pages/home/)
- [https://www.insee.fr/fr/accueil](https://www.insee.fr/fr/accueil)
- [https://ressources.data.sncf.com/pages/accueil/](https://ressources.data.sncf.com/pages/accueil/)
- [Datainfogreffe.fr](https://www.axysweb.com/top-15-des-sources-open-data/#datainfogreffe.fr)
- [Donnees.banquemondiale.org](https://www.axysweb.com/top-15-des-sources-open-data/#banquemondiale)
- [Data.inpi.fr](https://www.axysweb.com/top-15-des-sources-open-data/#data.inpi.fr)
- [Data.economie.gouv.fr](https://www.axysweb.com/top-15-des-sources-open-data/#data.economie.gouv.fr)
- [Pole-emploi.io](https://www.axysweb.com/top-15-des-sources-open-data/#pole-emploi.io)
- [Adresse.data.gouv.fr](https://www.axysweb.com/top-15-des-sources-open-data/#adresse.data.gouv.fr)
- [Data.education.gouv.fr](https://www.axysweb.com/top-15-des-sources-open-data/#data.education.gouv.fr)
- [Datatourisme.gouv.fr](https://www.axysweb.com/top-15-des-sources-open-data/#datatourisme.gouv.fr)
- [Donnéespubliques.meteofrance.fr](https://www.axysweb.com/top-15-des-sources-open-data/#donn%C3%A9espubliques.meteofrance.fr)
- [Base-données-publiques.médicaments.gouv.fr](https://www.axysweb.com/top-15-des-sources-open-data/#base-donn%C3%A9es-publiques.m%C3%A9dicaments.gouv.fr)

Pour en découvrir davantage : [http://dataportals.org/](http://dataportals.org/) ou entrez dans votre moteur de recherche favori une thématique, une institution, un territoire adjoint du terme "Open Data" est laissez-vous guider ;)

## Le Web scrapping
Les pages web sont elles-mêmes des sources potentielles de données. Le langage HTML qui régit ces pages étant un langage structuré, il est relativement simple d’extraire de façon automatique (ou presque) des données sous une forme exploitable. Pour ceux qui souhaitent tenter l'expérience, voici une liste non exhaustive d'outils de *"web scrapping"* :

- [https://www.import.io/](https://www.import.io/)
- [https://scrapy.org/](https://scrapy.org/)
- [https://webhose.io/](https://webhose.io/)
- [http://webscraper.io/](http://webscraper.io/)
- [https://phantombuster.com/](https://phantombuster.com/)
- [https://apify.com/](https://apify.com/)
- [https://www.scraping-bot.io/](https://www.scraping-bot.io/)
- [https://www.parsehub.com/](https://www.scraping-bot.io/)
- [https://www.octoparse.com/](https://www.octoparse.com/)

##  Importation de contenu Web dans Sheet
Un peu moins performante mais sans doute plus facilement accessible, la fonction **'`IMPORTHTML`** de Google Sheet. Celle-ci permet de récupérer directement du contenu web sur une page.

Cela marche très bien avec les données tabulaires de Wikipedia. Ainsi, **comment extraire un tableau d'une page Wikipedia ?**

1. Allez sur la page Wikipedia sur laquelle se trouve le tableau ; copiez l'URL.
2. Repérez l’occurrence (position) du tableau à extraire (nième tableau de la page)
3. Dans une feuille de calcul vierge, tapez : `=IMPORTHTML("*URL*";"table";*occurrence*)`

**Ex :** Sur la page Wikipedia de la France ([https://fr.wikipedia.org/wiki/France](https://fr.wikipedia.org/wiki/France)), je souhaite récupérer le tableau sur les villes les plus peuplées. C'est la neuvième occurrence de tableau de la page. 

![Page France Wikipedia - Tableau les villes les plus peuplées ](../../../Desktop/Capture d’écran 2022-01-24 à 15.34.05.png "Page France Wikipedia - Tableau les villes les plus peuplées ")

J'entre donc : 
```
=IMPORTHTML("https://fr.wikipedia.org/wiki/France";"table";9)
```
**...et Bingo :**
!["Importation du tableau dans ma feuille de calcul Google Sheet](../../../Desktop/Capture d’écran 2022-01-24 à 15.33.58.png)

N'hésitez pas à vous reporter à [la documentation](https://support.google.com/docs/table/25273?hl=fr) sur les formules Google Sheet.



