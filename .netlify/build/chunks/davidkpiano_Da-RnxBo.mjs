const davidkpiano = new Proxy({"src":"/_astro/davidkpiano.CTU4t3tO.jpg","width":267,"height":267,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/davidkpiano.jpg";
							}
							
							return target[name];
						}
					});

export { davidkpiano as default };
