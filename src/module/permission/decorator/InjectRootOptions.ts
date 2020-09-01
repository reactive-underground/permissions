import { Inject } from "@nestjs/common";
import { ROOT_OPTIONS } from "../constants/constants";

export function InjectRootOptions(): (target: object, key: string | symbol, index?: number) => void {
    return Inject(ROOT_OPTIONS);
}
