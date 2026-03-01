const zeeg = new Proxy({"src":"/_astro/zeeg.DsXDAjuN.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/zeeg.jpg";
							}
							
							return target[name];
						}
					});

export { zeeg as default };
