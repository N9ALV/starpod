const avatarLight = new Proxy({"src":"/_astro/avatar-light.CCv87gnO.png","width":192,"height":192,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/avatar-light.png";
							}
							
							return target[name];
						}
					});

export { avatarLight as default };
