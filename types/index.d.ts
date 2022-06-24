export interface Options {
  id?: string[];
}

export type IconfontType = {
  id: string;
  name: string;
  font_family: string;
  css_prefix_text: string;
  description: string;
  glyphs: IconfontGlyphsType[];
};

export type IconfontGlyphsType = {
  icon_id: string;
  name: string;
  font_class: string;
  unicode: string;
  unicode_decimal: number;
};
