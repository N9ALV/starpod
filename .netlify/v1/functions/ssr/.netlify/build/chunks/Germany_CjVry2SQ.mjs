const Germany = new Proxy({"src":"/_astro/Germany.DyLV-IDL.png","width":48,"height":48,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/countries/Germany.png";
							}
							
							return target[name];
						}
					});

export { Germany as default };
