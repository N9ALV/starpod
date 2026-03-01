const engineering_bae = new Proxy({"src":"/_astro/engineering_bae.BWRNtbJR.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/engineering_bae.jpg";
							}
							
							return target[name];
						}
					});

export { engineering_bae as default };
