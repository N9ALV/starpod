const rwjblue = new Proxy({"src":"/_astro/rwjblue.vTYP1oEz.jpg","width":460,"height":460,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/rwjblue.jpg";
							}
							
							return target[name];
						}
					});

export { rwjblue as default };
