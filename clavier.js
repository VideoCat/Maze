/* clavier.js
 * Role : capture et gere les evenements clavier
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 28/07/2001
 * Mise a jour : 12/12/2007
 * Bogues connues : - Netscape Navigator 4 et Opera ignorent certaines touches de fonction
 */

// capture les evenements sous Netscape Navigator
if (document.layers) {
	document.captureEvents(Event.KEYDOWN);
	document.captureEvents(Event.KEYPRESS);
	document.captureEvents(Event.KEYUP);
}

// --- Variables globales ---

// correction du code des touches
var clavier_un=-1;
var clavier_deux=-1;

// correspondance code/role pour les touches de fonction
var clavier_cds=new Array(146);
clavier_cds[8]="Retour arriere";
clavier_cds[9]="Tabulation";
clavier_cds[12]="Milieu (pave numerique)";
clavier_cds[13]="Entree";
clavier_cds[16]="Shift";
clavier_cds[17]="Ctrl";
clavier_cds[18]="Alt";
clavier_cds[19]="Pause";
clavier_cds[20]="Verr Maj";
clavier_cds[27]="Echap";
clavier_cds[32]="Espace";
clavier_cds[33]="Page precedente";
clavier_cds[34]="Page suivante";
clavier_cds[35]="Fin";
clavier_cds[36]="Debut";
clavier_cds[37]="Fleche gauche";
clavier_cds[38]="Fleche haut";
clavier_cds[39]="Fleche droite";
clavier_cds[40]="Fleche bas";
clavier_cds[44]="Impr ecran";
clavier_cds[45]="Inser";
clavier_cds[46]="Suppr";
clavier_cds[91]="Menu Demarrer Windows";
clavier_cds[92]="Menu Demarrer Windows";
clavier_cds[93]="Menu contextuel Windows";
clavier_cds[112]="F1";
clavier_cds[113]="F2";
clavier_cds[114]="F3";
clavier_cds[115]="F4";
clavier_cds[116]="F5";
clavier_cds[117]="F6";
clavier_cds[118]="F7";
clavier_cds[119]="F8";
clavier_cds[120]="F9";
clavier_cds[121]="F10";
clavier_cds[122]="F11";
clavier_cds[123]="F12";
clavier_cds[144]="Verr Num";
clavier_cds[145]="Arret defil";

// --- Fonctions ---

// retourne le code clavier de la derniere touche enfoncee
function codeTouche(e) {
	var cret;
	if (window.event) {
		if (parseInt(clavier_deux)>0) cret=clavier_deux;
		else cret=window.event.keyCode;
		if (window.event.type=="keypress") clavier_deux=window.event.keyCode;
		if (window.event.type=="keydown") clavier_deux=-1;
	} else {
		if (parseInt(clavier_deux)>0) cret=clavier_deux;
		else if ((parseInt(clavier_un)>0) && (e.which<1)) cret=clavier_un;
		else cret=e.which;
		if (e.type=="keydown") {
			clavier_un=e.which;
			clavier_deux=-1;
		}
		if (e.type=="keypress") clavier_deux=e.which;
	}
	return (parseInt(cret));
} // fin codeTouche(e)

// retourne le caractere ou la fonction pour la derniere touche enfoncee
function correspTouche(e) {
	var ccod=codeTouche(e);
	if (toucheCtrl(e) && toucheAlt(e)) return "Alt Gr";
	if (parseInt(ccod)==8) return clavier_cds[ccod];
	if (parseInt(ccod)==9) return clavier_cds[ccod];
	if (parseInt(ccod)==13) return clavier_cds[ccod];
	if (parseInt(ccod)==27) return clavier_cds[ccod];
	if (parseInt(ccod)==32) return clavier_cds[ccod];
	if ((clavier_cds[ccod]) && (parseInt(clavier_deux)<1)) {
		return (clavier_cds[ccod]);
	} else {
		return (String.fromCharCode(ccod));
	}
} // fin correspTouche(e)

// retourne vrai si la touche Alt a ete enfoncee avec la derniere touche
function toucheAlt(e) {
	if (window.event) {
		return (window.event.altKey);
	} else {
		return (e.altKey || (e.modifiers % 2));
	}
} // fin toucheAlt(e)

// retourne vrai si la touche Ctrl a ete enfoncee avec la derniere touche
function toucheCtrl(e) {
	if (window.event) {
		return (window.event.ctrlKey);
	} else {
		return (e.ctrlKey || (e.modifiers==2) || (e.modifiers==3) || (e.modifiers>5));
	}
} // fin toucheCtrl(e)

// retourne vrai si la touche Shift a ete enfoncee avec la derniere touche
function toucheShift(e) {
	if (window.event) {
		return (window.event.shiftKey);
	} else {
		return (e.shiftKey || (e.modifiers>3));
	}
} // fin toucheShift(e)
