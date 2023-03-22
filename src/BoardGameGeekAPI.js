// src/boardGameGeekAPI.js
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
    description: game.description[0],
  };
}
