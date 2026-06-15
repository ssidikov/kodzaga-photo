"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeEuro,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Gift,
  PawPrint,
  Palette,
  Plus,
  Save,
  Sparkles,
  Star,
  Users,
  Video,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { TariffCatalog, TariffIconKey, TariffOptionView, TariffPackView } from "@/lib/tariff-types";
import { TARIFF_ICON_KEYS } from "@/lib/tariff-types";
import {
  createTariffGroup,
  createTariffOption,
  createTariffPack,
  updateTariffGroup,
  updateTariffOption,
  updateTariffPack,
} from "./actions";

type SavedNotice = {
  id: number;
  message: string;
};

type NotifySaved = (message: string) => void;

const ICONS: Record<TariffIconKey, typeof Camera> = {
  camera: Camera,
  users: Users,
  sparkles: Sparkles,
  star: Star,
  paw: PawPrint,
  gift: Gift,
  clock: Clock,
  video: Video,
  palette: Palette,
};

const ICON_LABELS: Record<TariffIconKey, string> = {
  camera: "Appareil",
  users: "Groupe",
  sparkles: "Etincelle",
  star: "Etoile",
  paw: "Patte",
  gift: "Cadeau",
  clock: "Horloge",
  video: "Video",
  palette: "Beaute",
};

function linesToText(lines: string[]) {
  return lines.join("\n");
}

function textToLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      {children}
    </div>
  );
}

function CheckField({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-10 items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-[#f0ece3]/70">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-[#06080f] accent-[#C9A84C]"
      />
      {label}
    </label>
  );
}

function IconSelect({
  value,
  onChange,
  name = "icon",
}: {
  value: TariffIconKey;
  onChange: (value: TariffIconKey) => void;
  name?: string;
}) {
  return (
    <Select
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value as TariffIconKey)}
    >
      {TARIFF_ICON_KEYS.map((icon) => (
        <option key={icon} value={icon}>
          {ICON_LABELS[icon]}
        </option>
      ))}
    </Select>
  );
}

