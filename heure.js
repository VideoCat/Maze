/* heure.js
 * Role : formate l'heure courante et l'affiche de maniere statique ou dynamique
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 24/04/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// variables pour la mise a jour dynamique
var heure_champ;
var heure_timeout;

// --- Fonctions ---

// active la mise a jour dynamique de l'heure pour le champ specifie
function chargerHeureDyna(champ) {
	if (champ)
		heure_champ=eval(champ);
	heure_champ.value=heureCour();
	heure_timeout=window.setTimeout("chargerHeureDyna()", 1000);
	return true;
} // fin chargerHeureDyna(champ)

// desactive la mise a jour dynamique de l'heure precedemment activee
function dechargerHeureDyna() {
	window.clearTimeout(heure_timeout);
	return true;
} // fin dechargerHeureDyna()

// retourne l'heure courante au format HH:MM:SS
function heureCour() {
	var h_date=new Date();
	var h_h=h_date.getHours();
	var h_m=h_date.getMinutes();
	var h_s=h_date.getSeconds();
	if (h_s<10) h_s="0"+h_s;
	if (h_m<10) h_m="0"+h_m;
	return (h_h+":"+h_m+":"+h_s);
} // fin heureCour()

// retourne l'heure courante en abrege, au format HH:MM
function heureCourAbr() {
	var h_date=new Date();
	var h_h=h_date.getHours();
	var h_m=h_date.getMinutes();
	if (h_m<10) h_m="0"+h_m;
	return (h_h+":"+h_m);
} // fin heureCourAbr()

// retourne l'heure courante au format HH:MM am/pm
function heureCourAMPM() {
	var h_date=new Date();
	var h_h=h_date.getHours();
	var h_m=h_date.getMinutes();
	if (h_m<10) h_m="0"+h_m;
	var h_ampm="am";
	if (h_h>11)
		h_ampm="pm";
	if (h_h>12)
		h_h-=12;
	return (h_h+":"+h_m+" "+h_ampm);
} // fin heureCourAMPM()

// retourne l'heure courante au format HH heure(s) MM
function heureCourLng() {
	var h_date=new Date();
	var h_h=h_date.getHours();
	var h_m=h_date.getMinutes();
	if (h_m<10) h_m="0"+h_m;
	if (h_m<1) h_m="";
	else h_m=" "+h_m;
	if (h_h>1) return (h_h+" heures"+h_m);
	else return (h_h+" heure"+h_m);
} // fin heureCourLng()
