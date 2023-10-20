/* dyna.js
 * Role : controle les divisions des pages Web dynamiques
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 07/07/2001
 * Mise a jour : 12/12/2007
 * Bogues connues : - Opera 5/6 ne gere pas la couleur de fond "transparent"
 *									- Opera 5/6 ne gere pas la modification du contenu des divisions
 */

// --- Variables globales ---

// choix du DOM (Document Object Model)
var dyna_w3=0;	// DOM-1 du W3C : Mozilla, Netscape 6/7, IE 5/6, Opera 7, Safari
var dyna_ie=0;	// IE 4
var dyna_nn=0;	// Netscape Navigator 4
var dyna_op=0;	// Opera 4/5/6

// determine le DOM utilise par le navigateur
if (document.getElementById && document.getElementsByTagName)
	dyna_w3=1;
else if (document.all && navigator.userAgent.toLowerCase().indexOf('opera')!=-1)
	dyna_op=1;
else if (document.all)
	dyna_ie=1;
else if (document.layers)
	dyna_nn=1;

// recharge la page si redimensionnement de la fenetre sous Netscape 4 (bogue)
window.onresize=function () {
	if (dyna_nn) { history.go(0); }
}

// --- Fonctions ---

// parcoure les divisions du DOM Netscape 4 pour trouver celle souhaitée
function dyna_obtenirDivNN4(objet, nom) {
	var divs=objet.layers;
	var divTrouvee;
	for (var i=0; i<divs.length; i++) {
		if (divs[i].id==nom)
		 	divTrouvee=divs[i];
		else if (divs[i].layers.length > 0)
			var tmp=dyna_obtenirDivNN4(divs[i], nom);
		if (tmp)
			divTrouvee=tmp;
	}
	return divTrouvee;
} // fin dyna_obtenirDivNN4(objet, nom)

// indique si le navigateur accepte le DHTML
function accepteDHTML() {
	return (dyna_w3 || dyna_ie || dyna_nn || dyna_op);
} // fin accepteDHTML()

// rend invisible la division specifiee
function cacherDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (dyna_w3 || dyna_ie || dyna_op)
		ldiv.style.visibility="hidden";
	else if (dyna_nn)
		ldiv.visibility="hide";
	return true;
} // fin cacherDivision(id)

// cree une nouvelle division et l'ajoute au DOM
// -- merci a Victor Lopes (victor3.lopes@voila.fr)
function creerDivision(id, x, y, largeur, hauteur) {
	if ((!id) || (id=="") || (obtenirDivision(id)))
		return false;
	if (isNaN(x))
		x=0;
	if (isNaN(y))
		y=0;
	if (isNaN(largeur) || (largeur<0))
		largeur=0;
	if (isNaN(hauteur) || (hauteur<0))
		hauteur=0;
	if (dyna_w3 && document.createElement) {
		var ndiv=document.createElement("DIV");
		ndiv.id=id;
		ndiv.style.position="absolute";
		ndiv.style.visibility="hidden";
		ndiv.style.left=x;
		ndiv.style.top=y;
		ndiv.style.width=largeur;
		ndiv.style.height=hauteur;
		ndiv.style.zIndex=0;
		document.body.appendChild(ndiv);
	} else if (dyna_ie || dyna_op) {
		var html="<DIV ID='"+id;
		html+="' STYLE='position:absolute;visibility:hidden;left:"+x+"px;top:"+y;
		html+="px;width:"+largeur+"px;height:"+hauteur+"px;z-index:0;'><\/DIV>";
		document.body.insertAdjacentHTML("beforeEnd", html);
	} else if (dyna_nn){
		document.layers[id]=new Layer(largeur);
		var ndiv=document.layers[id];
		ndiv.visibility="hide";
		ndiv.left=x;
		ndiv.top=y;
		ndiv.document.width=largeur;
		ndiv.document.height=hauteur;
		ndiv.clip.left=0;
		ndiv.clip.right=largeur;
		ndiv.clip.top=0;
		ndiv.clip.bottom=hauteur;
		ndiv.zIndex=0;
	}
	return true;
} // fin creerDivision(id, x, y, largeur, hauteur)

// deplace la division specifiee du nombre de pixels specifie
function deplacerDivisionDe(id, px, py) {
	return (modifierPosGaucheDivision(id, parseInt(obtenirPosGaucheDivision(id)) + px)
		&& modifierPosHautDivision(id, parseInt(obtenirPosHautDivision(id)) + py));
} // fin deplacerDivisionDe(id, px, py)

