import { autoInjectable } from 'tsyringe';
import Controller from '../../util/decorator/controller.decorator';
import { Delete, Get, Post } from '../../util/decorator/handlers.decorator';
import AuthRequest from '../../util/middleware/authRequest.interface';
import { Response } from 'express';
import authMiddleware from '../../util/middleware/auth.middleware';
import RecordService from '../record.service';
import GetAllRecordsQuery from '../query/getAllRecords.query';

@Controller('/v1/record')
@autoInjectable()
export default class RecordController {
  constructor(private readonly recordService: RecordService, private readonly getAllRecordsQuery: GetAllRecordsQuery) {}

  @Get('/list')
  @authMiddleware()
  async list(request: AuthRequest, response: Response) {
    const { page = 1, limit = 50 } = request.query as any;
    const result = await this.getAllRecordsQuery.execute(request.user, { page, limit });
    return response.json({ result });
  }

  @Post('/evaluate-arithmetic-expression')
  @authMiddleware()
  async evaluate(req: AuthRequest, res: Response) {
    try {
      const expression = req.body.expression as string;
      console.log(expression);
      const result = await this.recordService.evaluateExpressionMDAS(expression.trim(), req.user);
      console.log(result);
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
    const { amount, length } = req.body;
    try {
      const result = await this.recordService.generateRandomString({ amount, length }, req.user);
      return res.json({ result });
    } catch (error: any) {
      return res.status(200).send(error.message);
    }
  }

  @Delete('/')
  @authMiddleware()
  async deleteRecord(req: AuthRequest, res: Response) {
    try {
      const { recordId } = req.body;
      const result = await this.recordService.deleteRecord(recordId, req.user);
      return res.json({ result });
    } catch (error: any) {
      return res.status(200).send(error.message);
    }
  }
}
