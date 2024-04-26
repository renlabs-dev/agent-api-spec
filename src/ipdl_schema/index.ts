// import all from ./schema_schema
import type { Schema } from "./schema_schema.js";

// @ts-ignore
export { fromDSL } from "@ipld/schema/from-dsl.js";

declare function fromDSL(input: string): Schema;
