const davideast = new Proxy({"src":"/_astro/davideast.B_hMd2Id.jpg","width":399,"height":399,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/davideast.jpg";
							}
							
							return target[name];
						}
					});

export { davideast as default };
