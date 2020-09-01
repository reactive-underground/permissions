import { Role } from "./Role";

export interface PermissionInterface {
    hasRole(role: Role): boolean;
    hasAccess(roles: Role[]): boolean;
    is(permission: string): boolean;
    getRoles(): Role[];
}
