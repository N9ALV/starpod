const carlopiana = new Proxy({"src":"/_astro/carlopiana.BEfW7NNT.jpg","width":589,"height":589,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/carlopiana.jpg";
							}
							
							return target[name];
						}
					});

export { carlopiana as default };
