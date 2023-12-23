/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

//Criação de um decorator para capturar o ID passado na requisição e converte-lo para numérico
export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
    
    const request = context.switchToHttp().getRequest();

    if (request.user) {

        if (filter) {

            return request.user[filter];

        } else {
            return request.user;
        }

        return request.user;
    } else {
        console.log('Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.')
        throw new NotFoundException('Usuário não encontrado no Request.')
    }
    

})