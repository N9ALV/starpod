const techgirl1908 = new Proxy({"src":"/_astro/techgirl1908.rHbRBWAs.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/techgirl1908.jpg";
							}
							
							return target[name];
						}
					});

export { techgirl1908 as default };
