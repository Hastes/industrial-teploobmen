import type { EquipmentKind } from "@/components/CTA/QuickRequestModal";

export const OPEN_QUICK_REQUEST_EVENT = "open-quick-request-modal";

export function openQuickRequestModal(kind: EquipmentKind) {
  window.dispatchEvent(
    new CustomEvent(OPEN_QUICK_REQUEST_EVENT, { detail: { kind } }),
  );
}

export function getEquipmentKindByCategoryId(
  categoryId: string,
): EquipmentKind {
  return categoryId === "nasosnye-stancii" ? "pump-station" : "heat-exchanger";
}
