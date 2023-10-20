/* medias.js
 * Role : insere un media audio ou video dans la page Web courante
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 14/09/2002
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// tableau des extensions
var medias_ext=new Array("class","swf","au,snd","mp2,mp3","aif,aiff,aifc",
	"wav","dus,cht","mid,midi","rm,ra,ram","rpm",
	"cmu,ras","fh4,fh5,fhc","gif","ief","jpg,jpe,jpeg",
	"tif,tiff","pnm","pbm","pgm","ppm",
	"rgb","xbm","xpm","xwd","mpg,mpe,mpeg",
	"qt,mov","wma,wmv,asf","avi,vfw","movie","wrl,vrml");

// tableau des types MIME
var medias_mim=new Array("application/octet-stream","application/x-shockwave-flash",
	"audio/basic","audio/mpeg","audio/x-aiff","audio/x-wav",
	"audio/x-dspeeh","audio/x-midi","audio/x-pn-realaudio","audio/x-pn-realaudio-plugin",
	"image/x-cmu-raster","image/x-freehand","image/gif","image/ief",
	"image/jpeg","image/tiff","image/x-portable-anymap","image/x-portable-bitmap",
	"image/x-portable-graymap","image/x-portable-pixmap","image/x-rgb",
	"image/x-xbitmap","image/x-xpixmap","image/x-xwindowdump","video/mpeg",
	"video/quicktime","video/x-ms-asf","video/x-msvideo","video/x-sgi-movie","x-world/x-vrml");

// --- Fonctions ---

// retourne la balise OBJECT adaptee au navigateur utilise
function medias_baliseObject(id, url, auto, largeur, hauteur, console) {
  var obt;
  obt="<OBJECT ";
	var agt=navigator.userAgent.toLowerCase();
	if ((agt.indexOf("msie")!=-1) && (agt.indexOf("opera")==-1)) {
    obt+="ID=\"" + id + "\" ";
    if (typeMIME(url).indexOf("quicktime")!=-1) {
      obt+="CLASSID=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" ";
      obt+="CODEBASE=\"http://www.apple.com/qtactivex/qtplugin.cab\" ";
    } else if (typeMIME(url).indexOf("realaudio")!=-1) {
      obt+="CLASSID=\"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA\" ";
      obt+="CODEBASE=\"http://???\" ";
    } else if (typeMIME(url).indexOf("shockwave")!=-1) {
      obt+="CLASSID=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" ";
      obt+="CODEBASE=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0\" ";
    } else {
      obt+="CLASSID=\"clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95\" ";
      obt+="CODEBASE=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,0,0,0\" ";
    }
    obt+="WIDTH=\"" + largeur + "\" HEIGHT=\"" + hauteur + "\" ALIGN=\"middle\">";
    if (typeMIME(url).indexOf("shockwave")!=-1) {
        obt+="<PARAM NAME=\"MOVIE\" VALUE=\"" + url + "\">";
        obt+="<PARAM NAME=\"QUALITY\" VALUE=\"high\">";
    } else { obt+="<PARAM NAME=\"SRC\" VALUE=\"" + url + "\">"; }
  } else {
    obt+="NAME=\"" + id + "\" DATA=\"" + url + "\" ";
    obt+="TYPE=\"" + typeMIME(url) + "\" ";
    obt+="WIDTH=\"" + largeur + "\" HEIGHT=\"" + hauteur + "\" ALIGN=\"middle\">";
  }
  if (auto) {
    obt+="<PARAM NAME=\"AUTOSTART\" VALUE=\"true\">";
    obt+="<PARAM NAME=\"AUTOPLAY\" VALUE=\"true\">";
  } else {
    obt+="<PARAM NAME=\"AUTOSTART\" VALUE=\"false\">";
    obt+="<PARAM NAME=\"AUTOPLAY\" VALUE=\"false\">";
  }
  obt+="<PARAM NAME=\"CONTROLLER\" VALUE=\"true\">";
  obt+="<PARAM NAME=\"CONSOLE\" VALUE=\"" + id + "\">";
  obt+="<PARAM NAME=\"CONTROLS\" VALUE=\"" + console + "\">";
  return(obt);
} // fin medias_baliseObject(id, url, auto, largeur, hauteur, console)

// insere un media audio
function insererAudio(id, url, auto, largeur, hauteur) {
  if ((!url) || (url=="")) { return false; }
  if (!auto) { auto=false; }
  if ((isNaN(largeur)) || (parseInt(largeur)<1)) { largeur=300; }
  if ((isNaN(hauteur)) || (parseInt(hauteur)<1)) { hauteur=45; }
  var txt;
  if (typeMIME(url).indexOf("realaudio")!=-1) {
    txt=medias_baliseObject(id, url, auto, largeur, hauteur, "ControlPanel");
  } else {
    txt=medias_baliseObject(id, url, auto, largeur, hauteur, "console");    
  }
  txt+="<EMBED NAME=\"" + id + "\" SRC=\"" + url + "\" ";
  txt+="TYPE=\"" + typeMIME(url) + "\" MASTERSOUND ";
  if (typeMIME(url).indexOf("quicktime")!=-1) {
    txt+="PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\" ";  
  } else if (typeMIME(url).indexOf("realaudio")==-1) {
    txt+="PLUGINSPAGE=\"http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin\" ";
  }
  txt+="WIDTH=\"" + largeur + "\" HEIGHT=\"" + hauteur + "\" ";
  txt+="HIDDEN=\"false\" ALIGN=\"middle\" ";
  if (auto) { txt+="AUTOSTART=\"true\" AUTOPLAY=\"true\" "; }
  else { txt+="AUTOSTART=\"false\" AUTOPLAY=\"false\" "; }
  txt+="CONTROLLER=\"true\" CONSOLE=\"" + id + "\" ";  
  if (typeMIME(url).indexOf("realaudio")!=-1) {
    txt+="CONTROLS=\"ControlPanel\">";
  } else {
    txt+="CONTROLS=\"console\">";
  }
  txt+="</OBJECT>";
  return(txt);
} // fin insererAudio(id, url, auto, largeur, hauteur)

// insere une animation Flash
function insererFlash(id, url, largeur, hauteur) {
  if ((!url) || (url=="")) { return false; }
  if ((isNaN(largeur)) || (parseInt(largeur)<1)) { largeur=300; }
  if ((isNaN(hauteur)) || (parseInt(hauteur)<1)) { hauteur=225; }
  var txt;
  txt=medias_baliseObject(id, url, true, largeur, hauteur, "");
  txt+="<EMBED NAME=\"" + id + "\" SRC=\"" + url + "\" QUALITY=\"high\" ";
  txt+="TYPE=\"" + typeMIME(url) + "\" ";
  txt+="PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\" ";
  txt+="WIDTH=\"" + largeur + "\" HEIGHT=\"" + hauteur + "\" ";
  txt+="HIDDEN=\"false\" ALIGN=\"middle\" ";
  txt+="AUTOSTART=\"true\" AUTOPLAY=\"true\" ";
  txt+="CONTROLLER=\"false\" CONSOLE=\"" + id + "\" CONTROLS=\"\">";
  txt+="</OBJECT>";
  return(txt);
} // fin insererFlash(id, url, largeur, hauteur)

// insere un media video
function insererVideo(id, url, auto, largeur, hauteur) {
  if ((!url) || (url=="")) { return false; }
  if (!auto) { auto=false; }
  if ((isNaN(largeur)) || (parseInt(largeur)<1)) { largeur=300; }
  if ((isNaN(hauteur)) || (parseInt(hauteur)<1)) { hauteur=270; }
  var txt;
  if (typeMIME(url).indexOf("realaudio")!=-1) {
    txt=medias_baliseObject(id, url, auto, largeur, hauteur, "ImageWindow,ControlPanel");
  } else {
    txt=medias_baliseObject(id, url, auto, largeur, hauteur, "console");    
  }
  txt+="<EMBED NAME=\"" + id + "\" SRC=\"" + url + "\" ";
  txt+="TYPE=\"" + typeMIME(url) + "\" MASTERSOUND ";
  if (typeMIME(url).indexOf("quicktime")!=-1) {
    txt+="PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\" ";  
  } else if (typeMIME(url).indexOf("realaudio")==-1) {
    txt+="PLUGINSPAGE=\"http://www.microsoft.com/isapi/redir.dll?prd=windows&sbp=mediaplayer&ar=Media&sba=Plugin\" ";
  }
  txt+="WIDTH=\"" + largeur + "\" HEIGHT=\"" + hauteur + "\" ";
  txt+="HIDDEN=\"false\" ALIGN=\"middle\" ";
  if (auto) { txt+="AUTOSTART=\"true\" AUTOPLAY=\"true\" "; }
  else { txt+="AUTOSTART=\"false\" AUTOPLAY=\"false\" "; }
  txt+="CONTROLLER=\"true\" CONSOLE=\"" + id + "\" ";  
  if (typeMIME(url).indexOf("realaudio")!=-1) {
    txt+="CONTROLS=\"ImageWindow,ControlPanel\">";
  } else {
    txt+="CONTROLS=\"console\">";
  }
  txt+="</OBJECT>";
  return(txt);
} // fin insererVideo(id, url, auto, largeur, hauteur)

// retourne le type MIME du fichier d'URL specifiee
function typeMIME(url) {
  if ((!url) || (url=="")) { return ("inconnu"); }
  var xts;
  var tab;
  if (url.indexOf("?") > 0)
  	xts = url.substring(0, url.indexOf("?"));
  else
  	xts = url;
  xts = (xts.substring(xts.lastIndexOf(".")+1)).toLowerCase();
  if (xts.indexOf(" ")!=-1)
    xts=xts.substring(0, xts.indexOf(" "));
  for(var i=0; i<medias_ext.length; i++) {
    tab=medias_ext[i].split(',');
    for(var j=0; j<tab.length; j++) {
      if (tab[j]==xts) return (medias_mim[i]);
    }
  }
  return ("application/octet-stream");
} // fin typeMIME(url)
