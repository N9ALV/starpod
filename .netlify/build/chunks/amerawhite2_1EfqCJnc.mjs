const amerawhite2 = new Proxy({"src":"/_astro/amerawhite2.DNX6rXjl.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/amerawhite2.jpg";
							}
							
							return target[name];
						}
					});

export { amerawhite2 as default };
