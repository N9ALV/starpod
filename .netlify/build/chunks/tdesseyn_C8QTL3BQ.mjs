const tdesseyn = new Proxy({"src":"/_astro/tdesseyn.BqVcLJvv.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/tdesseyn.jpg";
							}
							
							return target[name];
						}
					});

export { tdesseyn as default };
