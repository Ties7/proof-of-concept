// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from "express";

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs";

// ----------------------- SERVER SETUP -----------------------

// WHOIS API
const API_BASE_URL = "";

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express();

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"));

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine("liquid", engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views");

// ----------------------- LIKE FUNCTIES -----------------------

// in de database staat bij from 'ties-funda', dit zodat je mijn posts kan onderscheiden tussen die van anderen
const likedFrom = "ties-funda"

async function listLiked() { // door async word de rest van de code niet op stop gezet
  // maak get request om alle likes op te halen
  const url = `https://fdnd.directus.app/items/messages?filter={"from":"${likedFrom}"}`; // filtert alleen door 'ties-funda' in de directus api
  const response = await fetch(url);
  const responseJSON = await response.json();

  return responseJSON.data;
}

async function getLiked(id) { // functie die kijkt of een bepaald huis met id al geliket is
  // maak get request om de likes voor dat huis op te halen met die id
  const url = `https://fdnd.directus.app/items/messages?filter={"for":"${id}","from":"${likedFrom}"}`; // filtert alleen op 'id' en weer op 'ties-funda'
  const response = await fetch(url);

  const responseJSON = await response.json();
  return responseJSON.data[0]; // dit is of de message, of niks (undefined als deze niet bestaat)
}

async function likeHouse(id) {
  // check of er al een like post bestaat. zo ja dan hoeven we niks te doen
  const message = await getLiked(id); // checkt of dit huis al geliked is
  if (message) return; // bestaat er een like, oftewel komt er iets terug dan niks doen

  // maak post request om nieuwe message aan te maken voor liked huis
  const url = "https://fdnd.directus.app/items/messages"; // url waar naar gepost gaat worden
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // vertel dat de body json is
    body: `{"for":"${id}","from":"${likedFrom}"}` // stuurt op wie welk huis liked. 'id' 'ties-funda'
  });
}

async function unlikeHouse(id) { // functie die een like van een huis verwijdert
  const message = await getLiked(id); // check of er een like post bestaat. zo niet dan hoeven we niks te doen
  if (!message) return; // als er geen like is, oftewel er komt niks terug dan niks doen

  const url = `https://fdnd.directus.app/items/messages/${message.id}`; // maak delete request om de like te verwijderen
  await fetch(url, { method: "DELETE" }); // delete request
}

// ----------------------- HUIS FUNCTIES -----------------------

async function listHouses() {
  // maak get request om alle huizen op te halen
  const url = "https://fdnd-agency.directus.app/items/f_houses";
  const response = await fetch(url);
  const responseJSON = await response.json();

  return responseJSON.data;
}

async function getHouse(id) {
  // maak get request om huis op te halen op id
  const url = `https://fdnd-agency.directus.app/items/f_houses/?filter={"id":"${id}"}&fields=*,gallery.directus_files_id`;
  const response = await fetch(url);
  const responseJSON = await response.json();

  return responseJSON.data[0]; // hier komt of een huis terug, of niks (undefined)
}

// ----------------------- OVERZICHTPAGINA -----------------------

app.get("/", async function (request, response) {
  const houses = await listHouses(); // listHouses is een functie die we hergebruiken: "https://fdnd-agency.directus.app/items/f_houses"
  response.render("overview-page.liquid", { houses: houses });
});

// ----------------------- FAVORIETEN PAGINA -----------------------

app.get("/favorieten", async function (request, response) {
  const houses = await listHouses();
  const liked = await listLiked();


  const likedHouses = [];
  // per like in de lijst met alle likes door de lijst met alle houses gaan. komt er één overeen dan dat huis in de lijst met gelikete huizen toevoegen (pushen)
  for (const like of liked) {
    for (const house of houses) {
      if (like.for == house.id) { // == want string en getal vergelijken. string == getal is true, string === getal is false.
        likedHouses.push(house);
        break; // stoppen als er een huis (id) overeenkomt met like (for). dit voor de performance
      }
    }
  }

  response.render("overview-page.liquid", { houses: likedHouses });
});

// ----------------------- DETAILPAGINA -----------------------

app.get("/huis/:id", async function (request, response) {
  const houseId = request.params.id;

  const house = await getHouse(houseId);
  const liked = await getLiked(houseId);

  // !!liked als er geen geen liked is oftewel als er wel een like is
  const isLiked = !!liked; // dit wordt gebruikt voor de data-liked {{ liked }}, true of false

  response.render("detail-page.liquid", { house: house, liked: isLiked });
});

// ----------------------- LIKE/UNLIKE API -----------------------

app.post('/huis/:id/like', async function (request, response) { // post request op de route /huis/:id/like
  const houseId = request.params.id // haalt het id op
  await likeHouse(houseId) // activeert likeHouse functie om met het id van dat huis
  response.send(200) // stuurt code terug als antwoord (ok)
})

app.post('/huis/:id/unlike', async function (request, response) { // weer een post request op de route /huis/:id/like
  const houseId = request.params.id // haalt het id op
  await unlikeHouse(houseId) // activeert likeHouse functie om met het id van dat huis een like te verwijderen
  response.send(200) // (ok)
})

// ----------------------- SERVER STARTEN -----------------------

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000);

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  console.log(
    `Project draait via http://localhost:${app.get(
      "port"
    )}`
  );
});