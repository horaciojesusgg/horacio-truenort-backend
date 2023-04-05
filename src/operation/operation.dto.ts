import { OperationsEnum } from './constants/operations.enum';

export default class OperationDTO {
  type: OperationsEnum;
  cost: number;
}
