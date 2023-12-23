/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//Criação de um decorator para capturar o ID passado na requisição e converte-lo para numérico
export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id);
})