import AddCommand from "./add.command";
import SubstractCommand from "./substract.command";
import DivideCommand from "./divide.command";
import MultiplyCommand from "./multiply.command";
import SquareRootCommand from "./squareRoot.command";
import RandomStringCommand from "./randomString.command";

export const commands = {
    Add: AddCommand,
    Substract: SubstractCommand,
    Divide: DivideCommand,
    Multiply: MultiplyCommand,
    SquareRoot: SquareRootCommand,
    RandomStreing: RandomStringCommand
}