import { useIconfontToJsApi } from "../hooks/use-iconfont-api/index";

export type LinkAttributes = {
  src?: string;
  href?: string;
  rel?: string;
  as?: string;
  type?: string;
  crossorigin?: string;
};

export function createElement(type: string, arg: LinkAttributes): HTMLElement {
  const link = document.createElement(type);

  for (const key in arg) {
    if (arg[key]) link.setAttribute(key, arg[key]);
  }

  return link;
}

export function createScript(ids: string[]) {
  useIconfontToJsApi(ids)?.forEach((item) => {
    if (!item) return console.error("script src attribute illegal!");

    const script = createElement("script", { src: item });

    document.head.appendChild(script);
  });
}

export function setIconfontIdToWindow(id?: string[]) {
  window.__ICONFONT_ID__ = id || [];
}

export function useIconfontId() {
  return window.__ICONFONT_ID__;
}
