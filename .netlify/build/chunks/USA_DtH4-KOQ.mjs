const USA = new Proxy({"src":"/_astro/USA.BZkLZdIF.png","width":48,"height":48,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/countries/USA.png";
							}
							
							return target[name];
						}
					});

export { USA as default };
