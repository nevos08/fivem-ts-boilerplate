name 'nvs_core'
version '1.0.0'
license 'ISC'
fx_version 'cerulean'
game 'gta5'
node_version '22'

files {
	'locales/*.json',
	'common/*.json',
}

dependencies {
	'/server:12913',
	'/onesync',
}

client_scripts {
	'dist/client.js',
}

server_scripts {
	'dist/server.js',
}
