# Projet SEP

Le but de se projet est d'offrir un moyen simple et efficace pour gérer un stock de produits.

## Technologies

Le projet est "séparé" en 2 applications différentes:

- Une REST API avec python et django
- Une Interface avec Ionic et React

### REST API

La REST API est la partie chargée d'ajouter, mettre à jour, supprimer et stocker les données. Ces données sont sauvegardées dans une base de données compatible avec django. On accède à ces données via des requêtes HTTP selon les principes standard des REST API.

L'API est développée avec django, les données sont accessibles par un utilisateur "staff" via le panel django admin. Ce panel offre une manière alternative des gérer les données en cas d'erreur dans "l'interface".

Une documentation Open API Spec de l'API Rest est auto-généré et rendue accessible via Swagger-UI.

### Interface "mobile"

Afin de garantir une compatibilité entre tout appareils. L'interface est développée sous la forme d'un site web compatible avec les dernière version de Firefox, des navigateurs basés sur Chromium et de Safari. Les QR Codes vont être scannés avec un téléphone c'est pourquoi l'interface est développée avec Ionic dans les dimensions d'un appareil mobile et pourrait sembler "bizarre" sur un grand écran.

## Plateformes

Le projet va être déployé sur Heroku (pour la REST API) et sur Vercel (pour l'interface). C'est deux service offres des plans gratuit. Si jamais le projet dépasse ces plan gratuits, il vaut peut-être mieux chercher une alternative.

## Maquettes

// TODO : ajouter les maquettes ici

## TODO List:

- [x] Maquettes de l'application
- [x] Schema de modélisations de données
- [x] Implémentation des modèle de données
- [x] Configuration de panel django admin (en Anglais (GB))
- [x] Initialisation de l'interface
- [ ] `En cours...` Implémentation des liens de l'API REST
- [ ] `En cours...` Implémentation de l'interface
- [ ] Test (unit ?, e2e ?, acceptance ?)
