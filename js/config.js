if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	var appConfig = {
		'base' : 'http://' + location.hostname + ":" + location.port,
	}	
} else if(location.hostname === "cvetkovic-70.github.io") {
	var appConfig = {
		'base': 'https://cvetkovic-70.github.io/slavica-cvetkovic',
	}
} else {
	var appConfig = {
		'base': '',
	}
}

axios.defaults.baseURL = appConfig.base;
	