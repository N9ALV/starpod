const typecraft_dev = new Proxy({"src":"/_astro/typecraft_dev.yHbKCbmW.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/typecraft_dev.jpg";
							}
							
							return target[name];
						}
					});

export { typecraft_dev as default };
