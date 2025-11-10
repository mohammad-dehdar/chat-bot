import { useMemo } from "react";
import { useRole } from "@/features/auth/RoleContext";
import { HOME_LINKS, filterLinksByRole, type HomeLink } from "./roles";

export function useHomeLinks(customLinks?: HomeLink[]) {
  const { roleCode, loading } = useRole();
  const links = useMemo(
    () => filterLinksByRole(roleCode, customLinks ?? HOME_LINKS),
    [roleCode, customLinks]
  );
  return { links, loading, roleCode };
}
