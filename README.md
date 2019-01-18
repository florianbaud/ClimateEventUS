## Evénements climatiques aux Etats-Unis : saisonalité et influence sur le prix des assurances.
<i>Projet réalisé par Cheikh Toure, Rhizlaine Degni, Floriand Baud et Antoine Vendeville.</i>

https://florianbaud.github.io/#

#### Dataset
Le dataset est disponible à l'adresse suivante https://catalog.data.gov/dataset/ncdc-storm-events-database (ne marche pas actuellement en raison du blocage administratif aux Etats-Unis). Il contient des données sur plus de 50 millions d'événements climatiques survenus aux Etats-Unis durant l'année 2017, de plus de 50 types différents : tornade, inondation, sécheresse, ... On a notamment, pour chaque événement, les états touchés, le nombre de blessés, le nombre de morts et l'évaluation des dégâts causés en $.

#### Objectifs
Notre objectif se décompose en deux parties. Premièrement, essayer d'établir une corrélation entre les dégâts causés par les catastrophes naturelles aux Etats-Unis et le prix des assurances habitation. Deuxièmement, établir une visualisation temporelle des occurences d'événements de chaque type afin de déterminer en quelles saisons se produit chaque type d'événements.

#### Intérêt
Cette visualisation peut servir aux gens désirant déménager aux Etats-Unis, afin qu'ils sachent dans quel état ils ont le moins de chances d'être touchés par une catastrophe naturelle et/ou dans lesquels ils paieront l'assurance habitation la moins chère. La visualisation temporelle permet de savoir quels états sont les plus dangereux à un moment donné dans l'année.

#### Réalisation
Pour la partie assurance, on a juxtaposée une carte des Etats-Unis et un wordcloud. Sur le wordcloud, chaque état est représenté avec une taille proportionnelle au prix des assurances habitations. On peut comparer avec la carte : lorsqu'on sélectionne un type d'événement, les états y sont colorés en fonction des dégâts causés par tous les événements de ce type cumulés. On peut ainsi
observer la corrélation entre les dégâts causés par les événements climatiques et le prix des assurances.

Pour la partie visualisation, on a fait une HeatMap qui représente la fréquence des différents types événements climatiques au fil de l'année. Chaque case correspond à un mois (en abscisse) et un type d'événement (en ordonnée) et est coloriée en fonction du nombre d'événements de ce type qui ont été observés durant le mois. On observe ainsi l'impact des saisons sur les type d'événements rencontrés.

<br></br>