function SavedToast({
  notice,
  onDismiss,
}: {
  notice: SavedNotice | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(onDismiss, 2800);
    return () => window.clearTimeout(timer);
  }, [notice, onDismiss]);

  if (!notice) return null;

  return (
    <div
      key={notice.id}
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-lg border border-emerald-500/25 bg-[#0a0d13] px-4 py-3 text-sm text-[#f0ece3] shadow-lg shadow-black/20 md:left-auto md:w-[360px]"
    >
      <span className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
        {notice.message}
      </span>
      <button
        type="button"
        onClick={onDismiss}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#f0ece3]/45 transition-colors hover:bg-white/5 hover:text-[#f0ece3]"
        aria-label="Fermer la notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function PackPreview({
  title,
  price,
  features,
  notes,
  badge,
  icon,
  highlighted,
}: {
  title: string;
  price: string;
  features: string[];
  notes: string[];
  badge: string;
  icon: TariffIconKey;
  highlighted: boolean;
}) {
  const Icon = ICONS[icon] ?? Camera;

  return (
    <div className={`relative rounded-lg border p-5 ${highlighted ? "border-[#C9A84C]/35 bg-[#C9A84C]/[0.04]" : "border-white/10 bg-white/[0.03]"}`}>
      {highlighted && badge && (
        <Badge className="mb-4 text-[10px] uppercase tracking-[0.12em]">{badge}</Badge>
      )}
      <Icon className="mb-4 h-5 w-5 text-[#C9A84C]/70" strokeWidth={1.5} />
      <h3 className="text-base font-semibold text-[#f0ece3]">{title || "Nom du pack"}</h3>
      <p className="mt-2 text-2xl font-semibold text-[#C9A84C]">{price || "Prix"}</p>
      <Separator className="my-4 bg-white/[0.06]" />
      <ul className="space-y-2">
        {[...features, ...notes].slice(0, 5).map((line, index) => (
          <li key={`${line}-${index}`} className="flex items-start gap-2 text-xs text-[#f0ece3]/55">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GroupForm({
  group,
  onSaved,
}: {
  group?: TariffCatalog["groups"][number];
  onSaved: NotifySaved;
}) {
  const isNew = !group;
  const [active, setActive] = useState(group?.active ?? true);
  const action = isNew ? createTariffGroup : updateTariffGroup;

  return (
    <form
      action={async (formData) => {
        await action(formData);
        onSaved(isNew ? "Groupe ajouté." : "Groupe sauvegardé.");
      }}
      className="grid gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 md:grid-cols-[1fr_110px_130px_auto] md:items-end"
    >
      {group && <input type="hidden" name="id" value={group.id} />}
      <Field label="Groupe">
        <Input name="name" defaultValue={group?.name ?? ""} placeholder="Solo" required />
      </Field>
      <Field label="Ordre">
        <Input name="sortOrder" type="number" defaultValue={group?.sortOrder ?? 40} min={0} max={1000} />
      </Field>
      <CheckField name="active" label="Visible" checked={active} onChange={setActive} />
      <Button type="submit" className="md:mb-0">
        {isNew ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {isNew ? "Ajouter" : "Sauver"}
      </Button>
    </form>
  );
}

function PackForm({
  pack,
  groups,
  fallbackGroupId,
  onSaved,
}: {
  pack?: TariffPackView;
  groups: TariffCatalog["groups"];
  fallbackGroupId: string;
  onSaved: NotifySaved;
}) {
  const isNew = !pack;
  const action = isNew ? createTariffPack : updateTariffPack;
  const [groupId, setGroupId] = useState(pack?.groupId ?? fallbackGroupId);
  const [title, setTitle] = useState(pack?.title ?? "");
  const [price, setPrice] = useState(pack?.price ?? "");
  const [features, setFeatures] = useState(linesToText(pack?.features ?? []));
  const [notes, setNotes] = useState(linesToText(pack?.notes ?? []));
  const [badge, setBadge] = useState(pack?.badge ?? "");
  const [icon, setIcon] = useState<TariffIconKey>(pack?.icon ?? "camera");
  const [highlighted, setHighlighted] = useState(pack?.highlighted ?? false);
  const [active, setActive] = useState(pack?.active ?? true);
  const sortOrder = pack?.sortOrder ?? 40;

  return (
    <form
      action={async (formData) => {
        await action(formData);
        onSaved(isNew ? "Pack ajouté." : "Pack sauvegardé.");
      }}
      className="rounded-lg border border-white/[0.06] bg-[#0a0d13] p-4"
    >
      {pack && <input type="hidden" name="id" value={pack.id} />}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nom">
            <Input name="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Pack Premium" required />
          </Field>
          <Field label="Prix">
            <Input name="price" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="215 €" required />
          </Field>
          <Field label="Groupe">
            <Select name="groupId" value={groupId} onChange={(event) => setGroupId(event.target.value)}>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Icone">
            <IconSelect value={icon} onChange={setIcon} />
          </Field>
          <Field label="Inclus" className="md:col-span-2">
            <Textarea
              name="features"
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder={"1h de shooting\n15 photos retouchees"}
              rows={4}
            />
          </Field>
          <Field label="Notes" className="md:col-span-2">
            <Textarea
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Ideal pour les reseaux"
              rows={3}
            />
          </Field>
          <Field label="Badge">
            <Input name="badge" value={badge} onChange={(event) => setBadge(event.target.value)} placeholder="Le plus demande" />
          </Field>
          <Field label="Ordre">
            <Input name="sortOrder" type="number" defaultValue={sortOrder} min={0} max={1000} />
          </Field>
          <CheckField name="highlighted" label="Mettre en avant" checked={highlighted} onChange={setHighlighted} />
          <CheckField name="active" label="Visible sur le site" checked={active} onChange={setActive} />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#f0ece3]/35">Apercu</p>
          <PackPreview
            title={title}
            price={price}
            features={textToLines(features)}
            notes={textToLines(notes)}
            badge={badge}
            icon={icon}
            highlighted={highlighted}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit">
          {isNew ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {isNew ? "Ajouter le pack" : "Sauver le pack"}
        </Button>
      </div>
    </form>
  );
}

function OptionForm({ option, onSaved }: { option?: TariffOptionView; onSaved: NotifySaved }) {
  const isNew = !option;
  const action = isNew ? createTariffOption : updateTariffOption;
  const [label, setLabel] = useState(option?.label ?? "");
  const [detail, setDetail] = useState(option?.detail ?? "");
  const [price, setPrice] = useState(option?.price ?? "");
  const [icon, setIcon] = useState<TariffIconKey>(option?.icon ?? "clock");
  const [active, setActive] = useState(option?.active ?? true);

  return (
    <form
      action={async (formData) => {
        await action(formData);
        onSaved(isNew ? "Option ajoutée." : "Option sauvegardée.");
      }}
      className="grid gap-3 rounded-lg border border-white/[0.06] bg-[#0a0d13] p-4 lg:grid-cols-[1.1fr_1.4fr_120px_140px_150px_auto] lg:items-end"
    >
      {option && <input type="hidden" name="id" value={option.id} />}
      <Field label="Option">
        <Input name="label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Video" required />
      </Field>
      <Field label="Detail">
        <Input name="detail" value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="pour les packs sans video" />
      </Field>
      <Field label="Prix">
        <Input name="price" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="75 €" required />
      </Field>
      <Field label="Icone">
        <IconSelect value={icon} onChange={setIcon} />
      </Field>
      <div className="grid grid-cols-[1fr_82px] gap-3">
        <CheckField name="active" label="Visible" checked={active} onChange={setActive} />
        <Field label="Ordre">
          <Input name="sortOrder" type="number" defaultValue={option?.sortOrder ?? 40} min={0} max={1000} />
        </Field>
      </div>
      <Button type="submit">
        {isNew ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {isNew ? "Ajouter" : "Sauver"}
      </Button>
    </form>
  );
}

export default function TariffManager({ catalog }: { catalog: TariffCatalog }) {
  const router = useRouter();
  const [notice, setNotice] = useState<SavedNotice | null>(null);
  const allPacks = useMemo(() => catalog.groups.flatMap((group) => group.packs.map((pack) => ({ ...pack, groupName: group.name }))), [catalog.groups]);
  const activePacks = allPacks.filter((pack) => pack.active).length;
  const highlightedPacks = allPacks.filter((pack) => pack.highlighted).length;
  const fallbackGroupId = catalog.groups[0]?.id ?? "";
  const onSaved: NotifySaved = (message) => {
    setNotice({ id: Date.now(), message });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <SavedToast notice={notice} onDismiss={() => setNotice(null)} />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Packs visibles", value: activePacks },
          { label: "Groupes", value: catalog.groups.length },
          { label: "Mis en avant", value: highlightedPacks },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl text-[#C9A84C]">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <BadgeEuro className="h-4 w-4 text-[#C9A84C]" />
                Vue rapide
              </CardTitle>
              <CardDescription>Packs affiches sur la page tarifs et dans le formulaire de reservation.</CardDescription>
            </div>
            <Badge variant="outline">{allPacks.length} packs</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pack</TableHead>
                <TableHead>Groupe</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Etat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPacks.map((pack) => (
                <TableRow key={pack.id}>
                  <TableCell className="font-medium text-[#f0ece3]">{pack.title}</TableCell>
                  <TableCell className="text-[#f0ece3]/55">{pack.groupName}</TableCell>
                  <TableCell className="text-[#C9A84C]">{pack.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={pack.active ? "default" : "outline"}>{pack.active ? "Visible" : "Masque"}</Badge>
                      {pack.highlighted && <Badge variant="secondary">Mis en avant</Badge>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Groupes</CardTitle>
          <CardDescription>Controle les blocs Solo, Groupe et autres categories.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {catalog.groups.map((group) => (
            <GroupForm key={group.id} group={group} onSaved={onSaved} />
          ))}
          <GroupForm onSaved={onSaved} />
        </CardContent>
      </Card>

      <div className="space-y-5">
        {catalog.groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.packs.length} pack{group.packs.length > 1 ? "s" : ""}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.packs.map((pack) => (
                <PackForm key={pack.id} pack={pack} groups={catalog.groups} fallbackGroupId={fallbackGroupId} onSaved={onSaved} />
              ))}
              {fallbackGroupId && <PackForm groups={catalog.groups} fallbackGroupId={group.id} onSaved={onSaved} />}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>Supplements proposes dans la section tarifs et le formulaire de reservation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {catalog.options.map((option) => (
            <OptionForm key={option.id} option={option} onSaved={onSaved} />
          ))}
          <OptionForm onSaved={onSaved} />
        </CardContent>
      </Card>
    </div>
  );
}
