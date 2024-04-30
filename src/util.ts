declare const TAG_KEY: unique symbol;

export type BrandTag<T> = { readonly [TAG_KEY]: T };

/**
 * Ad-hoc specilization of a type, for extra type info that can't be expressed
 * in TypeScript type system.
 *
 * Params:
 * - `Tag`: tag name, should be string literal
 * - `Value`: type of the actual value
 * - `P`: ad-hoc param to differentiate generic branded types
 */
export type Brand<Tag, Value, P = null> =
    P extends null
        ? BrandTag<Tag> & Value
        : BrandTag<[Tag, P]> & Value;
