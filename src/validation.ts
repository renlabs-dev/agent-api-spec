import { z } from "zod";
import { assert, Extends } from "tsafe";

import type { Address, Timestamp } from "./module.js";
import { is_identifier, is_ss58_address } from "./module.js";

// ==== Identifier ====

export const identifier_schema = z
  .string()
  .refine(is_identifier, "Invalid identifier");

// ==== Timestamp ISO 8601 ====

export const timestamp_schema = z
  .string()
  .datetime({ offset: true })
  .transform((x) => x as Timestamp);

/** 
 * Defines Timestamp in function of zod schema validator
 * 
 * https://zod.dev/?id=datetimes
 * 
 * Valid:
 * - 2020-01-01T00:00:00Z
 * - 2020-01-01T00:00:00+02:00
 * - 2020-01-01T00:00:00.123+02:00
 * - 2020-01-01T00:00:00.123+0200
 */

export const is_timestamp = (x: string): x is Timestamp =>
    timestamp_schema.safeParse(x).success;

// ==== Address ====

export const address_schema = z.object({
  type: z.enum(["sr25519", "ed25519", "ecdsa"]),
  value: z.string().refine(is_ss58_address, "Invalid SS58 address"),
});

type address_schema_t = z.infer<typeof address_schema>;
assert<Extends<address_schema_t, Address>>();
