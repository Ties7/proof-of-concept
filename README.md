# funda

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Ik heb de overzichtspagina (waar alle huizen te zien zijn), de detailpagina (waar je alle informatie van 1 huis ziet) en de favorieten pagina (waar je je opgeslagen huizen ziet) gemaakt.

### Nav-bar
![image](https://github.com/user-attachments/assets/f23d9ce3-ce06-49c5-b11a-0d1b659dd211)
![image](https://github.com/user-attachments/assets/21bf44f1-1347-4b44-aaba-ca91572fc8e5)
![image](https://github.com/user-attachments/assets/0e781c3c-048d-499c-a262-735f184ef187)

Op desktop zijn alle navigatie links te zien en links en rechts gepositioneerd in de nav. Op mobile blijven de rechter navigatie links zichtbaar en de linker links veranderen in een hamburger menu die in- en uitklapbaar is. Als je het hamburger menu opent dan fade die vanaf boven naar beneden in en vult het hele scherm. Dat hamburger menu is te sluiten door het kruisje.

Als de javascript uit staat dan klapt het hamburger menu op mobile uit zodat je ook op mobile dan door alle links kan navigeren.

### Image viewer
![image](https://github.com/user-attachments/assets/4c58d574-ebc7-459d-aa36-5cc5912d5466)
![image](https://github.com/user-attachments/assets/d9c7dafa-17a5-482b-be68-f1372ef4648f)

Op desktop zie je de eerste 5 preview images, op tablet de eerste 3 en op mobile alleen de eerste. Als je de image viewer opent dan kan je in de carousel door alle images heen swipen/klikken. Alle images hebben scroll snap zodat de gebruiker een fijnere ervaring heeft.

Als de javascript uit staat dan krijg je alle images in een grid te zien en kan je niet meer een carousel openen. Dit is, zodat je altijd alle afbeeldingen kan bekijken.

### Favorieten POST
https://github.com/user-attachments/assets/1dc2ec68-5683-4a05-9280-d650f5918556

In de rechter hoek van de image viewer staat een button om het huis op te slaan in je favorieten. Als je daarop klikt dan word het hartje kleiner totdat de POST verstuurd is, daarna vult het hartje zich en schud een keer. Als je dan het hartje weer unliked door er weer op te klikken dan word die weer iets kleiner en krijgt die alleen een outline.
Dit heb ik gedaan zodat de gebruiker feedback krijgt op wat hij/zij doet. Dit is heel belangrijk, zodat de gebruiker niet twijfelt of de like wel echt heeft gewerkt.

Als je na het liken in de nav bar navigeerd naar 'favorieten' dan krijg je op die pagina al je favorieten huizen te zien.

### Share
https://github.com/user-attachments/assets/d32aa743-cb74-4884-a9d6-2af6ac96d027

Links naast de like/favorieten button staat de share button. Als je device (navigator.share) ondersteund dan opent het deel scherm van je device en word het niet ondersteund dan zal de link van de huidige pagina gewoon gekopieërd worden naar je clipboard. Als je op de share button hebt geklikt dan veranderd het share icoontje naar een check icoontje. Dit is heel belangrijk voor devices/browsers waar de navigator.share niet ondersteund word, zodat de gebruiker weet dat de link gekopieërd is. Anders zal de gebruiker er op blijven klikken als er geen feedback is.

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

## Kenmerken
### Nav-bar

### Image viewer

### Favorieten POST

### Share

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
