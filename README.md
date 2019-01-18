## Evénements climatiques aux Etats-Unis : saisonalité et influence sur le prix des assurances.
<i>Projet réalisé par Cheikh Toure, Rhizlaine Degni, Floriand Baud et Antoine Vendeville.</i>

https://florianbaud.github.io/# (disponible sur mobile également)

### Dataset
Le dataset concernant les événements climatiques est disponible à l'adresse suivante https://catalog.data.gov/dataset/ncdc-storm-events-database (ne marche pas actuellement en raison du blocage administratif aux Etats-Unis). Il contient des données sur plus de 50 millions d'événements climatiques survenus aux Etats-Unis durant l'année 2017, de plus de 50 types différents : tornade, inondation, sécheresse, ... On a notamment, pour chaque événement, les états touchés, le nombre de blessés, le nombre de morts et l'évaluation des dégâts causés en $.

En ce qui concerne le prix des assurances habitation, les données sont à l'adresse https://quotewizard.com/news/posts/home-insurance-rate-increase-by-state.

### Objectifs
Notre objectif se décompose en deux parties. Premièrement, essayer d'établir une corrélation entre les dégâts causés par les catastrophes naturelles aux Etats-Unis et le prix des assurances habitation. Deuxièmement, établir une visualisation temporelle des occurences d'événements de chaque type afin de déterminer en quelles saisons se produit chaque type d'événements.

### Intérêt
Cette visualisation peut servir aux gens désirant déménager aux Etats-Unis, afin qu'ils sachent dans quel état ils ont le moins de chances d'être touchés par une catastrophe naturelle et/ou dans lesquels ils paieront l'assurance habitation la moins chère. La visualisation temporelle permet de savoir quels états sont les plus dangereux à un moment donné dans l'année.

### Réalisation
Pour la partie assurance, on a juxtaposée une carte des Etats-Unis et un wordcloud. Sur le wordcloud, chaque état est représenté avec une taille proportionnelle au prix des assurances habitations. On peut comparer avec la carte : lorsqu'on sélectionne un type d'événement, les états y sont colorés en fonction des dégâts causés par tous les événements de ce type cumulés. En passant sur les états, les dégâts ainsi que le nombre de blésset de morts s'affichent, et l'état est mis en avant dans le wordcloud (et inversement lorsqu'on passe la souris sur un état dans le wordcloud). On peut ainsi observer la corrélation entre les dégâts causés par les événements climatiques et le prix des assurances.

Pour la partie temporelle, on a fait une HeatMap qui représente la fréquence des différents types événements climatiques au fil de l'année. Chaque case correspond à un mois (en abscisse) et un type d'événement (en ordonnée) et est coloriée en fonction du nombre d'événements de ce type qui ont été observés durant le mois. On observe ainsi l'impact des saisons sur les type d'événements rencontrés.

#### Inspiration
GeoMap : https://lyondataviz.github.io/teaching/lyon1-m2/2018/tp5.html
WordCloud : https://jsfiddle.net/plantface/g6faeurj/
HeatMap : https://codepen.io/ubershibs/pen/JbKVPJ
<br></br>


## Climate events in the United States: seasonality and influence on the price of insurance.
<i>Project realized by Cheikh Toure, Rhizlaine Degni, Floriand Baud and Antoine Vendeville.</i>

https://florianbaud.github.io/# (also available on mobile)

### Dataset
The climate events dataset is available at https://catalog.data.gov/dataset/ncdc-storm-events-database (does not currently work due to administrative blocking in the US). It contains data on more than 50 million climatic events in the United States during the year 2017, of more than 50 different types: tornado, flood, drought, ... For each event, the states affected, the number of injuries, the number of deaths and the damage assessment in $.

Regarding the price of home insurance, the data is at https://quotewizard.com/news/posts/home-insurance-rate-increase-by-state.

### Objectives
Our goal is divided into two parts. First, try to correlate the damage caused by natural disasters in the United States with the price of home insurance. Second, establish a temporal visualization of event occurrences of each type to determine which seasons each type of event occurs.

### Interest
This visualization can be used by people wishing to move to the United States, so that they know in what state they are least likely to be affected by a natural disaster and / or in which they will pay the cheapest home insurance. The temporal visualization makes it possible to know which states are the most dangerous at a given moment in the year.

### Production
For the insurance part, we juxtaposed a map of the United States and a wordcloud. On the wordcloud, each state is represented with a size proportional to the price of home insurance. One can compare with the map: when selecting a type of event, the states are colored there according to the damage caused by all the cumulated events of this type. By hovering over the states, the damage and the number of deaths are displayed, and the state is highlighted in the wordcloud (and vice versa when you mouse over a state in the wordcloud). We can thus observe the correlation between the damage caused by climate events and the price of insurance.

For the temporal part, we made a HeatMap which represents the frequency of the different types of climatic events throughout the year. Each box corresponds to one month (in abscissa) and one type of event (in ordinate) and is colored according to the number of events of this type which were observed during the month. We observe the impact of the seasons on the types of events encountered.

#### Inspiration
GeoMap : https://lyondataviz.github.io/teaching/lyon1-m2/2018/tp5.html
WordCloud : https://jsfiddle.net/plantface/g6faeurj/
HeatMap : https://codepen.io/ubershibs/pen/JbKVPJ
<br></br>
