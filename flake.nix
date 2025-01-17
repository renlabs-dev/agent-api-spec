{
  description = "Torus Agent Interface Spec";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        nodejs = pkgs.nodejs_20;
        yarn = pkgs.yarn;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            nodejs
            yarn
          ];
          packages = [
            pkgs.just
            pkgs.biome
          ];
          shellHook = ''
          '';
        };
      }
    );
}
