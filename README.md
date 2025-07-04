# funda
Live website: https://proof-of-concept-gaf8.onrender.com/

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
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

Als de javascript uit staat dan klapt het hamburger menu op mobile uit zodat je ook op mobile dan door alle links kan navigeren. Ik heb hier voor gekozen, omdat de core functionality van de nav is dat je kan navigeren tussen alle links. Als javascript uit staat en je kijkt de website op mobile dan zou het hamburger menu niet uitklapbaar zijn en kan je een deel van de nav niet gebruiken, daarom heb ik er voor gekozen om doormiddel van een js class de nav progressively enhanced te maken (meer hierover bij kenmerken).

### Image viewer
![image](https://github.com/user-attachments/assets/4c58d574-ebc7-459d-aa36-5cc5912d5466)
![image](https://github.com/user-attachments/assets/d9c7dafa-17a5-482b-be68-f1372ef4648f)

Op desktop zie je de eerste 5 preview images, op tablet de eerste 3 en op mobile alleen de eerste. Als je de image viewer opent dan kan je in de carousel door alle images heen swipen/klikken. Alle images hebben scroll snap zodat de gebruiker een fijnere ervaring heeft.

Als de javascript uit staat dan krijg je alle images in een grid te zien en kan je niet meer een carousel openen. Dit is, zodat je altijd alle afbeeldingen kan bekijken. Ik heb hier voor gekozen, omdat de core functionality van de image viewer is dat je alle images kan bekijken en met deze oplossing kan dat ook.

### Favorieten POST
https://github.com/user-attachments/assets/1dc2ec68-5683-4a05-9280-d650f5918556

In de rechter hoek van de image viewer staat een button om het huis op te slaan in je favorieten. Als je daarop klikt dan word het hartje kleiner totdat de POST verstuurd is, daarna vult het hartje zich en schud een keer. Als je dan het hartje weer unliked door er weer op te klikken dan word die weer iets kleiner en krijgt die alleen een outline.
Dit heb ik gedaan zodat de gebruiker feedback krijgt op wat hij/zij doet. Dit is heel belangrijk, zodat de gebruiker niet twijfelt of de like wel echt heeft gewerkt.

Als je na het liken in de nav bar navigeerd naar 'favorieten' dan krijg je op die pagina al je favorieten huizen te zien.

### Share
https://github.com/user-attachments/assets/d32aa743-cb74-4884-a9d6-2af6ac96d027

Links naast de like/favorieten button staat de share button. Als je device (navigator.share) ondersteund dan opent het deel scherm van je device en word het niet ondersteund dan zal de link van de huidige pagina gewoon gekopieërd worden naar je clipboard. Als je op de share button hebt geklikt dan veranderd het share icoontje naar een check icoontje. Dit is heel belangrijk voor devices/browsers waar de navigator.share niet ondersteund wordt, zodat de gebruiker weet dat de link gekopieërd is. Anders zal de gebruiker er op blijven klikken als er geen feedback is.

Ook krijg je een melding te zien als de share het niet doet en je er wel op drukt. Dit zodat de gebruiker weet wat er gebeurd.
![WhatsApp Image 2025-06-21 at 13 31 03](https://github.com/user-attachments/assets/ca4c487c-bbf7-4907-8f3f-905b1464fab0)

## Kenmerken
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
### Nav-bar
De nav bar is progressive enhanced door deze javascript:
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/views/partials/nav-version-2.liquid#L261

Als de javascript uit staat dan zal de class '.js' niet aan de html worden gegeven. Daardoor werkt sommige styling in css niet. Daardoor wordt het hamburger menu altijd uitgeklapt waardoor je altijd alle content kan zien, zelfs als js uit staat. 

### Image viewer
De image viewer is progressive enhanced door deze javascript:
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/public/scripts/detail-page.js#L1-L4

De javascript die haalt de 'show-all' class op de gallery weg. Als de javascript uit staat dan heeft de gallery dus wel die class en worden alle afbeeldingen getoont.

De image viewer werkt verder als volgt:
- De afbeeldingen worden per schermgrootte anders weergegeven door middel van nth-child.
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/public/styles/funda.css#L67-L69
- De dialog/modal wordt geopend doormiddel van deze javascript
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/public/scripts/detail-page.js#L47-L48
- Hier wordt eerst de gallery geselecteerd en er word een array aangemaakt van alle 'li's in de gallery
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/public/scripts/detail-page.js#L47-L48
- Dit opent het <dialog> element. Dit gebeurd op (item), oftewel de 'li' waar je op hebt geklikt. En door 'carousel.scrollto' opent de 'li' waar je op hebt geklikt. Hier wordt namelijk de 'carouselclientWidth' vermenigvuldigd met 'item'. In woorden is dat 'de breedte van 1 afbeelding' vermenigvuldigd met 'huidige nummer van de aangeklikte 'li'.
https://github.com/Ties7/proof-of-concept/blob/297106d43a5fed2f29d2283d1410583331b583d0/public/scripts/detail-page.js#L50-L62
- Hier wordt voor elke galleryItem (de array met alle 'li's) een functie aangemaakt. (item is huidige 'li' en index is de positie in de array).
Er wordt een click event toegevoegd die de functie 'openModal(index) aanroept bij het uitvoeren. (index is de positie in de array)
https://github.com/Ties7/proof-of-concept/blob/main/public/scripts/detail-page.js#L58-L62

### Favorieten POST
- Eerst wordt er op de button een click eventlistener toegevoegd.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L210
- De 'data-like' is true of falsee. True betekend dat het huis al geliked is en false betekend dat het huis nog niet geliked is. Of het true of false is komt uit een functie uit de server.js. Daar is een functie die op een bepaald id zoekt of die in de liked database staat. Komt daar niks uit dan !!undefined = false, en zo wel dan !!{} = true
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L26
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/server.js#L133
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L212
- Als 'isLiked' true is dan moet het unliken en als het false is moet het liken. (/huis/1/like, /huis/1/unlike)
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L218
- Daarna wordt er een post request gemaakt naar de url die we hiervoor hebben gedefinieerd.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L219
- Daarna wordt de status veranderd, als het eerst true was wordt het nu false en andersom hetzelfde.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L223

- Als de post request binnenkomt op bijvoorbeeld (/huis/:id/like) dan wordt die functie uitgevoerd. Dan wordt het id uit die url gehaald en op dat id wordt de functie 'likeHouse' aangeroepen. Dit werkt hetzelfde voor unliken, maar dan wordt de functie 'unlikeHouse' aangeroepen.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/server.js#L140-L144
- Dan wordt er gekeken of het huis al geliked is, zo wel (is er al een message met dat id) dan wordt er niks gedaan. Zo niet wordt er naar de url gepost met daarin een 'for' en 'from'. de 'for' is het idee van het huis en de 'from' is 'ties-funda' om mijn posts te onderscheiden van die van de rest.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/server.js#L54-L66
- Bij het unliken gebeurd er bijna hetzelfde, maar net iets anders. Er wordt weer gekeken of er al een message is met dat id, als die niet bestaat niks doen. Als die wel bestaat wordt er op het url met het juiste id de method delete gedaan.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/server.js#L68-L74

### Share
- Er wordt voor de share button een click event toegevoegd. Als er op wordt geklikt word er eerst gekeken of 'navigator.share' ondersteund wordt. Zo wel dan wordt dat uitgevoerd, maar zo niet dan wordt 'navigator.clipboard' uitgevoerd. Hoe het kan dat de link wordt gekopieërd van de pagina waar je op zit is, omdat helemaal bovenaan er in 'shareData' voor het url doormiddel van 'window.location.href' de pagina waar je op dit moment op zit achterhaald wordt.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L230-L254
- De svg veranderd van de 'share icon' naar de 'check icon' door javascript die de html veranderd. 'innerHTML' is het gene wat ervoor zorgt dat de html vervangen wordt.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L257-L261
- Ten slotte zorgt de 'setTimeout' ervoor dat het maar voor 2 seconden vervangen wordt.
https://github.com/Ties7/proof-of-concept/blob/b43245cfd677df8b75dd914611bb5ab184ad7978/views/detail-page.liquid#L263-L265

## Installatie
Ga naar de website van Node.js (https://nodejs.org/en) en download de LTS versie. Allereerst is het belangrijk om de repo te forken en clonen zodat je in je eigen omgeving zit. Ga daarom naar github en als je in de juiste repo zit druk dan fork. Na het forken open je de repo met github desktop door op de groene 'code' button en daarna op 'open with GitHub Desktop' te drukken. In github desktop clone je de repo zodat de code in vscode staat. Nu open je je terminal en navigeer je naar de juiste map (waar je je repo lokaal hebt staan) en voer " cd 'locatie/pad van repo' " uit. Ook kan dit door in github desktop op 'repository' te drukken en daarna op 'open in command prompt'. Met de laatste manier ben je automatisch al in de juiste locatie/pad in de terminal. Nu je in je terminal in de juiste map bent voer je 'npm install' uit in terminal om alle benodigde paketten te installeren. Voer nu 'npm start' uit in terminal om lokaal je 'server' op te starten. Open het adres wat te zien is na het uitvoeren van stap 4 (http://localhost:'port') Mocht je dingen veranderen in server.js moet je je lokale 'server' opnieuw starten door 'ctrl + c' of 'cmd + c' te typen in de terminal waar je ook de server hebt opgestart. Om hem op te starten typ je weer 'npm start' in de terminal. Nu kun je werken in je eigen omgeving doormiddel van node :)

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
