import { findKeywords } from "./fetchKeyword";
import { getCharacterInspiration } from "./getCharacterInspiration";
import { getRandomName } from "./getRandomName";
import { getWeather } from "./weather";
import {SimpleDirectoryReader, VectorStoreIndex} from "llamaindex";
import path from "path";
import {search} from "./search";

export default {
  getWeather: getWeather,
  findKeywords: findKeywords,
  getRandomName: getRandomName,
  getCharacterInspiration: getCharacterInspiration,
  search: search,
};
