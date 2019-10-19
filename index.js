var fs = require('fs');
var inquirer = require('inquirer');
var ncp = require('ncp').ncp;
var generate = function(){
inquirer
    .prompt([
        {
            type: 'text',
            message: 'Name',
            name: 'name',
        },
        {
            type: 'text',
            message: 'Author',
            name: 'author',
        },
        {
            type: 'text',
            message: 'Description',
            name: 'desc',
        },
        {
            type: 'text',
            message: 'version',
            name: 'version',
            default: "0.1",
        },
        {
            type: 'checkbox',
            message: 'Select permissions',
            name: 'permissions',
            choices: [
                {
                    name: "activeTab",
                },
                {
                    name: "alarms",
                },
                {
                    name: "background",
                },
                {
                    name: "bookmarks",
                },
                {
                    name: "browserSettings",
                },
                {
                    name: "browsingData",
                },
                {
                    name: "clipboardRead",
                },
                {
                    name: "clipboardWrite",
                },
                {
                    name: "contentSettings",
                },
                {
                    name: "contextMenus",
                },
                {
                    name: "contextualIdentities",
                },
                {
                    name: "cookies",
                },
                {
                    name: "debugger",
                },
                {
                    name: "dns",
                },
                {
                    name: "downloads",
                },
                {
                    name: "downloads.open",
                },
                {
                    name: "find",
                },
                {
                    name: "geolocation",
                },
                {
                    name: "history",
                },
                {
                    name: "identity",
                },
                {
                    name: "idle",
                },
                {
                    name: "management",
                },
                {
                    name: "menus",
                },
                {
                    name: "menus.overrideContext",
                },
                {
                    name: "nativeMessaging",
                },
                {
                    name: "notifications",
                },
                {
                    name: "pageCapture",
                },
                {
                    name: "pkcs11",
                },
                {
                    name: "privacy",
                },
                {
                    name: "proxy",
                },
                {
                    name: "search",
                },
                {
                    name: "sessions",
                },
                {
                    name: "storage",
                },
                {
                    name: "tabHide",
                },
                {
                    name: "tabs",
                },
                {
                    name: "theme",
                },
                {
                    name: "topSites",
                },
                {
                    name: "unlimitedStorage",
                },
                {
                    name: "webNavigation",
                },
                {
                    name: "webRequest",
                },
                {
                    name: "webRequestBlocking",
                },

            ]
        }
    ])
    .then(answers => {
        var manifest = {
            "manifest_version": 2,
            author: answers.author,
            name: answers.name,
            description: answers.desc,
            version: "0.1",
            permissions: answers.permissions,
            icons: {
                "48": "assets/images/icons/icon-48.png",
                "96": "assets/images/icons/icon-96.png"
            }
        };

	    


	fs.mkdir(answers.name, function(e){
	    if(!e || (e && e.code === 'EEXIST')){
		console.log('exists');	
            } else {
                 console.log('not');
            
    	    }
	});


	    
        fs.appendFile('./'+answers.name+'/manifest.json', JSON.stringify(manifest), function (err) {
            if (err) throw err;
            console.log('Saved!');
          }); 
        ncp.limit = 16;
        var path = require('path');
        var appDir = path.dirname(path.dirname(require.main.filename))+"/template";
        console.log(appDir);
        ncp(appDir, "./"+answers.name, function (err) {
         if (err) {
           return console.error(err);
         }
         console.log('done!');
        });

    });
};

exports.generate = generate;