// deplace la division specifiee vers les coordonnees specifiees
function deplacerDivisionVers(id, x, y) {
	return (modifierPosGaucheDivision(id, x)
		&& modifierPosHautDivision(id, y));
} // fin deplacerDivisionVers(id, x, y)

// modifie le code HTML contenu dans la division specifiee
function modifierCodeDivision(id, code) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (!code)
		code="";
	if (navigator.userAgent.toLowerCase().indexOf("mac")!=-1)
		code+="\n";
	if (dyna_w3) {
		ldiv.innerHTML="";
		ldiv.innerHTML=code;
	} else if (dyna_ie || dyna_op) {
		ldiv.innerHTML=code;
	} else if (dyna_nn) {
		ldiv.document.open();
		ldiv.document.write(code);
		ldiv.document.close();
	}
	return true;
} // fin modifierCodeDivision(id, code)

// modifie la couleur de fond de la division specifiee
function modifierCouleurFondDivision(id, couleur) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if ((!couleur) || (couleur==""))
		couleur="transparent";
	if (dyna_op)
		ldiv.style.background=couleur;
	else if (dyna_w3 || dyna_ie)
		ldiv.style.backgroundColor=couleur;
	else if (dyna_nn) {
		if (couleur.toLowerCase()=="transparent")
			ldiv.bgColor=null;
		else
			ldiv.bgColor=couleur;
	}
	return true;
} // fin modifierCouleurFondDivision(id, couleur)

// modifie les dimensions de la division specifiee
function modifierDimensionsDivision(id, largeur, hauteur) {
	return (modifierLargeurDivision(id, largeur)
		&& modifierHauteurDivision(id, hauteur));
} // fin modifierDimensionsDivision(id, largeur, hauteur)

// modifie la hauteur de la division specifiee
function modifierHauteurDivision(id, hauteur) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (isNaN(hauteur) || (hauteur<0))
		hauteur=0;
	if (dyna_w3)
		ldiv.style.height=hauteur;
	else if (dyna_ie || dyna_op)
		ldiv.style.pixelHeight=hauteur;
	else if (dyna_nn) {
		ldiv.document.height=hauteur;
		ldiv.clip.top=0;
		ldiv.clip.bottom=hauteur;
	}
	return true;
} // fin modifierHauteurDivision(id, hauteur)

// modifie l'image de fond de la division specifiee
function modifierImageFondDivision(id, image) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (dyna_w3 || dyna_ie || dyna_op) {
		if ((!image) || (image==""))
			ldiv.style.backgroundImage="url(null)";
		else
			ldiv.style.backgroundImage="url("+image+")";
	} else if (dyna_nn) {
		ldiv.background.src=image;
	}
	return true;
} // fin modifierImageFondDivision(id, image)

// modifie la largeur de la division specifiee
function modifierLargeurDivision(id, largeur) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (isNaN(largeur) || (largeur<0))
		largeur=0;
	if (dyna_w3)
		ldiv.style.width=largeur;
	else if (dyna_ie || dyna_op)
		ldiv.style.pixelWidth=largeur;
	else if (dyna_nn) {
		ldiv.document.width=largeur;
		ldiv.clip.left=0;
		ldiv.clip.right=largeur;
	}
	return true;
} // fin modifierLargeurDivision(id, largeur)

// modifie la position horizontale de la division specifiee
function modifierPosGaucheDivision(id, x) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (isNaN(x))
		x=0;
	if (dyna_w3)
		ldiv.style.left=x;
	else if (dyna_ie || dyna_op)
		ldiv.style.pixelLeft=x;
	else if (dyna_nn)
		ldiv.left=x;
	return true;
} // fin modifierPosGaucheDivision(id, x)

// modifie la position verticale de la division specifiee
function modifierPosHautDivision(id, y) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (isNaN(y))
		y=0;
	if (dyna_w3)
		ldiv.style.top=y;
	else if (dyna_ie || dyna_op)
		ldiv.style.pixelTop=y;
	else if (dyna_nn)
		ldiv.top=y;
	return true;
} // fin modifierPosHautDivision(id, y)

// modifie l'index de superposition de la division specifiee
function modifierZIndexDivision(id, z) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if ((isNaN(z)) || (parseInt(z)<0))
		z=0;
	if (dyna_w3 || dyna_ie || dyna_op)
		ldiv.style.zIndex=z;
	else if (dyna_nn)
		ldiv.zIndex=z;
	return true;
} // fin modifierZIndexDivision(id, z)

