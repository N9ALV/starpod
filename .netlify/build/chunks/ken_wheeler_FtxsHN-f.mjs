const ken_wheeler = new Proxy({"src":"/_astro/ken_wheeler.DUA-IyQQ.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/ken_wheeler.jpg";
							}
							
							return target[name];
						}
					});

export { ken_wheeler as default };
