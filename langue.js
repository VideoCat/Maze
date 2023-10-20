/* langue.js
 * Role : detecte la langue du navigateur du client
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 10/04/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// tableau des codes ISO
var langue_tabct=new Array("aa","ab","af","am","ar","as","ay","az","ba","be",
	"bg","bh","bi","bn","bo","br","ca","co","cs","cy",
	"da","de","dz","el","en","eo","es","et","eu","fa",
	"fi","fj","fo","fr","fy","ga","gd","gl","gn","gu",
	"gv","ha","he","hi","hr","hu","hy","ia","id","ie",
	"ik","is","it","iu","ja","jw","ka","kk","kl","km",
	"kn","ko","ks","ku","kw","ky","la","lb","ln","lo",
	"lt","lv","mg","mi","mk","ml","mn","mo","mr","ms",
	"mt","my","na","ne","nl","no","oc","om","or","pa",
	"pl","ps","pt","qu","rm","rn","ro","ru","rw","sa",
	"sd","se","sg","sh","si","sk","sl","sm","sn","so",
	"sq","sr","ss","st","su","sv","sw","ta","te","tg",
	"th","ti","tk","tl","tn","to","tr","ts","tt","tw",
	"ug","uk","ur","uz","vi","vo","wo","xh","yi","yo",
	"za","zh","zu");

// tableau des langues en francais
var langue_tablg=new Array("Afar","Abkhaze","Afrikaans","Amharique","Arabe",
	"Assamais","Aymara","Az&eacute;ri","Bachkir","Bi&eacute;lorusse",
	"Bulgare","Bihari","B&ecirc;che-De-Mer","Bengali","Tib&eacute;tain",
	"Breton","Catalan","Corse","Tch&egrave;que","Gallois",
	"Danois","Allemand","Boutani","Grec","Anglais",
	"Esp&eacute;ranto","Espagnol","Estonien","Basque","Persan",
	"Finnois","Fidjien","F&eacute;ro&iuml;en","Fran&ccedil;ais","Frison",
	"Ga&eacute;lique Irlandais","Ga&eacute;lique &Eacute;cossais","Galicien","Guarani","Goudjarati",
	"Ga&eacute;lique de l'&Icirc;le de Man","Haoussa","H&eacute;breu","Hindi","Croate",
	"Hongrois","Arm&eacute;nien","Interlingua","Indon&eacute;sien","Interlingue",
	"Inupiak","Islandais","Italien","Inuktitut","Japonais",
	"Javanais","G&eacute;orgien","Kazakh","Groenlandais","Cambodgien",
	"Kannada","Cor&eacute;en","Cachemiri","Kurde","Cornique",
	"Kirghiz","Latin","Luxembourgeois","Lingala","Lao",
	"Lithuanien","Letton","Malgache","Maori","Mac&eacute;donien",
	"Malayalam","Mongol","Moldave","Marathe","Malais",
	"Maltais","Birman","Nauri","N&eacute;palais","N&eacute;erlandais",
	"Norv&eacute;gien","Occitan","Oromo","Oriya","Pendjabi",
	"Polonais","Pachto","Portuguais","Quechua","Rh&eacute;to-Roman",
	"Roundi","Roumain","Russe","Rouanda","Sanscrit",
	"Sindhi","S&aacute;mi Du Nord","Sango","Serbo-Croate","Cingalais",
	"Slovaque","Slov&egrave;ne","Samoan","Chona","Somali",
	"Albanais","Serbe","Siswati","Sotho Du Sud","Soundanais",
	"Su&eacute;dois","Souah&eacute;li","Tamoul","T&eacute;lougou","Tadjik",
	"Tha&iuml;","Tigrigna","Turkm&egrave;ne","Tagal","Setchwana",
	"Kitonga","Turc","Tsonga","Tatar","Tchi",
	"Ou&iuml;gour","Ukrainien","Ourdou","Ouzbek","Vietnamien",
	"Volap&uuml;k","Ouolof","Xhosa","Yidich","Yorouba",
	"Tchouang","Chinois","Zoulou");

// --- Fonctions ---

// retourne le code ISO de la langue du navigateur
function obtenirCodeLangueNavig() {
	var lct="en";
	if (navigator.language) {
		lct=navigator.language.toLowerCase().substring(0, 2);
	} else if (navigator.userLanguage) {
		lct=navigator.userLanguage.toLowerCase().substring(0, 2);
	} else if (navigator.userAgent.indexOf("[")!=-1) {
		var debut=navigator.userAgent.indexOf("[");
		var fin=navigator.userAgent.indexOf("]");
		lct=navigator.userAgent.substring(debut+1, fin).toLowerCase();
	}
	return lct;
} // fin obtenirCodeLangueNavig()

// retourne la langue en francais correspondant au code de langue specifie
function obtenirLangue(code) {
	if ((!code) || (code.length<2))
		return "";
	code=code.toLowerCase().substring(0, 2);
	for (var i=0; i<langue_tabct.length; i++) {
		if (langue_tabct[i]==code)
			return(langue_tablg[i]);
	}
	return "";
} // fin obtenirLangue(code)

// retourne la langue du navigateur en francais
function obtenirLangueNavig() {
	return (obtenirLangue(obtenirCodeLangueNavig()));
} // fin obtenirLangueNavig()
