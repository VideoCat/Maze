/* dialogues.js
 * Role : affiche et controle les boites de dialogue les plus utilisees
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 12/07/2001
 * Mise a jour : 12/12/2007
 * Bogues connues : - le dialogue d'impression n'apparait pas sous Opera 5
 */

// --- Fonctions ---

// affiche une boite de dialogue de confirmation et retourne la reponse choisie
function dialogueConfirm(message) {
	if (!message) { message="Confirmation"; }
	return (window.confirm(message));
} // fin dialogueConfirm(message)

// affiche la boite de dialogue d'impression de la page Web courante
function dialogueImprimer() {
	if (window.print) {
		if (window.focus) self.focus();
		self.print();
	} else {
		var dagt=navigator.userAgent.toLowerCase();
		if ((dagt.indexOf("msie")!=-1) && (dagt.indexOf("opera")==-1)) {
			var dimp="<OBJECT ID='WindowPrint' WIDTH=0 HEIGHT=0 CLASSID='CLSID:8856F961-340A-11D0-A96B-00C04FD705A2'></OBJECT>";
			document.body.insertAdjacentHTML("beforeEnd", dimp);
			WindowPrint.ExecWB(6, 2);
		}
	}
	return true;
} // fin dialogueImprimer

// affiche une boite de dialogue d'information
function dialogueInfo(message) {
	if (!message) { message="Information"; }
	window.alert(message);
	return true;
} // fin dialogueInfo(message)

// affiche une boite de dialogue de saisie et retourne le texte saisi
function dialogueSaisie(message, defaut) {
	var drep;
	if (!message) { message="Saisie"; }
	if (!defaut) { defaut=""; }
	drep=window.prompt(message, defaut);
	if (!drep) { drep=""; }
	return (drep);
} // fin dialogueSaisie(message, defaut)
