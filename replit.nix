{ pkgs }: {
	deps = [
        pkgs.zulu8
        pkgs.nodejs-16_x
        pkgs.replitPackages.jest
	];
}