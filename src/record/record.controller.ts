import { autoInjectable, container, inject, injectable } from 'tsyringe';
import Controller from '../util/decorator/controller.decorator';
import { Get, Post } from '../util/decorator/handlers.decorator';
import AuthRequest from '../util/middleware/authRequest.interface';
import { Response } from 'express';
import authMiddleware from '../util/middleware/auth.middleware';
import OperationService from '../operation/operation.service';
import RecordService from './record.service';

@Controller('/record')
@autoInjectable()
export default class RecordController {
  constructor(private readonly operationService: OperationService, private readonly recordService: RecordService) {}

  // @Get('/list')
  // @authMiddleware()
  // async list(request: AuthRequest, response: Response) {
  //   const key = `records:${request.user.id}`;
  //   return response.send('test');
  // }

  @Post('/evaluate-arithmetic-expression')
  @authMiddleware()
  async evaluate(req: AuthRequest, res: Response) {
    try {
      const { expression } = req.body;
      const result = await this.recordService.evaluateExpressionMDAS(expression, req.user);
      return res.json({ result });
    } catch (error: any) {
      return res.send(error.message);
    }
  }

  @Post('/sqr-root')
  @authMiddleware()
  async squareRoot(req: AuthRequest, res: Response) {
    const { value } = req.body;

    try {
      const result = await this.recordService.solveSquareRoot(value, req.user);
      return res.send({ result });
    } catch (error: any) {
      return res.status(200).send(error.message);
    }
  }

  @Post('/random-string')
  @authMiddleware()
  async randomString(req: AuthRequest, res: Response) {
    const { amount, length, unique } = req.body;
    try {
      const result = await this.recordService.generateRandomString({ amount, length }, req.user);
      return res.json({ result });
    } catch (error: any) {
      return res.status(200).send(error.message);
    }
  }
}
