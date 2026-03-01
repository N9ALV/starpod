const theonlyspotty = new Proxy({"src":"/_astro/theonlyspotty.BU5glG0v.jpg","width":500,"height":500,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/theonlyspotty.jpg";
							}
							
							return target[name];
						}
					});

export { theonlyspotty as default };
