export const TARIFF_ICON_KEYS = [
  "camera",
  "users",
  "sparkles",
  "star",
  "paw",
  "gift",
  "clock",
  "video",
  "palette",
] as const;

export type TariffIconKey = (typeof TARIFF_ICON_KEYS)[number];

export interface TariffPackView {
  id: string;
  groupId: string;
  title: string;
  price: string;
  features: string[];
  notes: string[];
  badge: string | null;
  icon: TariffIconKey;
  highlighted: boolean;
  active: boolean;
  sortOrder: number;
}

export interface TariffGroupView {
  id: string;
  name: string;
  active: boolean;
  sortOrder: number;
  packs: TariffPackView[];
}

export interface TariffOptionView {
  id: string;
  label: string;
  detail: string;
  price: string;
  icon: TariffIconKey;
  active: boolean;
  sortOrder: number;
}

export interface TariffCatalog {
  groups: TariffGroupView[];
  options: TariffOptionView[];
}
