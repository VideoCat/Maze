/* fenetres.js
 * Role : modifie les proprietes et le contenu des fenetres du navigateur
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 16/09/2002
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// gestion des fenetres
var fntrs_ids=new Array(100);
fntrs_ids[0]="self";
var fntrs_obj=new Array(100);
fntrs_obj[0]=self;
var fntrs_cpt=1;

// --- Fonctions ---

// active la fenetre specifiee en lui donnant le focus
function activerFenetre(id) {
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			if (window.focus) {
				fntrs_obj[i].focus();
				return true;
			} else
				return false;
		}
	}
	return false;
} // fin activerFenetre(id)

// deplace la fenetre specifiee du nombre de pixels specifie
function deplacerFenetreDe(id, px, py) {
	if (isNaN(px)) { px=0; }
	if (isNaN(py)) { py=0; }
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i].moveBy(px,py);
			return true;
		}
	}
	return false;
} // fin deplacerFenetreDe(id, px, py)

// deplace la fenetre specifiee vers les coordonnees specifiees
function deplacerFenetreVers(id, x, y) {
	if ((isNaN(x)) || (parseInt(x)<0)) { x=0; }
	if (parseInt(x)>screen.width) { x=screen.width; }
	if ((isNaN(y)) || (parseInt(y)<0)) { y=0; }
	if (parseInt(y)>screen.height) { y=screen.height; }
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i].moveTo(x,y);
			return true;
		}
	}
	return false;
} // fin deplacerFenetreVers(id, x, y)

// desactive la fenetre en lui enlevant le focus
function desactiverFenetre(id) {
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			if (window.blur) {
				fntrs_obj[i].blur();
				return true;
			} else
				return false;
		}
	}
	return false;
} // fin desactiverFenetre(id)

// modifie les dimensions de la fenetre specifiee
function dimensionsFenetre(id, largeur, hauteur) {
	if ((isNaN(largeur)) || (parseInt(largeur)<10)) { largeur=10; }
	if (parseInt(largeur)>screen.width) { largeur=screen.width; }
	if ((isNaN(hauteur)) || (parseInt(hauteur)<10)) { hauteur=10; }
	if (parseInt(hauteur)>screen.height) { hauteur=screen.height; }
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i].resizeTo(largeur, hauteur);
			return true;
		}
	}
	return false;
}	// fin dimensionsFenetre(id, largeur, hauteur)

// ecrit le code HTML specifie dans une nouvelle fenetre
function ecrireFenetre(id, texte, prop) {
	var fprp;
	if (!texte) { texte="<HTML><BODY></BODY></HTML>"; }
	if (!prop) {
		fprp="toolbar=1,location=1,directories=1,menubar=1,scrollbars=1,resizable=1,status=1";
	} else {
		fprp=prop;
	}
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i]=window.open("about:blank", id, fprp);
			fntrs_obj[i].document.open();
			fntrs_obj[i].document.write(texte);
			fntrs_obj[i].document.close();
			if (window.focus) { fntrs_obj[i].focus(); }
			return true;
		}
	}
	fntrs_ids[fntrs_cpt]=id;
	fntrs_obj[fntrs_cpt]=window.open("about:blank", id, fprp);
	fntrs_obj[fntrs_cpt].document.open();
	fntrs_obj[fntrs_cpt].document.write(texte);
	fntrs_obj[fntrs_cpt].document.close();
	if (window.focus) { fntrs_obj[fntrs_cpt].focus(); }
	fntrs_cpt=fntrs_cpt+1;
	return true;
} // ecrireFenetre(id, texte, prop)

// ecrit le code HTML specifie dans une nouvelle fenetre en mode plein ecran
function ecrirePleinEcran(id, texte) {
	var fprp="fullscreen=1,left=0,top=0,width="+(screen.width-6)+",height="+(screen.height-26);
	ecrireFenetre(id, texte, fprp);
	deplacerFenetreVers(id, 0, 0);
	return true;
}	// fin ecrirePleinEcran(id, texte)

// ecrit le code HTML specifie dans une nouvelle fenetre de type popup
function ecrirePopup(id, texte) {
	var fprp="left="+Math.floor((screen.width-250)/2)+",top="+Math.floor((screen.height-190)/2);
	fprp+=",width=250,height=150,status=0,directories=0,toolbar=0";
	fprp+=",location=0,menubar=0,scrollbars=0,resizable=0";
	ecrireFenetre(id, texte, fprp);
	return true;
}	// fin ecrirePopup(id, texte)

// modifie le contenu de la barre d'etat de la fenetre specifiee
function etatFenetre(id, texte) {
	if (!texte) { texte=""; }
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i].defaultStatus=texte;
			fntrs_obj[i].status=texte;
			return true;
		}
	}
	return false;
}	// fin etatFenetre(id, texte)

// ferme la fenetre
function fermerFenetre(id) {
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			if (i==0)
				fntrs_obj[i].opener=top;
			fntrs_obj[i].close();
			fntrs_ids[i]="";
			return true;
		}
	}
	return false;
} // fin fermerFenetre(id)

// ouvre l'URL specifiee dans une fenetre
function ouvrirFenetre(id, url, prop) {
	var fprp;
	if (!url) { url="about:blank"; }
	if (!prop) {
		fprp="toolbar=1,location=1,directories=1,menubar=1,scrollbars=1,resizable=1,status=1";
	} else {
		fprp=prop;
	}
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			fntrs_obj[i]=window.open(url, id, fprp);
			if (window.focus) { fntrs_obj[i].focus(); }
			return true;
		}
	}
	fntrs_ids[fntrs_cpt]=id;
	fntrs_obj[fntrs_cpt]=window.open(url, id, fprp);
	if (window.focus) { fntrs_obj[fntrs_cpt].focus(); }
	fntrs_cpt=fntrs_cpt+1;
	return true;
} // fin ouvrirFenetre(id, url, prop)

// ouvre l'URL specifiee en plein ecran
function ouvrirPleinEcran(id, url) {
	var fprp="fullscreen=1,left=0,top=0,width="+(screen.width-6)+",height="+(screen.height-26);
	ouvrirFenetre(id, url, fprp);
	deplacerFenetreVers(id, 0, 0);
	return true;
}	// fin ouvrirPleinEcran(id, url)

// ouvre l'URL specifiee dans une fenetre de type popup
function ouvrirPopup(id, url) {
	var fprp="left="+Math.floor((screen.width-250)/2)+",top="+Math.floor((screen.height-150)/2);
	fprp+=",width=250,height=150,status=0,directories=0,toolbar=0";
	fprp+=",location=0,menubar=0,scrollbars=0,resizable=0";
	ouvrirFenetre(id, url, fprp);
	return true;
}	// fin ouvrirPopup(id, url)

// redirige la fenetre vers l'URL specifiee
function redirigerFenetre(id, url) {
	if (!url) { url="about:blank"; }
	for (var i=0; i<fntrs_cpt; i++) {
		if (fntrs_ids[i]==id) {
			if (window.location.replace) fntrs_obj[i].location.replace(url);
			else fntrs_obj[i].location.href=url;
			return true;
		}
	}
	return false;
} // fin redirigerFenetre(id, url)
