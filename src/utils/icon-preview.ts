import { IconPreviewButtonEnum } from "../components/icon-preview/components/buttons";

export interface LayoutModel {
  xs: number;
  sm: number;
  md: number;
}

export type IconLayoutType = Record<
  keyof typeof IconPreviewButtonEnum,
  LayoutModel
>;

export const iconLayout: IconLayoutType = {
  MAP: {
    xs: 8,
    sm: 6,
    md: 4,
  },
  LIST: {
    xs: 3,
    sm: 3,
    md: 1,
  },
};
