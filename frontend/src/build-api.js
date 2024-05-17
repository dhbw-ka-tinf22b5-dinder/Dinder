import fs from "fs";

main();

function main() {
	const prefix = "../backend/src/main/resources/";

	let errCallback = (err) => {
		if (err) return console.log(err);
	};

	fs.mkdir(prefix + "public/api", errCallback);
	fs.copyFile(
		prefix + "api-docs/index.html",
		prefix + "public/api/index.html",
		errCallback,
	);
}
