import { fetcher, v1 } from "./common";

export interface FirstItemDto {
  title: string;
  desc: string;
  links: string;
  hidden: boolean;
  icon: string;
}

export function createFirstItem(firstItemDto: FirstItemDto) {
  return fetcher(v1("first"))("POST")(firstItemDto);
}
