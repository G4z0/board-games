import { parseStringPromise } from 'xml2js';

const BOARDGAME_API_URL = 'https://www.boardgamegeek.com/xmlapi2';

export async function searchBoardGames(query) {
  const response = await fetch(`${BOARDGAME_API_URL}/search?type=boardgame&query=${encodeURIComponent(query)}`);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  return json.items.item.map(item => ({
    id: item.$.id,
    name: item.name[0].$.value,
    yearPublished: item.yearpublished ? parseInt(item.yearpublished[0].$.value, 10) : null,
  }));
}
export async function getNewestGames(limit = 4) {
  const response = await fetch(`${BOARDGAME_API_URL}/hot?type=boardgame`);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  const games = json.items.item.slice(0, limit).map((item) => ({
    id: item.$.id,
    name: item.name[0].$.value,
    yearPublished: item.yearpublished ? parseInt(item.yearpublished[0].$.value, 10) : null,
  }));
  return games;
}

export function decodeEntities(encodedString) {
  const div = document.createElement('div');
  div.innerHTML = encodedString;
  return div.textContent;
}

export async function getBoardGameDetails(id) {
  const response = await fetch(`${BOARDGAME_API_URL}/thing?id=${id}&stats=1`);
  const xml = await response.text();
  const json = await parseStringPromise(xml);
  const game = json.items.item[0];

  return {
    id: game.$.id,
    name: game.name[0].$.value,
    yearPublished: parseInt(game.yearpublished[0].$.value, 10),
    minPlayers: parseInt(game.minplayers[0].$.value, 10),
    maxPlayers: parseInt(game.maxplayers[0].$.value, 10),
    playingTime: parseInt(game.playingtime[0].$.value, 10),
    thumbnail: game.thumbnail[0],
    image: game.image[0],
    description: decodeEntities(game.description[0]),
    designers: game.link.filter(link => link.$.type === 'boardgamedesigner').map(link => link.$.value),
    publishers: game.link.filter(link => link.$.type === 'boardgamepublisher').map(link => link.$.value),
    categories: game.link.filter(link => link.$.type === 'boardgamecategory').map(link => link.$.value),
    mechanics: game.link.filter(link => link.$.type === 'boardgamemechanic').map(link => link.$.value),
    families: game.link.filter(link => link.$.type === 'boardgamefamily').map(link => link.$.value),
    expansions: game.link.filter(link => link.$.type === 'boardgameexpansion').map(link => link.$.value),
    artists: game.link.filter(link => link.$.type === 'boardgameartist').map(link => link.$.value),
    implementations: game.link.filter(link => link.$.type === 'boardgameimplementation').map(link => link.$.value),
  };
}
