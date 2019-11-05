import {createParamDecorator} from "@nestjs/common";


export const User = createParamDecorator((_data, [_root, _args, ctx, _info]) => ctx.req.user);
