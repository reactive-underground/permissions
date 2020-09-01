import { PERMISSION_REPOSITORY_INTERFACE } from "../constants/constants";
import { Inject } from "@nestjs/common";

export function InjectPermissionRepository(): (target: object, key: string | symbol, index?: number) => void {
    return Inject(PERMISSION_REPOSITORY_INTERFACE);
}
