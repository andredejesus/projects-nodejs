/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware implements NestMiddleware {

    

    use(req: Request, res: Response, next: NextFunction) {
        
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            console.log('ID inválido');
            throw new BadRequestException('ID inválido!')
        }

        next();
        
    }

}