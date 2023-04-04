import Controller from '../util/decorator/controller.decorator';
import { Get } from '../util/decorator/handlers.decorator';
import AuthRequest from '../util/middleware/authRequest.interface';
import { Response } from 'express';
import { autoInjectable } from 'tsyringe';

@Controller('/operation')
@autoInjectable()
export default class OperationController {
  @Get('/list')
  async list(req: AuthRequest, res: Response) {
    return res.send('Hello response!');
  }
}
