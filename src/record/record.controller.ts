import { autoInjectable, container, inject, injectable } from 'tsyringe';
import Redis, { Redis as RedisClient } from "ioredis";
import Controller from "../util/decorator/controller.decorator";
import { Get, Post } from "../util/decorator/handlers.decorator";
import AuthRequest from "../util/middleware/authRequest.interface";
import { Response } from 'express';
import AddCommand from './command/add.command';
import authMiddleware from '../util/middleware/auth.middleware';
import OperationService from '../operation/operation.service';
import { OperationsEnum } from '../util/constants/operations.enum';
import RecordCommandHandler from './recordCommand.handler';
import SubstractCommand from './command/substract.command';
import MultiplyCommand from './command/multiply.command';
import DivideCommand from './command/divide.command';
import SquareRootCommand from './command/squareRoot.command';
import RandomStringCommand from './command/randomString.command';


@Controller('/record')
@autoInjectable()
export default class RecordController {
    

    constructor(private readonly operationService: OperationService ,private readonly commandHandler: RecordCommandHandler) {
    }

    @Get('/list')
    @authMiddleware()
    async list( request: Request, response: Response) {
        return  response.send('test')
    }

    @Post('/add')
    @authMiddleware()
    async add(req: AuthRequest, res: Response) {
        const payload = req.body.values;
        const operation = await this.operationService.getByType(OperationsEnum.ADD)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new AddCommand(payload, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }

    @Post('/substract')
    @authMiddleware()
    async substract(req: AuthRequest, res: Response) {
        const payload = req.body.values;
        const operation = await this.operationService.getByType(OperationsEnum.SUBSTRACT)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new SubstractCommand(payload, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }

    @Post('/divide')
    @authMiddleware()
    async divide(req: AuthRequest, res: Response) {
        const {dividend, divisor} = req.body;
        const operation = await this.operationService.getByType(OperationsEnum.DIVIDE)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new DivideCommand(dividend, divisor, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }

    @Post('/multiply')
    @authMiddleware()
    async multiply(req: AuthRequest, res: Response) {
        const payload = req.body.values;
        const operation = await this.operationService.getByType(OperationsEnum.MULTIPLY)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new MultiplyCommand(payload, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }

    @Post('/sqr-root')
    @authMiddleware()
    async squareRoot(req: AuthRequest, res: Response) {
        const payload = req.body.values;
        const operation = await this.operationService.getByType(OperationsEnum.SQUARE_ROOT)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new SquareRootCommand(payload, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }


    @Post('/random')
    @authMiddleware()
    async randomString(req: AuthRequest, res: Response) {
        const {amount, length, unique} = req.body;
        const operation = await this.operationService.getByType(OperationsEnum.RANDOM_STRING)
        if (!operation) {
            return res.send('Sorry! This operation is not implemented yet.');
        }
        const addCommand = new RandomStringCommand({amount, length, unique}, operation);
        await this.commandHandler.handle(addCommand)
        return res.send('Hello response!');
    }


}