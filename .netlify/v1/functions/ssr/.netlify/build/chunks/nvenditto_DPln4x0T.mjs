const nvenditto = new Proxy({"src":"/_astro/nvenditto.C8KJwGxM.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/nvenditto.jpg";
							}
							
							return target[name];
						}
					});

export { nvenditto as default };
