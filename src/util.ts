declare const TAG_KEY: unique symbol;

export type BrandTag<T> = { readonly [TAG_KEY]: T };


// Allows ONLY string literals
type StringLiteral<T extends string> = string extends T ? never : T;

/**
 * Ad-hoc specilization of a type, for extra type info that can't be expressed
 * in TypeScript type system.
 *
 * Params:
 * - `Tag`: tag name, should be string literal
 * - `Value`: type of the actual value
 * - `P`: ad-hoc param to differentiate generic branded types
 */
export type Brand<Tag extends string, Value, P = null> =
    Tag extends StringLiteral<Tag>
        ? P extends null
            ? BrandTag<Tag> & Value
            : BrandTag<[Tag, P]> & Value
        : never;
