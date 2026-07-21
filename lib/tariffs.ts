import { getDb } from "@/lib/db";
import { tariffGroups, tariffOptions, tariffPacks } from "@/lib/db/schema";
import {
  TARIFF_ICON_KEYS,
  type TariffCatalog,
  type TariffGroupView,
  type TariffIconKey,
  type TariffOptionView,
  type TariffPackView,
} from "@/lib/tariff-types";
import { asc, eq, inArray } from "drizzle-orm";

export type {
  TariffIconKey,
  TariffPackView,
  TariffGroupView,
  TariffOptionView,
  TariffCatalog,
} from "@/lib/tariff-types";
export { TARIFF_ICON_KEYS } from "@/lib/tariff-types";

export const DEFAULT_TARIFF_GROUPS: Omit<TariffGroupView, "packs">[] = [
  { id: "solo", name: "Solo", active: true, sortOrder: 10 },
  { id: "groupe", name: "Groupe", active: true, sortOrder: 20 },
  { id: "autres", name: "Autres packs", active: true, sortOrder: 30 },
];

export const DEFAULT_TARIFF_PACKS: TariffPackView[] = [
  {
    id: "pack-essentiel",
    groupId: "solo",
    title: "Pack Essentiel",
    price: "175 €",
    features: ["1h de shooting", "15 photos retouchées"],
    notes: ["Idéal pour les réseaux"],
    badge: null,
    icon: "camera",
    highlighted: false,
    active: true,
    sortOrder: 10,
  },
  {
    id: "pack-premium",
    groupId: "solo",
    title: "Pack Premium",
    price: "215 €",
    features: ["2h de shooting", "30 photos retouchées", "Plusieurs tenues", "Plusieurs lieux"],
    notes: ["GO pour un city tour !"],
    badge: "Le plus demandé",
    icon: "camera",
    highlighted: true,
    active: true,
    sortOrder: 20,
  },
  {
    id: "pack-signature",
    groupId: "solo",
    title: "Pack Signature",
    price: "275 €",
    features: ["3h de shooting", "50 photos retouchées", "Vidéos", "MUA"],
    notes: ["Comme une Star !"],
    badge: null,
    icon: "star",
    highlighted: false,
    active: true,
    sortOrder: 30,
  },
  {
    id: "pack-duo",
    groupId: "groupe",
    title: "Pack DUO",
    price: "255 €",
    features: ["2h de shooting", "Photos individuelles et en duo"],
    notes: ["Idéal couple / amis"],
    badge: null,
    icon: "users",
    highlighted: false,
    active: true,
    sortOrder: 10,
  },
  {
    id: "pack-trio",
    groupId: "groupe",
    title: "Pack TRIO",
    price: "295 €",
    features: ["3h de shooting", "Photos / Vidéos"],
    notes: ["Boys Band & Spice Girls !"],
    badge: "Le plus demandé",
    icon: "users",
    highlighted: true,
    active: true,
    sortOrder: 20,
  },
  {
    id: "pack-famille",
    groupId: "groupe",
    title: "Pack Famille",
    price: "315 €",
    features: ["Photos / Vidéos", "Animaux de compagnie bienvenus"],
    notes: ["En mode Avengers !"],
    badge: null,
    icon: "users",
    highlighted: false,
    active: true,
    sortOrder: 30,
  },
  {
    id: "pack-animaux",
    groupId: "autres",
    title: "Pack Animaux",
    price: "155 €",
    features: [
      "1h de shooting",
      "Plusieurs animaux possibles (3 max)",
      "Photos avec le propriétaire possibles",
    ],
    notes: ["Chiens / Chats / Chevaux sous les lumières !"],
    badge: null,
    icon: "paw",
    highlighted: false,
    active: true,
    sortOrder: 10,
  },
  {
    id: "pack-personnalisable",
    groupId: "autres",
    title: "Pack Personnalisable",
    price: "Sur devis",
    features: ["Projet artistique spécifique / Collaboration", "Durée et contenu adaptés", "Studio équipé"],
    notes: ["Un travail d'équipe !"],
    badge: null,
    icon: "sparkles",
    highlighted: false,
    active: true,
    sortOrder: 20,
  },
  {
    id: "bon-cadeau",
    groupId: "autres",
    title: "Bon Cadeau",
    price: "Pack choisi",
    features: ["Amis / Famille", "Choisis le Pack de ton choix à offrir à tes proches !"],
    notes: ["Idéal pour les fêtes !"],
    badge: null,
    icon: "gift",
    highlighted: false,
    active: true,
    sortOrder: 30,
  },
];

export const DEFAULT_TARIFF_OPTIONS: TariffOptionView[] = [
  {
    id: "express",
    label: "Livraison Express en 24h",
    detail: "au lieu de 3 jours ouvrés",
    price: "20 €",
    icon: "clock",
    active: true,
    sortOrder: 10,
  },
  {
    id: "video",
    label: "Vidéo",
    detail: "pour les packs sans vidéo incluse",
    price: "75 €",
    icon: "video",
    active: true,
    sortOrder: 20,
  },
  {
    id: "mua",
    label: "MUA ou Coiffeuse",
    detail: "2h de prestation beauté",
    price: "75 €",
    icon: "palette",
    active: true,
    sortOrder: 30,
  },
];

