import { Operation } from '../operation/operation.entity';

export default interface ICommand {
  operation: Operation;
  validate(): void;
  execute(): number | Promise<string> | Promise<string[]>;
}
