export async function init () {
	await Avatar.lang.addPluginPak('BirthAvatar');
}

export async function action(data, callback) {

	try {

		const L = await Avatar.lang.getPak('BirthAvatar', data.language);
		
		const tblActions = {
			 birthDay: () => birthDay(data.client, L)   				
		}
		
		info("BirthAvatar:", data.action.command, "from", data.client);
		
		if (tblActions[data.action.command]) {
            await tblActions[data.action.command]();
        }

	} catch (err) {
		if (data.client) Avatar.Speech.end(data.client);
		if (err.message) error(err.message);
	}	
		
	callback();
 
}

const birthDay = (client, L) => {

     const birthDate = Config.modules.BirthAvatar.birthDate;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    Avatar.speak(L.get("speech.avatar", age), client, () => Avatar.Speech.end(client));

};
