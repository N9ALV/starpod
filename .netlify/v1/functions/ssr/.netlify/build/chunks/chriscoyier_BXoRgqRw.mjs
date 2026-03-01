const chriscoyier = new Proxy({"src":"/_astro/chriscoyier.CTpeKgSs.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/chriscoyier.jpg";
							}
							
							return target[name];
						}
					});

export { chriscoyier as default };
