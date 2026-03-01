const jemyoung = new Proxy({"src":"/_astro/jemyoung.Dojkc5io.png","width":400,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/jemyoung.png";
							}
							
							return target[name];
						}
					});

export { jemyoung as default };
