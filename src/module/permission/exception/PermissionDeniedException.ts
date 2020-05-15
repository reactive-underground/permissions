/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class AccessDeniedException
 */
export class PermissionDeniedException extends Error {
    constructor(
        private readonly reason: string = ""
    ) {
        super();
    }
}
