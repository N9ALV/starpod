const robbiethewagner = new Proxy({"src":"/_astro/robbiethewagner.ZVBXTeaQ.jpg","width":409,"height":409,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/adam/Zoho WorkDrive (ML)/My Folders/Downloads/IQpod/starpod-main/starpod-main/src/img/people/robbiethewagner.jpg";
							}
							
							return target[name];
						}
					});

export { robbiethewagner as default };
