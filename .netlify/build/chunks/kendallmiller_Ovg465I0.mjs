const kendallmiller = new Proxy({"src":"/_astro/kendallmiller.CHtEMOr7.jpg","width":800,"height":800,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/kendallmiller.jpg";
							}
							
							return target[name];
						}
					});

export { kendallmiller as default };
