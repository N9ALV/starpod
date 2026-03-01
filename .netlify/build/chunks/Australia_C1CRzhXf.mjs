const Australia = new Proxy({"src":"/_astro/Australia.DZ7QbwIe.png","width":48,"height":48,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/countries/Australia.png";
							}
							
							return target[name];
						}
					});

export { Australia as default };
