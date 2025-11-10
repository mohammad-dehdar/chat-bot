export type RoleId = string | number;

export type HomeLink = {
  title: string;
  href: string;
  role: RoleId[];
  // image?: StaticImport | string; // add later if needed
};

export const HOME_LINKS: HomeLink[] = [
  {
    title: "مصاحبه",
    href: "/interview",
    role: [1503128706044, 1560753087739, 1560575981397, 1689668305461],
  },
  {
    title: "QEEG",
    href: "/qeeg",
    role: [
      1503128706044, 1560753087739, 1560575981397, 1689668305461, 1502629700472,
    ],
  },
  {
    title: "QEEG Upload",
    href: "/qeeg-upload",
    role: [1503128706044, 1640415430676, 1560575981397],
  },
  {
    title: "جدول نتایج",
    href: "/results-tables",
    role: [
      1503128706044, 1560753087739, 1560575981397, 1689668305461, 1502629700472,
    ],
  },
  {
    title: "کارنامه جامع روانشناختی",
    href: "/psychological-test-results",
    role: [1503128706044, 1560575981397, 1689668305461, 1502629700472],
  },
  {
    title: "آزمون‌‌های روانشناختی",
    href: "/psychological-tests",
    role: [
      1503128706044, 1560753087739, 1560575981397, 1689668305461, 1502629700472,
    ],
  },
  {
    title: "خود اظهاری",
    href: "/personal-declaration",
    role: [1503128706044, 1502629700472],
  },
  {
    title: "داشبورد گزارشات",
    href: "/reports-dashboard",
    role: [1503128706044],
  },
  {
    title: "چاپ بر اساس پذیرش",
    href: "/print-by-acceptance",
    role: [1503128706044],
  },
];

export function filterLinksByRole(
  roleCode: string | null,
  links: HomeLink[] = HOME_LINKS
): HomeLink[] {
  if (!roleCode) return [];
  // Accept both numeric and string role ids
  const roleAsNumber = Number(roleCode);
  return links.filter((l) => {
    if (l.role.includes(roleCode)) return true;
    if (!Number.isNaN(roleAsNumber)) {
      return l.role.some((r) => Number(r) === roleAsNumber);
    }
    return false;
  });
}
