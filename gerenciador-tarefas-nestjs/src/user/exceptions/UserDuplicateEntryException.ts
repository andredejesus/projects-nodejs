import { InternalServerErrorException } from "@nestjs/common";

export class UserDuplicateEntryException extends InternalServerErrorException {
    
    constructor(email: string) {
        super(`Email: ${email} is already being used.`)
    }

}