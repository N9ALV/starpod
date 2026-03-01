const avatarDark = new Proxy({"src":"/_astro/avatar-dark.dWRnXNQ0.png","width":192,"height":192,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/avatar-dark.png";
							}
							
							return target[name];
						}
					});

export { avatarDark as default };
