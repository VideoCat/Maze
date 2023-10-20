/* forms.js
 * Role : formate, controle et recupere le contenu des formulaires
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 02/05/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// variables pour les parametres de l'URL
var forms_cle;
var forms_val;

// recupere les parametres de l'URL
if (window.location.search && (window.location.search.indexOf("=")>1)) {
	var fpar=(window.location.search.substring(1, window.location.search.length)).split("&");
	forms_cle=new Array(fpar.length);
	forms_val=new Array(fpar.length);
	for (var i=0; i<fpar.length; i++) {
		forms_cle[i]=fpar[i].substring(0, fpar[i].indexOf("="));
		forms_cle[i]=unescape((forms_cle[i].split("+")).join(" "));
		forms_val[i]=fpar[i].substring(fpar[i].indexOf("=")+1, fpar[i].length);
		forms_val[i]=unescape((forms_val[i].split("+")).join(" "));
	}
}

// --- Fonctions ---

// supprime les espaces qui commencent ou qui terminent la chaine specifiee
function forms_suppEsp(chaine) {
	var fdeb;
	var ffin;
	fdeb=chaine;
	ffin=chaine;
	for(var i=0; ((i<fdeb.length) && (fdeb.charAt(i)==' ')); i++) {
		ffin=ffin.substring(1, ffin.length);
	}
	fdeb=ffin;
	for(var i=fdeb.length-1; ((i>=0) && (fdeb.charAt(i)==' ')); i--)
		ffin=ffin.substring(0, ffin.length-1);
	return (ffin);
} // fin forms_suppEsp(chaine)

// verifie que le formulaire specifie est rempli puis l'expedie
function envoyerFormulaire(formulaire) {
	for (var i=0; i<formulaire.elements.length; i++) {
		if (formulaire.elements[i].type.substring(0, 4)=="sele") {
			if (!verifierPresence(formulaire.elements[i].options[formulaire.elements[i].selectedIndex].value)) {
				alert("Veuillez choisir une valeur dans la liste \""+formulaire.elements[i].name+"\".");
				formulaire.elements[i].focus();
				return false;
			}
		}
		if (formulaire.elements[i].type.substring(0, 4)=="text") {
			if (!verifierPresence(formulaire.elements[i].value)) {
				alert("Veuillez saisir une valeur dans le champ \""+formulaire.elements[i].name+"\".");
				formulaire.elements[i].focus();
				return false;
			}
		}
	}
	formulaire.submit();
	return true;
} // fin envoyerFormulaire(formulaire)

// formate le contenu d'un champ de formulaire de type "Email"
function formaterChampEmail(champ) {
	var femail;
	femail=champ.value;
	femail=femail.split('<').join('');
	femail=femail.split('>').join('');
	femail=femail.split('"').join('');
	femail=femail.split(' ').join('');
	champ.value=femail;
	return true;
} // fin formaterChampEmail(champ)

// formate le contenu d'un champ de formulaire de type "Nom"
function formaterChampNom(champ) {
	var fnom;
	var fpos;
	fnom=forms_suppEsp(champ.value);
	for(var i=0; i<fnom.length-1; i++) {
		while ((fnom.charAt(i)==' ') && (fnom.charAt(i+1)==' ')) {
			fnom=fnom.substring(0, i)
				+fnom.substring(i+1, fnom.length);
		}
	}
	fnom=fnom.substring(0, 1).toUpperCase()
		+fnom.substring(1, fnom.length).toLowerCase();
	for(var i=0; i<fnom.length-1; i++) {
		if ((fnom.charAt(i)=='-') || (fnom.charAt(i)==' ')) {
			fnom=fnom.substring(0, i)+fnom.charAt(i)
			 +fnom.substring(i+1, i+2).toUpperCase()
			 +fnom.substring(i+2, fnom.length);
		}
	}
	champ.value=fnom;
	return true;
} // fin formaterChampNom(champ)

// formate les parametres contenus dans l'URL de la page
function formaterParametres() {
	if (!window.location.search) { return ""; }
	var ftxt="<TABLE SUMMARY='parametres'>";
	for (var i=0; i<forms_cle.length; i++) {
		ftxt+="<TR><TD VALIGN='TOP'><B>" + forms_cle[i] + " :</B></TD>";
		ftxt+="<TD VALIGN='TOP'>" + forms_val[i] + "</TD></TR>";
	}
	ftxt+="</TABLE>";
	return (ftxt);
} // fin formaterParametres()

// retourne le nombre de parametres contenus dans l'URL de la page
function nombreParametres() {
	if (window.location.search && (window.location.search.indexOf("=")>1)) {
		return (forms_cle.length);
	} else {
		return (0);
	}
} // fin nombreParametres()

// retourne la valeur du parametre correspondant a la cle indiquee
function valeurParametre(cle) {
	if (window.location.search) {
		for (var i=0; i<forms_cle.length; i++) {
			if (forms_cle[i]==forms_suppEsp(cle)) return (forms_val[i]);
		}
	}
	return ("");
} // fin valeurParametre(cle)

// verifie que l'adresse e-mail specifiee est valide
function verifierEmail(email) {
	var fadr;
	var fnom;
	var farob;
	var fdom;
	var fpoint;
	var fext;
	if (!verifierPresence(email)) { return false; }
	fadr=forms_suppEsp(email);
	farob=fadr.lastIndexOf("@");
	if (farob!=fadr.indexOf("@")) { return false; }
	fnom=fadr.substring(0, farob);
	if (fnom.length<1) { return false; }
	fpoint=fadr.lastIndexOf(".");
	if (fpoint<farob) { return false; }
	fext=fadr.substring(fpoint+1, fadr.length);
	if (fext.length<2) { return false; }
	fdom=fadr.substring(farob+1, fpoint);
	if (fdom.length<2) { return false; }
	return true;
} // fin verifierEmail(email)

// verifie que la chaine specifiee n'est pas vide
function verifierPresence(chaine) {
	if (forms_suppEsp(chaine).length>0) { return true; }
	else { return false; }
} // fin verifierPresence(chaine)
