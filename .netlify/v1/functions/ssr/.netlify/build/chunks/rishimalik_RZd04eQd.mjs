const rishimalik = new Proxy({"src":"/_astro/rishimalik.DNh_1eDF.jpg","width":500,"height":500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/rishimalik.jpg";
							}
							
							return target[name];
						}
					});

export { rishimalik as default };
