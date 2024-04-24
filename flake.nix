{
  description = "Commune Module Interface Spec";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs_21;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            nodejs
            # pkgs.nodePackages.yarn
          ];
          shellHook = ''
          '';
        };
      }
    );
}
