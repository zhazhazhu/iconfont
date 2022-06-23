const ICONFONT_API = "https://at.alicdn.com/t/";

export enum SuffixEnum {
  js = "js",
  css = "css",
  json = "json",
  woff2 = "woff2",
}

export type IconfontSuffixType = keyof typeof SuffixEnum;

export function useIconfontApi(id?: string, suffix?: IconfontSuffixType) {
  if (!id) return "";
  return `${ICONFONT_API}${id}.${suffix}`;
}

export function useIconfontToJsApi(ids?: string[]) {
  return ids?.map((id) => useIconfontApi(id, SuffixEnum.js));
}

export function useIconfontToJsonApi(ids?: string[]) {
  return ids?.map((id) => useIconfontApi(id, SuffixEnum.json));
}
