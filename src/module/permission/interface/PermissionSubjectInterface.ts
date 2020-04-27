/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface PermissionSubjectInterface
 */
import { Role } from "../entity/Role";

export interface PermissionSubjectInterface {
    getRoles(): Role[];
    isRoot(): boolean;
}
