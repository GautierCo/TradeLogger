# TradeLogger

Pour passer mon « _Titre Professionnel Développeur Web & Mobile_ » j'ai créé cette petite application du back jusqu'au front. A savoir pourquoi elle n'est pas totalement terminée.

## Introduction

**TradeLogger** est une application permettant aux traders de suivre quotidiennement toutes les actions d’achat ou de vente qu’ils exécutent.

Bénéficier d’une synthèse avec des statistiques sur l’ensemble des trades, par exemple le pourcentage de trades gagnant.

Pour être gagnant sur le long terme la psychologie est capitale, c’est pourquoi vous avez la possibilité de tenir votre propre journal de bord, ce qui vous permettra ensuite d’analyser votre état d’esprit en fonction des résultats obtenus.

## Problématiques :

-   La gestion de plusieurs fichiers tels que Excel ou Word n’est vraiment pas pratique et idéale pour suivre ses trades et son état d’esprit.
-   Savoir quand on a perdu, et pourquoi, permet de changer de stratégie si nécessaire ainsi que d’éviter de refaire les mêmes erreurs.
-   Perte de temps non négligeable pour créer son propre Excel de suivi.

## Solutions :

**TradeLogger** propose une solution de suivi tout en un de son trading, tout d’abord il vous fera gagner du temps, car il n’y a pas besoin de créer un Excel de suivi compliqué, tout est déjà prêt à être utilisé dès votre première connexion.

Une interface agréable à utiliser, sur un seul support ce qui permet d’être plus efficace et d’avoir toutes ses données à un seul et même endroit.

Dans les prochaines fonctionnalités, il vous sera possible de récupérer automatiquement vos trades depuis la plateforme de trading que vous utilisez, sans même devoir le remplir manuellement.

## Stack technique :

![](https://i.imgur.com/Z0lcYwg.png)

## App :

![](https://i.imgur.com/7cIvK6P.gif)

## Test en local :

**Version NodeJS :** 14.x

Vous devez avoir installé **[MongoDBCompass](https://www.mongodb.com/products/compass)** et créer une base de donnée nommée **"tradelogger"**.

### Client :

-   Diriger vous dans le dossier **"client"** avec votre invite de commande.
-   Lancer l'installation des dépendances avec la commande **yarn**
-   Une fois installées, éxecuter la commande : **yarn start**.

### Server :

-   Diriger vous dans le dossier **"server"** avec votre invite de commande.
-   Lancer l'installation des dépendances avec la commande **yarn**
-   Une fois installées, éxecuter la commande : **yarn dev**.

## Liens :

➜ Le serveur est hébergé chez **Heroku** en version gratuite, si il n'y a pas d'activité au bout d'une heure il se met en "veille". Si vous souhaitez tester l'application une fois que la première requête sera effectuée il faudra attendra 30 secondes avant que le serveur puisse vous retourne les données.

-   [Application](https://trader-logger.vercel.app/)
-   [Github](https://gautiercolasse.com/)
-   [Linkedin](https://www.linkedin.com/in/gautier-colasse/)
