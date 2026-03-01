const htmx_org = new Proxy({"src":"/_astro/htmx_org.JoHuen7e.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/htmx_org.jpg";
							}
							
							return target[name];
						}
					});

export { htmx_org as default };
