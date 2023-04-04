import { Operation } from "../operation/operation.entity";
import { User } from "../user/user.entity";

export default class RecordDTO {
  userId: string;
  operationId: string;
  amount: number;
  user_balance: number;
  operation_response: string;
}
