/** 
 * There are two levels of interface definition:
 * 1. Abstract Module interface (done in this file)
 * 2. Specific module instance methods schema (done in specific module instance schema)
 */

import { Brand } from "./util.js";
import { type JsonValue } from "./json.js";


// ==== JSON ====

type CanonJson<T> = Brand<"CanonJson", JsonValue,T>;

function to_canon_json<T>(x: T): CanonJson<T> {
    // TODO
    return x as CanonJson<T>;
}


// ==== Address ====

export type SS58Address = Brand<"SS58Address", string>;
export type PublicKey = Brand<"PublicKey", string>;

export const parse_ss58 = (x: string): [number, PublicKey] | null => {
    // TODO: check with polkadotjs
    return [42, "0x1234" as PublicKey];
}

export const is_ss58_address = (x: any): x is SS58Address =>
    parse_ss58(x) !== null;

export type KeyType = "sr25519" | "ed25519" | "ecdsa";

export interface Address {
    type: KeyType,
    value: SS58Address,
}


// ==== Request ====

//                     [HTTP / socket]
// Commune Client ========================> Commune Module

export type Timestamp = Brand<"Timestamp", string>;

/**
 * Param name. Should be compatible with any programming languages identifiers.
 * String, alphanumeric + underscores, that starts with a letter.
 */
export type Identifier = Brand<"Identifier", string>;

export const is_identifier = (x: any): x is Identifier =>
    typeof x === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(x);

/**
 * Request data
 */
interface Request {
    target_key: Address,
    timestamp: string, // ISO 8601
    call: Call,
}

/**
 * A call to a module method
 */
interface Call {
    method_name: string,
    params: Params,
}

interface Params {
    [key: Identifier]: any; // some IPLD thing?
}

/**
 * A signed request.
 */
interface Signed<T> {
    /**
     * How to enable multiple key types?
     * 
     * https://wiki.polkadot.network/docs/learn-cryptography#account-keys
     * 
     * ed25519 / sr25519 / ecdsa
     */
    key: Address,

    signature: string,

    /**
     * Request goes here.
     * But what is this? base64 encoded JSON string? actual object?
     *
     * If `data` is an object instead of a bytestring, we need a deterministic
     * way to serialize it for signature.
     *
     * https://github.com/cyberphone/json-canonicalization
     *
     * https://cloud.typingmind.com/share/0df4843b-45f4-4a9e-997e-0e7710ee8880
     *
     */
    data: CanonJson<T>,
}

/**
 * Does this makes sense???
 */
interface RequestOutput {
    signature?: string,
    data?: any,
}

function request_server(data: Signed<Request>){
    console.log("Requesting server with data", data);
    const data_output = {
        cute_text: "UwU",
        data: data,
    };
    return data_output;
}


function check_signature<T>(signature: string, key: string, data: CanonJson<T>){
    //returns if signatures matches
    return false;
}


function parse_signed_request(input: any){
    let signed_request = input as Signed<Request> // test
    let _key = parse_ss58(signed_request.key.value)
    if (_key == null){
        throw new Error("Invalid SS58 address")
    }
    const [_format, pub_key] = _key
    const signed = check_signature(signed_request.signature, pub_key, signed_request.data)
    if (!signed){
        throw new Error("Invalid signature")
    }
    // Checks if data.target_key == self.key
    // Checks if timestamp <= 1000

    const raw_request = signed_request.data
    const request = "a" as Request // parse_request(raw_request) as Request

    validate(request.host_key, request.timestamp)

}

function handle_request(input: any){
    const request: Signed<Request> = parse_signed_request(input);
}

function main() {
    // Signed<Request> -> RequestOutput
    const data_sent_to_module: Signed<Request> = "abc" as any;
    let r = request_server(data_sent_to_module);
}
