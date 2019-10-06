import { fetcher, v1 } from "./common";
import { FirstItemDto } from "../../interfaces/home.interface";

export function createFirstItem(firstItemDto: FirstItemDto) {
  return fetcher(v1("first"))("POST")(firstItemDto);
}
