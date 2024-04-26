declare const BRAND_KEY: unique symbol;
export type Brand<T, B> = T & { readonly [BRAND_KEY]: B };

export type Address = Brand<string, "Address">;

// alphanumeric + underscores, starts with a letter
export type Identifier = Brand<string, "Address">; 

interface Params {
    [key: Identifier]: number;
}

interface Call {
    method_name: string,
    params: Params,
}

interface Request {
    host_key: Address,
    call: Call,
}

interface Signed {
    key: string,
    signature: string,
    data: string,
}
