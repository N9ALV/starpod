const aarondfrancis = new Proxy({"src":"/_astro/aarondfrancis.D5ZvPlW0.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/aarondfrancis.jpg";
							}
							
							return target[name];
						}
					});

export { aarondfrancis as default };
