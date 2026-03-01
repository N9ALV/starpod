const esthor = new Proxy({"src":"/_astro/esthor.CV_LfIFi.jpg","width":399,"height":399,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/esthor.jpg";
							}
							
							return target[name];
						}
					});

export { esthor as default };
