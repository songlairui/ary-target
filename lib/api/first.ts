import { fetcher, v1 } from "./common";

export enum ItemType {
  SUBPAGE = "SUBPAGE", // NextLink 跳转
  HREF = "HREF", // 外部链接，a 跳转
  NORMAL = "NORMAL", // 默认，进入详情页
  _M = "_M" // 其他功用
}

export interface FirstItemDto {
  title: string;
  desc: string;
  links: string;
  hidden: boolean;
  icon: string;
  itemType: ItemType;
}

export function createFirstItem(firstItemDto: FirstItemDto) {
  return fetcher(v1("first"))("POST")(firstItemDto);
}
