import { ROLE_REPOSITORY_INTERFACE } from "../constants/constants";
import { Inject } from "@nestjs/common";

export function InjectRoleRepository(): (target: object, key: string | symbol, index?: number) => void {
    return Inject(ROLE_REPOSITORY_INTERFACE);
}
