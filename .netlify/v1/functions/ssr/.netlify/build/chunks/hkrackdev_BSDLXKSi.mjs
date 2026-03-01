const hkrackdev = new Proxy({"src":"/_astro/hkrackdev.DX_ooMys.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/hkrackdev.jpg";
							}
							
							return target[name];
						}
					});

export { hkrackdev as default };