export function getDefaultTariffCatalog(): TariffCatalog {
  return {
    groups: DEFAULT_TARIFF_GROUPS.map((group) => ({
      ...group,
      packs: DEFAULT_TARIFF_PACKS.filter((pack) => pack.groupId === group.id),
    })),
    options: DEFAULT_TARIFF_OPTIONS,
  };
}

function toIconKey(value: string | null | undefined): TariffIconKey {
  return TARIFF_ICON_KEYS.includes(value as TariffIconKey) ? (value as TariffIconKey) : "camera";
}

export async function getTariffCatalog({ includeInactive = false } = {}): Promise<TariffCatalog> {
  try {
    const db = getDb();
    const groups = await db
      .select()
      .from(tariffGroups)
      .orderBy(asc(tariffGroups.sortOrder), asc(tariffGroups.name));

    if (groups.length === 0) {
      return getDefaultTariffCatalog();
    }

    const groupIds = groups.map((group) => group.id);
    const packs =
      groupIds.length > 0
        ? await db
            .select()
            .from(tariffPacks)
            .where(inArray(tariffPacks.groupId, groupIds))
            .orderBy(asc(tariffPacks.sortOrder), asc(tariffPacks.title))
        : [];
    const options = await db
      .select()
      .from(tariffOptions)
      .orderBy(asc(tariffOptions.sortOrder), asc(tariffOptions.label));

    const visibleGroups = includeInactive ? groups : groups.filter((group) => group.active);
    const visiblePacks = includeInactive ? packs : packs.filter((pack) => pack.active);
    const visibleOptions = includeInactive ? options : options.filter((option) => option.active);

    return {
      groups: visibleGroups.map((group) => ({
        id: group.id,
        name: group.name,
        active: group.active,
        sortOrder: group.sortOrder,
        packs: visiblePacks
          .filter((pack) => pack.groupId === group.id)
          .map((pack) => ({
            id: pack.id,
            groupId: pack.groupId,
            title: pack.title,
            price: pack.price,
            features: pack.features ?? [],
            notes: pack.notes ?? [],
            badge: pack.badge,
            icon: toIconKey(pack.icon),
            highlighted: pack.highlighted,
            active: pack.active,
            sortOrder: pack.sortOrder,
          })),
      })),
      options: visibleOptions.map((option) => ({
        id: option.id,
        label: option.label,
        detail: option.detail,
        price: option.price,
        icon: toIconKey(option.icon),
        active: option.active,
        sortOrder: option.sortOrder,
      })),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Tariff catalog fallback:", error);
    }
    return getDefaultTariffCatalog();
  }
}

export async function validatePrestationName(name: string) {
  if (name === "Vidéos Publicitaires") return true;
  const catalog = await getTariffCatalog();
  return catalog.groups.some((group) => group.packs.some((pack) => pack.title === name));
}

export async function getOptionLabelsFromForm(formData: FormData) {
  const catalog = await getTariffCatalog();
  return catalog.options
    .filter((option) => formData.get(`option-${option.id}`) === "on")
    .map((option) => `${option.label} (+${option.price})`);
}

export async function seedDefaultTariffs() {
  const db = getDb();
  const existingGroups = await db.select({ id: tariffGroups.id }).from(tariffGroups).limit(1);
  if (existingGroups.length > 0) return false;

  const insertedGroups = await db
    .insert(tariffGroups)
    .values(DEFAULT_TARIFF_GROUPS.map(({ name, sortOrder, active }) => ({ name, sortOrder, active })))
    .returning();
  const groupByName = new Map(insertedGroups.map((group) => [group.name, group.id]));
  const defaultGroupById = new Map(DEFAULT_TARIFF_GROUPS.map((group) => [group.id, group.name]));

  await db.insert(tariffPacks).values(
    DEFAULT_TARIFF_PACKS.map((pack) => ({
      groupId: groupByName.get(defaultGroupById.get(pack.groupId) ?? "")!,
      title: pack.title,
      price: pack.price,
      features: pack.features,
      notes: pack.notes,
      badge: pack.badge,
      icon: pack.icon,
      highlighted: pack.highlighted,
      active: pack.active,
      sortOrder: pack.sortOrder,
    }))
  );

  await db.insert(tariffOptions).values(
    DEFAULT_TARIFF_OPTIONS.map(({ label, detail, price, icon, active, sortOrder }) => ({
      label,
      detail,
      price,
      icon,
      active,
      sortOrder,
    }))
  );

  return true;
}

export async function groupExists(groupId: string) {
  const db = getDb();
  const [group] = await db.select({ id: tariffGroups.id }).from(tariffGroups).where(eq(tariffGroups.id, groupId));
  return Boolean(group);
}
