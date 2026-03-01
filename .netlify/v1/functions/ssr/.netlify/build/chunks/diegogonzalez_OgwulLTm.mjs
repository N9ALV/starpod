const diegogonzalez = new Proxy({"src":"/_astro/diegogonzalez.Dvyg5gRV.jpg","width":800,"height":800,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/diegogonzalez.jpg";
							}
							
							return target[name];
						}
					});

export { diegogonzalez as default };
