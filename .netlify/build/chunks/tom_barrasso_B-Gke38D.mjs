const tom_barrasso = new Proxy({"src":"/_astro/tom_barrasso.lCPmBmgI.jpg","width":655,"height":655,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/tom_barrasso.jpg";
							}
							
							return target[name];
						}
					});

export { tom_barrasso as default };
