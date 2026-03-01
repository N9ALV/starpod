const adamstac = new Proxy({"src":"/_astro/adamstac.CM9niw3I.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/adamstac.jpg";
							}
							
							return target[name];
						}
					});

export { adamstac as default };
