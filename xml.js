/* xml.js
 * Role : charge un fichier XML et permet d'acceder aux donnees qu'il contient
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 20/08/2004
 * Mise a jour : 12/12/2007
 * Bogues connues : - Opera 7 ignore les commentaires du fichier XML
 */

// --- Variables globales ---

// chargement du fichier XML
var xml_charge=false;
var xml_doc;

// --- Fonctions ---

// supprime les espaces qui commencent ou qui terminent la chaine specifiee
function xml_suppEsp(chaine) {
	var xdeb;
	var xfin;
	xdeb=chaine;
	xfin=chaine;
	for(var i=0; ((i<xdeb.length) && (xdeb.charAt(i)==' ')); i++) {
		xfin=xfin.substring(1, xfin.length);
	}
	xdeb=xfin;
	for(var i=xdeb.length-1; ((i>=0) && (xdeb.charAt(i)==' ')); i--)
		xfin=xfin.substring(0, xfin.length-1);
	return (xfin);
} // fin forms_suppEsp(chaine)

// indique si le navigateur accepte le XML
function accepteXML() {
  return ((document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XML", "1.0"))
    || (document.implementation && document.implementation.createDocument)
    || (window.XMLHttpRequest)
    || (window.ActiveXObject)
    || (document.createElement && document.childNodes));
} // fin accepteXML()

// charge en memoire le fichier XML d'URL specifiee
function chargerFichierXML(url) {
  if ((!url) || (url=="")) return false;
  xml_charge=false;
  try {
    // implementation conforme au DOM du W3C (Firefox, Mozilla, Netscape)
    if (document.implementation && document.implementation.createDocument) {
      xml_doc=document.implementation.createDocument("", "", null);
      xml_doc.onload=function () { xml_charge=true; }
      xml_doc.load(url);
    // implementation avec objet XMLHttpRequest
    } else if (window.XMLHttpRequest) {
      xml_doc=new XMLHttpRequest();
      xml_doc.onreadystatechange=function () { if (xml_doc.readyState==4) xml_charge=true; }
      xml_doc.open("GET", url, true);
      xml_doc.send(null);
    // implementation avec ActiveX (Internet Explorer)
    } else if (window.ActiveXObject) {
      xml_doc=new ActiveXObject("Microsoft.XMLDOM");
      xml_doc.onreadystatechange=function () { if (xml_doc.readyState==4) xml_charge=true; }
      xml_doc.load(url);
    // implementation avec un objet IFRAME et une division cachee (Opera 7)
    } else if (document.createElement && document.childNodes) {
      var ndiv=document.createElement("DIV");
      ndiv.id="jslib_xml_div";
      ndiv.style.position="absolute";
      ndiv.style.visibility="hidden";
      ndiv.innerHTML = "<iframe onLoad=\"xml_doc=window.frames.jslib_xml_ifr.window.document; xml_charge=true;\""
        + " name=\"jslib_xml_ifr\" src=\"" + url + "\"><\/iframe>";
      document.body.appendChild(ndiv);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
} // fin chargerFichierXML(url)

// compte le nombre de noeuds XML de nom specifie
function compterNoeuds(nomNoeud) {
  if (!xml_charge) return 0;
  if ((!nomNoeud) || (nomNoeud=="")) return 0;
  var elts=xml_doc.getElementsByTagName(nomNoeud);
  return (parseInt(elts.length));
} // fin compterNoeuds(nomNoeud)

// retourne les commentaires du document XML
function obtenirCommentaires() {
  if (!xml_charge) return "";
  var elts=xml_doc.childNodes;
  var txt="";
  if (elts.length<1) return txt;
  for (var i=0; i<elts.length; i++) {
    if (parseInt(elts[i].nodeType)==8) {
      if (txt!="") txt+="\n";
      txt+=xml_suppEsp(elts[i].nodeValue);
    }
  }
  return txt;
} // fin obtenirCommentaires()

// retourne le premier noeud XML de nom et de valeur specifies
function obtenirNoeud(nomNoeud, valeurNoeud) {
  if (!xml_charge) return;
  if ((!nomNoeud) || (nomNoeud=="")) return;
  var elts=xml_doc.getElementsByTagName(nomNoeud);
  if (elts.length<1) return;
  for (var i=0; i<elts.length; i++) {
    if (parseInt(elts[i].nodeType)==1) {
      if ((!valeurNoeud) || (obtenirValeurNoeud(elts[i])==valeurNoeud))
        return (elts[i]);
    }
  }
  return;
} // fin obtenirNoeud(nomNoeud, valeurNoeud)

// retourne le noeud fils de nom specifie du noeud XML passe en parametre
function obtenirNoeudFils(noeud, nomFils) {
  if (!xml_charge) return;
  if (!noeud) return;
  if ((!nomFils) || (nomFils=="")) return;
  var elts=noeud.childNodes;
  if (elts.length<1) return;
  for (var i=0; i<elts.length; i++) {
    if ((parseInt(elts[i].nodeType)==1)
      && (obtenirNomNoeud(elts[i])==nomFils))
      return elts[i];
  }
  return;
} // fin obtenirNoeudFils(noeud, nomFils)

// retourne le noeud pere du noeud XML passe en parametre
function obtenirNoeudPere(noeud) {
  if (!xml_charge) return;
  if (!noeud) return;
  if (noeud.parentNode) return (noeud.parentNode);
  return;
} // fin obtenirNoeudPere(noeud)

// retourne le noeud XML racine du document XML
function obtenirNoeudRacine() {
  if (!xml_charge) return;
  var elts=xml_doc.childNodes;
  if (elts.length<1) return;
  for (var i=0; i<elts.length; i++) {
    if (parseInt(elts[i].nodeType)==1)
      return(elts[i]);
  }
  return;
} // fin obtenirNoeudRacine()

// retourne le nom du noeud XML passe en parametre
function obtenirNomNoeud(noeud) {
  if (!xml_charge) return "";
  if (!noeud) return "";
  if (noeud.nodeName) return (noeud.nodeName);
  if (noeud.name) return (noeud.name);
  return "";
} // fin obtenirNomNoeud(noeud)

// retourne la valeur de l'attribut specifie du noeud XML passe en parametre
function obtenirValeurAttribut(noeud, attribut) {
  if (!xml_charge) return "";
  if (!noeud) return "";
  if ((!attribut) || (attribut=="")) return "";
  if (noeud.getAttribute(attribut)) return noeud.getAttribute(attribut);
  if (noeud.attributes[attribut]) return noeud.attributes[attribut].value;
  return "";
} // fin obtenirValeurAttribut(noeud, attribut)

// retourne la valeur du noeud XML passe en parametre
function obtenirValeurNoeud(noeud) {
  if (!xml_charge) return "";
  if ((!noeud) || (!noeud.firstChild)) return "";
  if (noeud.firstChild.nodeValue) return (xml_suppEsp(noeud.firstChild.nodeValue));
  if (noeud.firstChild.data) return (xml_suppEsp(noeud.firstChild.data));
  return "";
} // fin obtenirValeurNoeud(noeud)

// retourne le premier noeud XML dont la valeur contient la chaine specifiee
function rechercherNoeud(nomNoeud, valeurNoeud) {
  if (!xml_charge) return;
  if ((!nomNoeud) || (nomNoeud=="")) return;
  if (!valeurNoeud) valeurNoeud="";
  var elts=xml_doc.getElementsByTagName(nomNoeud);
  if (elts.length<1) return;
  for (var i=0; i<elts.length; i++) {
    if (parseInt(elts[i].nodeType)==1) {
      if (obtenirValeurNoeud(elts[i]).toLowerCase().indexOf(valeurNoeud.toLowerCase())>=0)
        return (elts[i]);
    }
  }
  return;
} // fin rechercherNoeud(nomNoeud, valeurNoeud)

// retourne le premier noeud XML dont l'attribut specifie contient la chaine specifiee
function rechercherNoeudParAttribut(nomNoeud, attribut, valeurAttribut) {
  if (!xml_charge) return;
  if ((!nomNoeud) || (nomNoeud=="")) return;
  if ((!attribut) || (attribut=="")) return;
  if (!valeurAttribut) valeurAttribut="";
  var elts=xml_doc.getElementsByTagName(nomNoeud);
  if (elts.length<1) return;
  for (var i=0; i<elts.length; i++) {
    if (parseInt(elts[i].nodeType)==1) {
      if (obtenirValeurAttribut(elts[i], attribut).toLowerCase().indexOf(valeurAttribut.toLowerCase())>=0)
        return (elts[i]);
    }
  }
  return;
} // fin rechercherNoeudParAttribut(nomNoeud, attribut, valeurAttribut)

// verifie que le fichier XML est totalement charge en memoire
function verifierChargementXML() {
  return (xml_charge);
} // fin verifierChargementXML()
