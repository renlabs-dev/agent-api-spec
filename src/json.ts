export type JsonValue =
    | JsonPrimitive
    | JsonObject
    | JsonArray;

export type JsonPrimitive = string | number | boolean;

export interface JsonObject {
    [x: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> { }
