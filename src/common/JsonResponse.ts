import { Expose } from "class-transformer";

/**
 * @package common
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class JsonResponse
 */
export class JsonResponse<T = any> {

    @Expose() private readonly data: T;
    @Expose() private readonly status: boolean = true;
    @Expose() private readonly message: string = "result";

    constructor(data: T, status: boolean = true, message: string = "result") {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}
