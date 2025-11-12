const http = require('node:http');
const { argv } = require('node:process');
const readline = require('node:readline');
const https = require('node:https');

/*
 * Scan the path directories website. if statusCode is not 200:
 * equal to down or move.
 */
function scan_path_directories(HOST, PROTOCOL){
	// Path parameter storing inside array
	const path_parameter = [
		"/index.php",
		"/main.php",
		"/main.js",
		"/admin.php",
		"/admin.js",
		"/index.html",
		"/index.htm",
		"/style.css",
		"/phpmyadmin/sql.php",
		"/ApacheGUI/jsp/GUISettings.jsp",
		"/login"
	];

	/*
	* Check if PROTOCOL is http use http method get,
	* else if PROTOCOL is https use https method.
	*/

	if (PROTOCOL == "http:"){
		path_parameter.forEach((pathname) =>{
			http.get(`${PROTOCOL}//${HOST}${pathname}`, (res) => {
				if (res.statusCode == 200){
					console.log(`[i] HOST: ${HOST} Path: ${pathname} STATUS: Found ${res.statusCode}`);
				} else if (res.statusCode == 300){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Multiple Choices ${res.statusCode}`);
				} else if (res.statusCode == 301){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Moved Permanently ${res.statusCode}`);
				} else if (res.statusCode == 302) {
					console.log(`[i] HOST: ${HOST} Path: ${pathname} STATUS: Found ${res.statusCode}`);
				} else if (res.statusCode == 303){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: See other ${res.statusCode}`);
				} else if (res.statusCode == 304){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Not Modified ${res.statusCode}`);
				} else if (res.statusCode == 307) {
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Temporary Redirect ${res.statusCode}`);
				} else if (res.statusCode == 308) {
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Permanent Redirect ${res.statusCode}`);
				} else if (res.statusCode == 400){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Bad Request ${res.statusCode}`);
				} else if (res.statusCode == 401){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Unauthorized ${res.statusCode}`);
				} else if (res.statusCode == 402){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Payment Required ${res.statusCode}`);
				} else if (res.statusCode == 403){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Forbidden ${res.statusCode}`);
				} else if (res.statusCode == 404){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Not Found ${res.statusCode}`);
				}
				res.on('ping pong', (d) => {
					process.stdout.write(d);
				})
			});
		})
	} else if (PROTOCOL == "https:"){
		path_parameter.forEach((pathname) =>{
			http.get(`${PROTOCOL}//${HOST}${pathname}`, (res) => {
				if (res.statusCode == 200){
					console.log(`[i] HOST: ${HOST} Path: ${pathname} STATUS: Found ${res.statusCode}`);
				} else if (res.statusCode == 300){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Multiple Choices ${res.statusCode}`);
				} else if (res.statusCode == 301){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Moved Permanently ${res.statusCode}`);
				} else if (res.statusCode == 302) {
					console.log(`[i] HOST: ${HOST} Path: ${pathname} STATUS: Found ${res.statusCode}`);
				} else if (res.statusCode == 303){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: See other ${res.statusCode}`);
				} else if (res.statusCode == 304){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Not Modified ${res.statusCode}`);
				} else if (res.statusCode == 307) {
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Temporary Redirect ${res.statusCode}`);
				} else if (res.statusCode == 308) {
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Permanent Redirect ${res.statusCode}`);
				} else if (res.statusCode == 400){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Bad Request ${res.statusCode}`);
				} else if (res.statusCode == 401){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Unauthorized ${res.statusCode}`);
				} else if (res.statusCode == 402){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Payment Required ${res.statusCode}`);
				} else if (res.statusCode == 403){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Forbidden ${res.statusCode}`);
				} else if (res.statusCode == 404){
					console.log(`[!] HOST: ${HOST} Path: ${pathname} STATUS: Not Found ${res.statusCode}`);
				}
				res.on('ping pong', (d) => {
					process.stdout.write(d);
				})
			});
		})
	}
}

const userinput = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

/* Ask user if they want to scan directories in the site */
userinput.question(`Do you want to scan the directories of ${argv[2]} (y/n): `, input => {
	switch (input) {
		case "y":
				// Slice the URL into three piece ~
				const FULL_URL_TARGET = new URL(argv[2]);
				const HOSTNAME = FULL_URL_TARGET.hostname;
				const PATHNAME = FULL_URL_TARGET.pathname;
				const PROTOCOL = FULL_URL_TARGET.protocol;

				scan_path_directories(HOSTNAME, PROTOCOL);
			break;
		case "n":
				// do nothing
			break;
			Default;
	}

	userinput.close();
})
