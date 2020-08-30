import { ROLE_REPOSITORY_INTERFACE } from "~/module/permission/constants/constants";
import { Inject } from "@nestjs/common";

export function InjectRoleRepository(): (target: object, key: string | symbol, index?: number) => void {
    return Inject(ROLE_REPOSITORY_INTERFACE);
}
