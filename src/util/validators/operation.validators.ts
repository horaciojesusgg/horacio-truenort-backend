import { z } from "zod";

const Add = z.object({
    values: z.number().array().nonempty(),
});

const Substract = z.object({
    values: z.number().array().nonempty(),
});

const Multiply = z.object({
    values: z.number().array().nonempty(),
});

const Divide = z.object({
    dividend: z.number().positive(),
    divisor: z.number().positive()
});

const SquareRoot = z.object({
    value: z.number().positive(),
});