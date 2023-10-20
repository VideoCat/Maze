/* cookies.js
 * Role : lit, ecrit et efface les cookies de la page Web courante
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 11/04/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// vrai si le navigateur accepte les cookies
var cookies_ok=false;

// --- Fonctions ---

// indique si le navigateur accepte les cookies
function accepteCookies() {
	cookies_ok=false;
	if (navigator.cookieEnabled) {
		cookies_ok=true;
	} else {
		ecrireCookie ("jslib_cookie", "ok");
		if (lireCookie("jslib_cookie")=="ok") { cookies_ok=true; }
		effacerCookie("jslib_cookie");
	}
	return (cookies_ok);
} // fin accepteCookies()

// ecrit un cookie de nom et valeur specifiees pour le nombre de jours specifie
function ecrireCookie(nom, valeur, jours) {
	if (!nom || nom=="") return false;
	if (!valeur) { valeur=""; }
	if (!jours) { jours=0; }
	var expire;
	if (parseInt(jours)!=0) {
		var date=new Date();
		date.setTime(date.getTime()+(parseInt(jours)*24*60*60*1000));
		expire="; expires="+date.toGMTString();
	} else {
		expire="";
	}
	document.cookie=nom+"="+escape(valeur)+expire+"; path=/";
	return true;
} // fin ecrireCookie(nom, valeur, jours)

// efface le cookie de nom specifie
function effacerCookie(nom) {
	return (ecrireCookie(nom, "", -1));
} // fin effacerCookie(nom)

// lit et retourne la valeur du cookie de nom specifie
function lireCookie(nom) {
	if (!nom || nom=="") return ("");
	var nomEq=nom+"=";
	var tab=document.cookie.split(";");
	for(var i=0; i<tab.length; i++) {
		var cook=tab[i];
		while (cook.charAt(0)==' ')
			cook=cook.substring(1, cook.length);
		if (cook.indexOf(nomEq)==0)
			return unescape(cook.substring(nomEq.length, cook.length));
	}
	return ("");
} // fin lireCookie(nom)
