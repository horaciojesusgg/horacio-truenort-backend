import { autoInjectable, container, inject, injectable } from 'tsyringe';
import Redis, { Redis as RedisClient } from "ioredis";
import Controller from "../util/decorator/controller.decorator";
import { Get, Post } from "../util/decorator/handlers.decorator";
import AuthRequest from "../util/middleware/authRequest.interface";
import { Response } from 'express';
import AddCommandHandler from '../record/commandHandler/addCommand.handler';
import AddCommand from '../record/command/add.command';


@Controller('/record')
@autoInjectable()
export default class RecordController {
    
    private redis: RedisClient;

    constructor(private readonly addCommandHandler: AddCommandHandler) {
        this.redis = container.resolve("RedisClient");
    }

    @Get('/list')
    async list( request: Request, response: Response) {
        console.log(await this.redis.get('myvalue'));
        
        return  response.send('test')
    }

    @Post('/add')
    async add(req: AuthRequest, res: Response) {
        const payload = req.body.values;
        const addCommand = new AddCommand(payload);
        this.addCommandHandler.handle(addCommand)
        return res.send('Hello response!');
    }

    @Post('/substract')
    async substract(req: AuthRequest, res: Response) {
        return res.send('Hello response!');
    }

    @Post('/divide')
    async divide(req: AuthRequest, res: Response) {
        return res.send('Hello response!');
    }

    @Post('/multiply')
    async multiply(req: AuthRequest, res: Response) {
        return res.send('Hello response!');
    }

    @Post('/sqr-root')
    async squareRoot(req: AuthRequest, res: Response) {
        return res.send('Hello response!');
    }


    @Post('/random')
    async randomString(req: AuthRequest, res: Response) {
        return res.send('Hello response!');
    }


}