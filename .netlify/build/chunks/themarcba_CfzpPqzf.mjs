const themarcba = new Proxy({"src":"/_astro/themarcba.DQsIK9SV.jpg","width":400,"height":400,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/themarcba.jpg";
							}
							
							return target[name];
						}
					});

export { themarcba as default };
