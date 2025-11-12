/* Import modules */
const http = require('node:http');
const { argv } = require('node:process');
const dns = require('node:dns');
const readline = require('node:readline');
const https = require('node:https');

/* Common variables */
const ERROR_MSG1 = "Invalid arguments please use --help or -h for showing a commands";
const ERROR_MSG2 = `file "${argv[5]}" was not found please use --help for showing a commands`;
const VERSION_TOOL = "Name: portia.js\nVersion: alpha 0.0.1";
const date = new Date().toString();


/*
 * Used to showing commands in case user forgot or human errors.
 */
function help_commands(){
	const command_arguments = ["--help : Showing commands", "-v : Showing the version tool", "-t : Target host. ex: www.google.com", `\nExample usage:\n\t ${argv[0]} portia.js -t www.machineryman.com`];

	console.log("Arguments:");
	command_arguments.forEach((commands_argument) => {
		console.log(`\t${commands_argument}`);
	})
}

/*
 * Showing IP address of the website.
 */
function display_IP(HOST){
	dns.lookup(HOST, (err, address, family) => {
		console.log('[i] IP: %j Protocol family: IPv%s\n', address, family);
	});
}

/*
 * Get all infomation from a http site:
 * Showing raw headers and headers and additional infomation.
 */
function scan_http(HOST, PATHNAME, PROTOCOL){
	http.get({
		hostname: HOST, // Get Host from parameter one.
		port: 80, // Default port: 80
		path: PATHNAME, // Default path: "/"
		agent: false,
	}, (res) => {
		// Raw headers [!]
		http_rawheaders = res.rawHeaders;
		console.log(`Raw Headers [!]:\n${http_rawheaders}\n`);

		// Headers [~]
		http_headers = res.headers;
		console.log(`Headers [!]:\n`, res.headers);

		// Additional information [~]
		console.log(`\nAdditional information [i]:\nProtocol: "${PROTOCOL}"\nPath location: "${PATHNAME}"\nHost: ${HOST}\nStatus code: ${res.statusCode}\nContent-Type: ${res.headers["content-type"]}\n`);
	});
}

/*
 * Get all infomation from a https site:
 * Showing raw headers and headers and additional infomation.
 */
function scan_https(HOSTNAME, PROTOCOL, PATHNAME){
	https.get(`${PROTOCOL}//${HOSTNAME}${PATHNAME}`, (res) => {
		// Raw headers [!]
		http_rawheaders = res.rawHeaders;
		console.log(`Raw Headers [!]:\n${http_rawheaders}\n`);

		// Headers [~]
		console.log(`Headers [~]:`, res.headers);
		console.log(`\nAdditional information [i]:\nPath location: "${PATHNAME}"\nHost: ${HOSTNAME}\nStatus code: ${res.statusCode}\nContent-Type: ${res.headers["content-type"]}\n`);
	});
}

/* If arguments one is equal then run the code.
 * else if any arguments is undefined: print error message.
 */
if (argv[2] == "--help"){
	help_commands(); // <- Function are being calling from here!
} else if (argv[2] == "-t"){
	if (argv[3] == undefined){
		console.log(ERROR_MSG1); // <= Print error messsage!
	} else {
		console.log(`[T] Scan report on ${date}\n[>] TARGET URL: "${argv[3]}"`);

		// Slice the URL into three piece ~
		const FULL_URL_TARGET = new URL(argv[3]);
		const HOSTNAME = FULL_URL_TARGET.hostname;
		const PATHNAME = FULL_URL_TARGET.pathname;
		const PROTOCOL = FULL_URL_TARGET.protocol;

		if (PROTOCOL == "http:"){
			scan_http(HOSTNAME, PATHNAME, PROTOCOL); // <-- Functions are being calling from here!
			display_IP(HOSTNAME); // <-- also here.
		} else if (PROTOCOL == "https:"){
			scan_https(HOSTNAME, PROTOCOL, PATHNAME); // <-- Functions are being calling from here!
			display_IP(HOSTNAME); // <-- also here.
		}

	}
} else if (argv[2] == "-v") {
	console.log(VERSION_TOOL);
} else {
	console.log(ERROR_MSG1); // <= Print error messsage!
}
