/* images.js
 * Role : controle le chargement et l'affichage des images
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 15/02/2005
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// gestion des images
var imgs_ids=new Array(100);
var imgs_obj=new Array(100);
var imgs_cpt=0;

// --- Fonctions ---

// charge en memoire l'image d'URL specifiee
function chargerImage(idImage, url) {
  if ((!idImage) || (idImage=="")) return false;
  if ((!url) || (url=="")) return false;
	for (var i=0; i<imgs_cpt; i++) {
		if (imgs_ids[i]==idImage) {
      imgs_obj[i]=new Image();
      imgs_obj[i].name=idImage;
      imgs_obj[i].src=url;
			return true;
		}
	}		
  imgs_ids[imgs_cpt]=idImage;
  imgs_obj[imgs_cpt]=new Image();
  imgs_obj[imgs_cpt].name=idImage;
  imgs_obj[imgs_cpt].src=url;
	imgs_cpt=imgs_cpt+1;
	return true;
} // fin chargerImage(idImage, url)

// retourne l'URL de l'image specifiee
function obtenirURLImage(idImage) {
  if ((!idImage) || (idImage=="")) return "";
	for (var i=0; i<imgs_cpt; i++) {
		if (imgs_ids[i]==idImage)
      return (imgs_obj[i].src);
	}
	return "";
} // fin obtenirURLImage(idImage)

// ouvre l'image specifiee dans une fenetre de type popup
function ouvrirImageDansPopup(idImage, commentaire) {
  var imgl=250;
  var imgh=150;
  if ((!idImage) || (idImage=="")) return false;
  if (!commentaire)
    commentaire=idImage;
	for (var i=0; i<imgs_cpt; i++) {
		if ((imgs_ids[i]==idImage) && ((imgs_obj[i].complete) || (parseInt(imgs_obj[i].width) > 0))) {
      imgl=parseInt(imgs_obj[i].width);
      imgh=parseInt(imgs_obj[i].height);
      while ((imgl > screen.width-20) || (imgh > screen.height-20)) {
        imgl=parseInt(imgl*0.8);
        imgh=parseInt(imgh*0.8);
      }
      var fprp="left="+Math.floor((screen.width-imgl)/2)+",top="+Math.floor((screen.height-(imgh+40))/2);
      fprp+=",width="+imgl+",height="+imgh+",status=0,directories=0,toolbar=0";
      fprp+=",location=0,menubar=0,scrollbars=0,resizable=0";
      var ftxt="<HTML><HEAD><TITLE>"+commentaire;
      ftxt+="</TITLE></HEAD><BODY>";
      ftxt+="<DIV STYLE='position:absolute;visibility:visible;left:0px;top:0px;'>";
      ftxt+="<IMG SRC='"+imgs_obj[i].src;
      ftxt+="' WIDTH='"+imgl;
      ftxt+="' HEIGHT='"+imgh;
      ftxt+="' ALT='"+commentaire;
      ftxt+="' /></DIV></BODY></HTML>";
      var fnew=window.open("about:blank", idImage, fprp);
			fnew.document.open();
			fnew.document.write(ftxt);
			fnew.document.close();
      if (window.focus)
        fnew.focus();
      return true;
		}
	}
	return false;
}	// fin ouvrirImageDansPopup(idImage)

// verifie que l'image specifiee est correctement chargee
function verifierChargementImage(idImage) {
  if ((!idImage) || (idImage=="")) return false;
	for (var i=0; i<imgs_cpt; i++) {
		if (imgs_ids[i]==idImage)
      return ((imgs_obj[i].complete) || (parseInt(imgs_obj[i].width) > 0));
	}
	return false;
} // fin verifierChargementImage(idImage)
