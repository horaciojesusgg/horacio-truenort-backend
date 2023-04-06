import Controller from '../../util/decorator/controller.decorator';
import { Get, Post } from '../../util/decorator/handlers.decorator';
import AuthRequest from '../../util/middleware/authRequest.interface';
import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import OperationService from '../operation.service';
import authMiddleware from '../../util/middleware/auth.middleware';

@Controller('/v1/operation')
@autoInjectable()
export default class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get('/list')
  async list(req: AuthRequest, res: Response) {
    return res.send('Hello response!');
  }

  @Post('/calculate-cost-arithmetic')
  @authMiddleware()
  async calculateOperationCost(req: AuthRequest, res: Response) {
    const { expression } = req.body;
    const cost = await this.operationService.calculateArithmeticalOperationCost(expression);
    return res.json({ cost });
  }
}
