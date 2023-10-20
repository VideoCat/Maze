/* liens.js
 * Role : insere dans la page Web un lien sur un texte, un bouton ou une image
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 30/04/2001
 * Mise a jour : 12/12/2007
 * Bogues connues : - Opera remplace les commentaires des liens par leurs URLs
 */

// --- Variables globales ---

// variables communes
var liens_cpt=0;

// --- Fonctions ---

// retourne une adresse e-mail partiellement encodée
function formaterMailtoAntiSpam(nom_email, domaine_email) {
	return(nom_email + "%40" + domaine_email);	
} // fin formaterMailtoAntiSpam(nom_email, domaine_email)

// insere un lien vers une adresse e-mail sur un bouton
function lienBoutonEmail(texte, nom_email, domaine_email, sujet, commentaire) {
	if (!sujet) { sujet=""; }
	if (!commentaire) { commentaire=""; }
  var lcode="<FORM><INPUT TYPE=\"button\" VALUE=\""+texte+"\" onClick=\"window.location.href='mailto:";
  lcode+=formaterMailtoAntiSpam(nom_email, domaine_email);
  lcode+="?subject="+sujet+"';\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\"></FORM>";
  return(lcode);
} // fin lienBoutonEmail(texte, nom_email, domaine_email, sujet, commentaire)

// insere un lien vers une page Web sur un bouton
function lienBoutonWeb(texte, url, cible, commentaire) {
  var ldest;
  if (!url) { url="about:blank"; }
  if (!cible) { cible="_self"; }
  if (!commentaire) { commentaire=""; }
  if (cible=="_self") { ldest="self.location.href='"+url+"'"; }
  else if (cible=="_parent") { ldest="parent.location.href='"+url+"'"; }
  else if (cible=="_top") { ldest="top.location.href='"+url+"'"; }
  else { ldest="window.open('"+url+"', '"+cible+"')"; }
  var lcode="<FORM><INPUT TYPE=\"button\" VALUE=\""+texte+"\" onClick=\""+ldest;
  lcode+=";\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\"></FORM>";
  return(lcode);
} // fin lienBoutonWeb(texte, url, cible, commentaire)

// insere un lien vers vers une adresse e-mail sur une image dynamique
function lienDynaEmail(imageOut, imageOver, nom_email, domaine_email, sujet, commentaire) {
  if (!sujet) { sujet=""; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\"mailto:";
  lcode+=formaterMailtoAntiSpam(nom_email, domaine_email);
  lcode+="?subject="+sujet+"\" onMouseOver=\"liens_image"+liens_cpt;
  lcode+=".src='"+imageOver+"'; window.status='"+commentaire+"'; return true;\" ";
  lcode+=" onMouseOut=\"liens_image"+liens_cpt+".src='"+imageOut+"'; window.status=''; return true;\">";
  lcode+="<IMG NAME=\"liens_image"+liens_cpt+"\" SRC=\""+imageOut+"\" BORDER=0 ALIGN=MIDDLE ";
  lcode+="ALT=\""+commentaire+"\" ";  
  lcode+="onLoad=\"liens_image_temp=new Image(0,0); liens_image_temp.src='"+imageOver+"'; return true;\"></A>";
  liens_cpt=parseInt(liens_cpt)+1;
  return (lcode);
} // fin lienDynaEmail(imageOut, imageOver, nom_email, domaine_email, sujet, commentaire)

// insere un lien vers une page Web sur une image dynamique
function lienDynaWeb(imageOut, imageOver, url, cible, commentaire) {
  if (!url) { url="about:blank"; }
  if (!cible) { cible="_self"; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\""+url+"\" TARGET=\""+cible+"\" onMouseOver=\"liens_image"+liens_cpt;
  lcode+=".src='"+imageOver+"'; window.status='"+commentaire+"'; return true;\" ";
  lcode+=" onMouseOut=\"liens_image"+liens_cpt+".src='"+imageOut+"'; window.status=''; return true;\">";
  lcode+="<IMG NAME=\"liens_image"+liens_cpt+"\" SRC=\""+imageOut+"\" BORDER=0 ALIGN=MIDDLE ";
  lcode+="ALT=\""+commentaire+"\" ";
  lcode+="onLoad=\"liens_image_temp=new Image(0,0); liens_image_temp.src='"+imageOver+"'; return true;\"></A>";
  liens_cpt=parseInt(liens_cpt)+1;
  return(lcode);
} // fin lienDynaWeb(imageOut, imageOver, url, cible, commentaire)

// insere un lien vers une adresse e-mail sur une image
function lienImageEmail(image, nom_email, domaine_email, sujet, commentaire) {
  if (!sujet) { sujet=""; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\"mailto:";
  lcode+=formaterMailtoAntiSpam(nom_email, domaine_email);
  lcode+="?subject="+sujet+"\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\">";
  lcode+="<IMG SRC=\""+image+"\" BORDER=0 ALIGN=MIDDLE ALT=\""+commentaire+"\"></A>";
  return(lcode);
} // fin lienImageEmail(image, nom_email, domaine_email, sujet, commentaire)

// insere un lien vers une page Web sur une image
function lienImageWeb(image, url, cible, commentaire) {
  if (!url) { url="about:blank"; }
  if (!cible) { cible="_self"; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\""+url+"\" TARGET=\""+cible+"\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\">";
  lcode+="<IMG SRC=\""+image+"\" BORDER=0 ALIGN=MIDDLE ALT=\""+commentaire+"\"></A>";
  return(lcode);
} // fin lienImageWeb(image, url, cible, commentaire)

// insere un lien vers une adresse e-mail sur un texte
function lienTexteEmail(texte, nom_email, domaine_email, sujet, commentaire) {
  if (!sujet) { sujet=""; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\"mailto:";
  lcode+=formaterMailtoAntiSpam(nom_email, domaine_email);
  lcode+="?subject="+sujet+"\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\">"+texte+"</A>";
  return(lcode);
} // fin lienTexteEmail(texte, nom_email, domaine_email, sujet, commentaire)

// insere un lien vers une page Web sur un texte
function lienTexteWeb(texte, url, cible, commentaire) {
  if (!url) { url="about:blank"; }
  if (!cible) { cible="_self"; }
  if (!commentaire) { commentaire=""; }
  var lcode="<A HREF=\""+url+"\" TARGET=\""+cible+"\" onMouseOver=\"window.status='"+commentaire;
  lcode+="'; return true;\" onMouseOut=\"window.status=''; return true;\">"+texte+"</A>";
  return(lcode);
} // fin lienTexteWeb(texte, url, cible, commentaire)
