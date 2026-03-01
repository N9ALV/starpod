const kevinwhinnery = new Proxy({"src":"/_astro/kevinwhinnery.y8x1vkd-.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/kevinwhinnery.jpg";
							}
							
							return target[name];
						}
					});

export { kevinwhinnery as default };
