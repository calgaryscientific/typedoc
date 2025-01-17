import { Type } from "./abstract";
/**
 * Represents an intersection type.
 *
 * ~~~
 * let value: A & B;
 * ~~~
 */
export declare class IntersectionType extends Type {
    /**
     * The types this union consists of.
     */
    types: Type[];
    /**
     * The type name identifier.
     */
    readonly type: string;
    /**
     * Create a new TupleType instance.
     *
     * @param types  The types this union consists of.
     */
    constructor(types: Type[]);
    /**
     * Clone this type.
     *
     * @return A clone of this type.
     */
    clone(): Type;
    /**
     * Test whether this type equals the given type.
     *
     * @param type  The type that should be checked for equality.
     * @returns TRUE if the given type equals this type, FALSE otherwise.
     */
    equals(type: IntersectionType): boolean;
    /**
     * Return a string representation of this type.
     */
    toString(): string;
}
