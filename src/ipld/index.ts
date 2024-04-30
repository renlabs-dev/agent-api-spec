// import * as tsafe from "tsafe";

import * as fs from "fs";
import * as path from "path";

import * as dag_json_codec from "@ipld/dag-json";
import * as Block from "multiformats/block";

import { fromDSL } from "./ipdl_schema/index.js";

function main() {
  const schema_txt = `
    type Address string
    type Identifier string

    #type Params map<Identifier, number>

    type Call struct {
        method_name String
        params Params
    }

    type KeyType enum {
      | ed25519
      | sr25519
      | ecdsa
    }

    type PublicKey struct {
        key_type String
        key_value Bytes
    }

    type Request struct {
        host_key PublicKey
        call Call
    }
  `;
  const schema = fromDSL(schema_txt);
  console.log(JSON.stringify(schema, null, 4));
}

main();
