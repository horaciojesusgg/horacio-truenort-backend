import { Operation } from "../Operation";
import { User } from "../User";

export default class RecordDTO {
  userId: string;
  operationId: string;
  amount: number;
  user_balance: number;
  operation_response: string;
}