// rend visible la division specifiee
function montrerDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return false;
	if (dyna_w3 || dyna_ie || dyna_op)
		ldiv.style.visibility="visible";
	else if (dyna_nn)
		ldiv.visibility="show";
	return true;
} // fin montrerDivision(id)

// retourne la couleur de fond de la division specifiee
function obtenirCouleurFondDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return "";
	if (dyna_op)
		return ldiv.style.background;
	else if (dyna_w3 || dyna_ie)
		return ldiv.style.backgroundColor;
	else if (dyna_nn)
		return ldiv.bgColor;
} // fin obtenirCouleurFondDivision(id)

// retourne une référence sur la division d'identifiant spécifié
function obtenirDivision(id) {
	if (dyna_w3)
		return document.getElementById(id);
	else if (dyna_ie || dyna_op)
		return document.all[id];
	else if (dyna_nn)
		return dyna_obtenirDivNN4(document, id);
	return "";
} // fin obtenirDivision(id)

// retourne la hauteur de la division specifiee
// -- merci a Victor Lopes (victor3.lopes@voila.fr)
function obtenirHauteurDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return 0;
	if (dyna_w3) {
		var re = /\D/g;
		return parseInt((ldiv.style.height).replace(re, ''));
	} else if (dyna_ie || dyna_op)
		return parseInt(ldiv.style.pixelHeight);
	else if (dyna_nn)
		return parseInt(ldiv.clip.bottom);
} // fin obtenirHauteurDivision(id)

// retourne la hauteur de la zone de navigation
function obtenirHauteurZone() {
	if (self.innerHeight)
		return parseInt(self.innerHeight);
	else if (document.documentElement && document.documentElement.clientHeight)
		return parseInt(document.documentElement.clientHeight);
	else if (document.body)
		return parseInt(document.body.clientHeight);
	return 0;
} // fin obtenirHauteurZone()

// retourne l'URL de l'image de fond de la division specifiee
function obtenirImageFondDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return "";
	var img="";
	if (dyna_w3 || dyna_ie || dyna_op)
		img=ldiv.style.backgroundImage;
	else if (dyna_nn)
		img=ldiv.background.src;
	if (img.substring(0, 4)=="url(")
		img=img.substring(4, img.length-1);
	return img;
} // fin obtenirImageFondDivision(id)

// retourne la largeur de la division specifiee
// -- merci a Victor Lopes (victor3.lopes@voila.fr)
function obtenirLargeurDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return 0;
	if (dyna_w3) {
		var re = /\D/g;
		return parseInt((ldiv.style.width).replace(re, ''));
	} else if (dyna_ie || dyna_op)
		return parseInt(ldiv.style.pixelWidth);
	else if (dyna_nn)
		return parseInt(ldiv.clip.right);
} // fin obtenirLargeurDivision(id)

// retourne la largeur de la zone de navigation
function obtenirLargeurZone() {
	if (self.innerWidth)
		return parseInt(self.innerWidth);
	else if (document.documentElement && document.documentElement.clientWidth)
		return parseInt(document.documentElement.clientWidth);
	else if (document.body)
		return parseInt(document.body.clientWidth);
	return 0;
} // fin obtenirLargeurZone()

// retourne la position horizontale de la division specifiee
function obtenirPosGaucheDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return 0;
	if (dyna_w3) {
		var re = /\D/g;
		return parseInt((ldiv.style.left).replace(re, ''));
	} else if (dyna_ie || dyna_op)
		return parseInt(ldiv.style.pixelLeft);
	else if (dyna_nn)
		return parseInt(ldiv.left);
	return 0;
} // fin obtenirPosGaucheDivision(id)

// retourne la position verticale de la division specifiee
function obtenirPosHautDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return 0;
	if (dyna_w3) {
		var re = /\D/g;
		return parseInt((ldiv.style.top).replace(re, ''));
	} else if (dyna_ie || dyna_op)
		return parseInt(ldiv.style.pixelTop);
	else if (dyna_nn)
		return parseInt(ldiv.top);
} // fin obtenirPosHautDivision(id)

// retourne l'index de superposition de la division specifiee
function obtenirZIndexDivision(id) {
	var ldiv=obtenirDivision(id);
	if (!ldiv)
		return 0;
	if (dyna_w3 || dyna_ie || dyna_op)
		return parseInt(ldiv.style.zIndex);
	else if (dyna_nn)
		return parseInt(ldiv.zIndex);
} // fin obtenirZIndexDivision(id)
