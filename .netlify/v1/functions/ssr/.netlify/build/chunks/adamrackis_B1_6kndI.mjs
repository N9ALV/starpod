const adamrackis = new Proxy({"src":"/_astro/adamrackis.sJi2fcD_.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/adamrackis.jpg";
							}
							
							return target[name];
						}
					});

export { adamrackis as default };
