/* date.js
 * Role : formate la date du jour et la date de modification du document
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 22/04/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// tableau pour les jours de la semaine
var date_jours=new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");

// tableau pour les mois de l'annee
var date_mois=new Array("janvier","f&eacute;vrier","mars","avril","mai","juin","juillet","ao&ucirc;t","septembre","octobre","novembre","d&eacute;cembre");

// obtient la date de derniere modification du document
var date_der=new Date(document.lastModified);
if ((date_der.getFullYear()+50)<(new Date()).getFullYear()) {
	date_der.setFullYear(parseInt(date_der.getFullYear())+100);
}

// --- Fonctions ---

// retourne la date du jour au format JJ mmm AAAA
function dateJour() {
	var dcour=new Date();
	var dj=dcour.getDate();
	if (dj=="1") dj="1er";
	var dm=dcour.getMonth();
	dm=date_mois[parseInt(dm)];
	return (dj+" "+dm+" "+dcour.getFullYear());
} // fin dateJour()

// retourne la date du jour au format JJ/MM/AAAA
function dateJourAbr() {
	var dcour=new Date();
	var dm=parseInt(dcour.getMonth())+1;
	if (dm<10) dm="0"+dm;
	return (dcour.getDate()+"/"+dm+"/"+dcour.getFullYear());
} // fin dateJourAbr()

// retourne la date du jour au format Jjj JJ mmm AAAA
function dateJourLng() {
	var dcour=new Date();
	var dj=dcour.getDate();
	if (dj=="1") dj="1er";
	var dm=dcour.getMonth();
	dm=date_mois[parseInt(dm)];
	var dd=dcour.getDay();
	dd=date_jours[parseInt(dd)];
	return (dd+" "+dj+" "+dm+" "+dcour.getFullYear());
} // fin dateJourLng()

// retourne la date de derniere modification au format JJ mmm AAAA
function dateModif() {
	var dj=date_der.getDate();
	if (dj=="1") dj="1er";
	var dm=date_der.getMonth();
	dm=date_mois[parseInt(dm)];
	return (dj+" "+dm+" "+date_der.getFullYear());
} // fin dateModif()

// retourne la date de derniere modification au format JJ/MM/AAAA
function dateModifAbr() {
	var dm=parseInt(date_der.getMonth())+1;
	if (dm<10) dm="0"+dm;
	return (date_der.getDate()+"/"+dm+"/"+date_der.getFullYear());
} // fin dateModifAbr()

// retourne la date de derniere modification au format Jjj JJ mmm AAAA
function dateModifLng() {
	var dd=date_der.getDay();
	dd=date_jours[parseInt(dd)];
	return (dd+" "+dateModif());
} // fin dateModifLng()

// verifie la date passee en parametre
function verifierDate(jour, mois, annee) {
	var jours_mois = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if (!jour || !mois || !annee)
		return false;
	if (!parseInt(jour) || !parseInt(mois) || !parseInt(annee))
		return false;
	if ((annee < 1900) || (annee > 9999))
		return false;
	if ((mois < 1) || (mois > 12))
		return false;
	if (annee/4 == parseInt(annee/4))
		jours_mois[1] = 29;
	if ((jour < 1) || (jour > jours_mois[parseInt(mois)-1]))
		return false;
	return true;
} // fin verifierDate(jour, mois, annee)
