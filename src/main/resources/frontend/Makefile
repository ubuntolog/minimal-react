WEBUI = webui
JSBUNDLE = webui/app/bundle.js

webui: $(JSBUNDLE)

webui-production:
	(cd webui && node_modules/webpack/bin/webpack.js --mode production -p)

run_webui_dev_server:
	(cd $(WEBUI) && node_modules/webpack-dev-server/bin/webpack-dev-server.js --mode development -d --hot --https)

dependencies: $(WEBUI)/node_modules

$(WEBUI)/node_modules:
	(cd $(WEBUI) && npm install)
