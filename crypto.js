/* crypto.js
 * Role : chiffre/dechiffre (AES) et controle l'integrite (MD5) des donnees
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 21/03/2002
 * Mise a jour : 12/12/2007
 *
 * Algorithme MD5 base sur :
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (c) 1999-2002 Paul Johnston 
 *
 * Algorithme AES base sur :
 * Rijndael Reference Implementation
 * Copyright (c) 2001 Fritz Schneider, San Diego, CA, USA
 */

// --- Variables globales ---

// taille de la cle et des blocs pour AES
var crypto_tcle=128;
var crypto_tblocs=128;

// nombre de rotations
var crypto_rArray=[ ,,,,[,,,,10,, 12,, 14],,
						[,,,,12,, 12,, 14],,
						[,,,,14,, 14,, 14] ];

// nombre d'octets pour le decalage
var crypto_sOffsets=[ ,,,,[,1, 2, 3],,[,1, 2, 3],,[,1, 3, 4] ];

// parametres de l'algorithme
var crypto_Nk=crypto_tcle/32;
var crypto_Nb=crypto_tblocs/32;
var crypto_Nr=crypto_rArray[crypto_Nk][crypto_Nb];

// constantes pour les rotations
var crypto_Rcon=[
0x01, 0x02, 0x04, 0x08, 0x10, 0x20,
0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc,
0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4,
0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91 ];

// table de recherche pour la SBox
var crypto_SBox=[
 99, 124, 119, 123, 242, 107, 111, 197,  48,   1, 103,  43, 254, 215, 171,
118, 202, 130, 201, 125, 250,  89,  71, 240, 173, 212, 162, 175, 156, 164,
114, 192, 183, 253, 147,  38,  54,  63, 247, 204,  52, 165, 229, 241, 113,
216,  49,  21,   4, 199,  35, 195,  24, 150,   5, 154,   7,  18, 128, 226,
235,  39, 178, 117,   9, 131,  44,  26,  27, 110,  90, 160,  82,  59, 214,
179,  41, 227,  47, 132,  83, 209,   0, 237,  32, 252, 177,  91, 106, 203,
190,  57,  74,  76,  88, 207, 208, 239, 170, 251,  67,  77,  51, 133,  69,
249,   2, 127,  80,  60, 159, 168,  81, 163,  64, 143, 146, 157,  56, 245,
188, 182, 218,  33,  16, 255, 243, 210, 205,  12,  19, 236,  95, 151,  68,
23,  196, 167, 126,  61, 100,  93,  25, 115,  96, 129,  79, 220,  34,  42,
144, 136,  70, 238, 184,  20, 222,  94,  11, 219, 224,  50,  58,  10,  73,
  6,  36,  92, 194, 211, 172,  98, 145, 149, 228, 121, 231, 200,  55, 109,
141, 213,  78, 169, 108,  86, 244, 234, 101, 122, 174,   8, 186, 120,  37,
 46,  28, 166, 180, 198, 232, 221, 116,  31,  75, 189, 139, 138, 112,  62,
181, 102,  72,   3, 246,  14,  97,  53,  87, 185, 134, 193,  29, 158, 225,
248, 152,  17, 105, 217, 142, 148, 155,  30, 135, 233, 206,  85,  40, 223,
140, 161, 137,  13, 191, 230,  66, 104,  65, 153,  45,  15, 176,  84, 187,
 22 ];

// table de recherche pour la SBox inverse
var crypto_SBoxInv=[
 82,   9, 106, 213,  48,  54, 165,  56, 191,  64, 163, 158, 129, 243, 215,
251, 124, 227,  57, 130, 155,  47, 255, 135,  52, 142,  67,  68, 196, 222,
233, 203,  84, 123, 148,  50, 166, 194,  35,  61, 238,  76, 149,  11,  66,
250, 195,  78,   8,  46, 161, 102,  40, 217,  36, 178, 118,  91, 162,  73,
109, 139, 209,  37, 114, 248, 246, 100, 134, 104, 152,  22, 212, 164,  92,
204,  93, 101, 182, 146, 108, 112,  72,  80, 253, 237, 185, 218,  94,  21,
 70,  87, 167, 141, 157, 132, 144, 216, 171,   0, 140, 188, 211,  10, 247,
228,  88,   5, 184, 179,  69,   6, 208,  44,  30, 143, 202,  63,  15,   2,
193, 175, 189,   3,   1,  19, 138, 107,  58, 145,  17,  65,  79, 103, 220,
234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116,  34, 231, 173,
 53, 133, 226, 249,  55, 232,  28, 117, 223, 110,  71, 241,  26, 113,  29,
 41, 197, 137, 111, 183,  98,  14, 170,  24, 190,  27, 252,  86,  62,  75,
198, 210, 121,  32, 154, 219, 192, 254, 120, 205,  90, 244,  31, 221, 168,
 51, 136,   7, 199,  49, 177,  18,  16,  89,  39, 128, 236,  95,  96,  81,
127, 169,  25, 181,  74,  13,  45, 229, 122, 159, 147, 201, 156, 239, 160,
224,  59,  77, 174,  42, 245, 176, 200, 235, 187,  60, 131,  83, 153,  97,
 23,  43,   4, 126, 186, 119, 214,  38, 225, 105,  20,  99,  85,  33,  12,
125 ];

// --- Fonctions ---

// convertit un nombre 32 bits en chaine hexa
function crypto_rhex(num) {
	var hex_chr="0123456789abcdef";
	var str="";
		for(var j=0; j<=3; j++)
		str+=hex_chr.charAt((num >> (j*8+4)) & 0x0F)
			+hex_chr.charAt((num >> (j*8)) & 0x0F);
		return str;
} // fin crypto_rhex(num)

// convertit une chaine en un tableau de blocs de 16 mots
function crypto_str2blks(str) {
	var nblk=((str.length+8) >> 6)+1;
	var blks=new Array(nblk*16);
	for(var i=0; i<nblk*16; i++) blks[i]=0;
	for(var i=0; i<str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << ((i % 4)*8);
	blks[i >> 2] |= 0x80 << ((i % 4)*8);
	blks[nblk*16 - 2]=str.length*8;
	return blks;
} // fin crypto_str2blks(str)

// ajoute deux nombres avec "wrapping" a 2^32
function crypto_sa(x, y) {
	var lsw=(x & 0xFFFF)+(y & 0xFFFF);
	var msw=(x >> 16)+(y >> 16)+(lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
} // fin crypto_sa(x, y)

// decalage bit-a-bit vers la gauche d'un nombre 32 bits
function crypto_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
} // fin crypto_rol(num, cnt)

// operations de base pour chaque etape de l'algorithme
function crypto_cmn(q, a, b, x, s, t) {
	return crypto_sa(crypto_rol(crypto_sa(crypto_sa(a, q), crypto_sa(x, t)), s), b);
} // fin crypto_cmn(q, a, b, x, s, t)
function crypto_ff(a, b, c, d, x, s, t) {
	return crypto_cmn((b & c) | ((~b) & d), a, b, x, s, t);
} // crypto_ff(a, b, c, d, x, s, t)
function crypto_gg(a, b, c, d, x, s, t) {
	return crypto_cmn((b & d) | (c & (~d)), a, b, x, s, t);
} // fin crypto_gg(a, b, c, d, x, s, t)
function crypto_hh(a, b, c, d, x, s, t) {
	return crypto_cmn(b ^ c ^ d, a, b, x, s, t);
} // fin crypto_hh(a, b, c, d, x, s, t)
function crypto_ii(a, b, c, d, x, s, t) {
	return crypto_cmn(c ^ (b | (~d)), a, b, x, s, t);
} // fin crypto_ii(a, b, c, d, x, s, t)

// calcule et retourne le hachage MD5 de la chaine passee en parametre
function calculerMD5(chaine) {
	if (!chaine) return;
	var x=crypto_str2blks(chaine);
	var a= 1732584193;
	var b=-271733879;
	var c=-1732584194;
	var d= 271733878;
	for(i=0; i<x.length; i+=16) {
		var olda=a;
		var oldb=b;
		var oldc=c;
		var oldd=d;
		a=crypto_ff(a, b, c, d, x[i+ 0], 7, -680876936);
		d=crypto_ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c=crypto_ff(c, d, a, b, x[i+ 2], 17, 606105819);
		b=crypto_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a=crypto_ff(a, b, c, d, x[i+ 4], 7, -176418897);
		d=crypto_ff(d, a, b, c, x[i+ 5], 12, 1200080426);
		c=crypto_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b=crypto_ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a=crypto_ff(a, b, c, d, x[i+ 8], 7, 1770035416);
		d=crypto_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c=crypto_ff(c, d, a, b, x[i+10], 17, -42063);
		b=crypto_ff(b, c, d, a, x[i+11], 22, -1990404162);
		a=crypto_ff(a, b, c, d, x[i+12], 7,	1804603682);
		d=crypto_ff(d, a, b, c, x[i+13], 12, -40341101);
		c=crypto_ff(c, d, a, b, x[i+14], 17, -1502002290);
		b=crypto_ff(b, c, d, a, x[i+15], 22, 1236535329);
		a=crypto_gg(a, b, c, d, x[i+ 1], 5, -165796510);
		d=crypto_gg(d, a, b, c, x[i+ 6], 9, -1069501632);
		c=crypto_gg(c, d, a, b, x[i+11], 14, 643717713);
		b=crypto_gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a=crypto_gg(a, b, c, d, x[i+ 5], 5, -701558691);
		d=crypto_gg(d, a, b, c, x[i+10], 9,	38016083);
		c=crypto_gg(c, d, a, b, x[i+15], 14, -660478335);
		b=crypto_gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a=crypto_gg(a, b, c, d, x[i+ 9], 5,	568446438);
		d=crypto_gg(d, a, b, c, x[i+14], 9, -1019803690);
		c=crypto_gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b=crypto_gg(b, c, d, a, x[i+ 8], 20, 1163531501);
		a=crypto_gg(a, b, c, d, x[i+13], 5, -1444681467);
		d=crypto_gg(d, a, b, c, x[i+ 2], 9, -51403784);
		c=crypto_gg(c, d, a, b, x[i+ 7], 14, 1735328473);
		b=crypto_gg(b, c, d, a, x[i+12], 20, -1926607734);
		a=crypto_hh(a, b, c, d, x[i+ 5], 4, -378558);
		d=crypto_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c=crypto_hh(c, d, a, b, x[i+11], 16, 1839030562);
		b=crypto_hh(b, c, d, a, x[i+14], 23, -35309556);
		a=crypto_hh(a, b, c, d, x[i+ 1], 4, -1530992060);
		d=crypto_hh(d, a, b, c, x[i+ 4], 11, 1272893353);
		c=crypto_hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b=crypto_hh(b, c, d, a, x[i+10], 23, -1094730640);
		a=crypto_hh(a, b, c, d, x[i+13], 4,	681279174);
		d=crypto_hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c=crypto_hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b=crypto_hh(b, c, d, a, x[i+ 6], 23, 76029189);
		a=crypto_hh(a, b, c, d, x[i+ 9], 4, -640364487);
		d=crypto_hh(d, a, b, c, x[i+12], 11, -421815835);
		c=crypto_hh(c, d, a, b, x[i+15], 16, 530742520);
		b=crypto_hh(b, c, d, a, x[i+ 2], 23, -995338651);
		a=crypto_ii(a, b, c, d, x[i+ 0], 6, -198630844);
		d=crypto_ii(d, a, b, c, x[i+ 7], 10, 1126891415);
		c=crypto_ii(c, d, a, b, x[i+14], 15, -1416354905);
		b=crypto_ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a=crypto_ii(a, b, c, d, x[i+12], 6,	1700485571);
		d=crypto_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c=crypto_ii(c, d, a, b, x[i+10], 15, -1051523);
		b=crypto_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a=crypto_ii(a, b, c, d, x[i+ 8], 6,	1873313359);
		d=crypto_ii(d, a, b, c, x[i+15], 10, -30611744);
		c=crypto_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b=crypto_ii(b, c, d, a, x[i+13], 21, 1309151649);
		a=crypto_ii(a, b, c, d, x[i+ 4], 6, -145523070);
		d=crypto_ii(d, a, b, c, x[i+11], 10, -1120210379);
		c=crypto_ii(c, d, a, b, x[i+ 2], 15, 718787259);
		b=crypto_ii(b, c, d, a, x[i+ 9], 21, -343485551);
		a=crypto_sa(a, olda);
		b=crypto_sa(b, oldb);
		c=crypto_sa(c, oldc);
		d=crypto_sa(d, oldd);
	}
	return crypto_rhex(a)+crypto_rhex(b)+crypto_rhex(c)+crypto_rhex(d);
} // fin calculerMD5(chaine)

// decalage circulaire
function crypto_csl(theArray, positions) {
	var temp=theArray.slice(0, positions);
	theArray=theArray.slice(positions).concat(temp);
	return theArray;
} // fin crypto_csl(theArray, positions)

// multiplie l'element "poly" par GF(2^8)
function crypto_xtime(poly) {
	poly <<= 1;
	if (poly & 0x100) return (poly ^ 0x11B);
	else return (poly);
} // fin crypto_xtime(poly)

// multiplie les deux elements par GF(2^8)
function crypto_multGF(x, y) {
	var bit, result=0;
	for (bit=1; bit<256; bit *= 2, y=crypto_xtime(y)) {
		if (x & bit) result ^= y;
	}
	return result;
} // fin crypto_multGF(x, y)

// effectue l'etape de substitution
function crypto_bs(state, direction) {
	var S;
	if (direction=="encrypt") S=crypto_SBox;
	else S=crypto_SBoxInv;
	for (var i=0; i<4; i++) {
		for (var j=0; j<crypto_Nb; j++)
			state[i][j]=S[state[i][j]];
	}
} // fin crypto_bs(state, direction)

// effectue l'etape de decalage des rangees
function crypto_sr(state, direction) {
	for (var i=1; i<4; i++) {
		if (direction=="encrypt")
			state[i]=crypto_csl(state[i], crypto_sOffsets[crypto_Nb][i]);
		else
			state[i]=crypto_csl(state[i], crypto_Nb - crypto_sOffsets[crypto_Nb][i]);
	}
} // fin crypto_sr(state, direction)

// effectue l'etape de melange des colonnes
function crypto_mc(state, direction) {
	var b=[];
	for (var j=0; j<crypto_Nb; j++) {
		for (var i=0; i<4; i++) {
			if (direction=="encrypt") b[i]=crypto_multGF(state[i][j], 2) ^
				crypto_multGF(state[(i+1)%4][j], 3) ^
				state[(i+2)%4][j] ^
				state[(i+3)%4][j];
			else b[i]=crypto_multGF(state[i][j], 0xE) ^
				crypto_multGF(state[(i+1)%4][j], 0xB) ^
				crypto_multGF(state[(i+2)%4][j], 0xD) ^
				crypto_multGF(state[(i+3)%4][j], 9);
		}
		for (var i=0; i<4; i++) state[i][j]=b[i];
	}
} // fin crypto_mc(state, direction)

// memorise la cle de la rotation courante
function crypto_ark(state, roundKey) {
	for (var j=0; j<crypto_Nb; j++) {
		state[0][j] ^= (roundKey[j] & 0xFF);
		state[1][j] ^= ((roundKey[j]>>8) & 0xFF);
		state[2][j] ^= ((roundKey[j]>>16) & 0xFF);
		state[3][j] ^= ((roundKey[j]>>24) & 0xFF);
	}
} // fin crypto_ark(state, roundKey)

// cree la cle etendue a partir de la cle fournie
function crypto_ke(key) {
	var expKey=new Array();
	var temp;
	crypto_Nk=crypto_tcle/32;
	crypto_Nb=crypto_tblocs/32;
	crypto_Nr=crypto_rArray[crypto_Nk][crypto_Nb];
	for (var j=0; j<crypto_Nk; j++)
		expKey[j]=(key[4*j]) | (key[4*j+1]<<8) | (key[4*j+2]<<16) | (key[4*j+3]<<24);
	for (j=crypto_Nk; j<crypto_Nb*(crypto_Nr+1); j++) {
		temp=expKey[j - 1];
		if (j % crypto_Nk==0)
			temp=( (crypto_SBox[(temp>>8) & 0xFF]) |
				(crypto_SBox[(temp>>16) & 0xFF]<<8) |
				(crypto_SBox[(temp>>24) & 0xFF]<<16) |
				(crypto_SBox[temp & 0xFF]<<24) ) ^ crypto_Rcon[Math.floor(j/crypto_Nk) - 1];
		else if (crypto_Nk>6 && j % crypto_Nk==4)
			temp=(crypto_SBox[(temp>>24) & 0xFF]<<24) |
				(crypto_SBox[(temp>>16) & 0xFF]<<16) |
				(crypto_SBox[(temp>>8) & 0xFF]<<8) |
				(crypto_SBox[temp & 0xFF]);
		expKey[j]=expKey[j-crypto_Nk] ^ temp;
	}
	return expKey;
} // fin crypto_ke(key)

// rounds de l'algorithme
function crypto_Round(state, roundKey) {
	crypto_bs(state, "encrypt");
	crypto_sr(state, "encrypt");
	crypto_mc(state, "encrypt");
	crypto_ark(state, roundKey);
} // fin crypto_Round(state, roundKey)
function crypto_InvRound(state, roundKey) {
	crypto_ark(state, roundKey);
	crypto_mc(state, "decrypt");
	crypto_sr(state, "decrypt");
	crypto_bs(state, "decrypt");
} // fin crypto_InvRound(state, roundKey)
function crypto_FinalRound(state, roundKey) {
	crypto_bs(state, "encrypt");
	crypto_sr(state, "encrypt");
	crypto_ark(state, roundKey);
} // fin crypto_FinalRound(state, roundKey)
function crypto_InvFinalRound(state, roundKey) {
	crypto_ark(state, roundKey);
	crypto_sr(state, "decrypt");
	crypto_bs(state, "decrypt");
} // fin crypto_InvFinalRound(state, roundKey)

// chiffrement d'un bloc
function crypto_encrypt(block, expKey) {
	var i;
	if (!block || block.length*8!=crypto_tblocs) return;
	if (!expKey) return;
	block=crypto_pb(block);
	crypto_ark(block, expKey);
	for (i=1; i<crypto_Nr; i++)
		crypto_Round(block, expKey.slice(crypto_Nb*i, crypto_Nb*(i+1)));
	crypto_FinalRound(block, expKey.slice(crypto_Nb*crypto_Nr));
	return crypto_ub(block);
} // fin crypto_encrypt(block, expKey)

// dechiffrement d'un bloc
function crypto_decrypt(block, expKey) {
	var i;
	if (!block || block.length*8!=crypto_tblocs) return;
	if (!expKey) return;
	block=crypto_pb(block);
	crypto_InvFinalRound(block, expKey.slice(crypto_Nb*crypto_Nr));
	for (i=crypto_Nr - 1; i>0; i--)
		crypto_InvRound(block, expKey.slice(crypto_Nb*i, crypto_Nb*(i+1)));
	crypto_ark(block, expKey);
	return crypto_ub(block);
} // fin crypto_decrypt(block, expKey)

// convertit un tableau d'octets en une chaine
function crypto_bats(byteArray) {
	var result="";
	if (!byteArray) return;
	for(var i=0; i<byteArray.length; i++)
		if (byteArray[i]!=0) result+=String.fromCharCode(byteArray[i]);
	return result;
} // fin crypto_bats(byteArray)

// convertit un tableau d'octets en une chaine hexa
function crypto_bath(byteArray) {
	var result="";
	if (!byteArray) return;
	for (var i=0; i<byteArray.length; i++)
		result+=((byteArray[i]<16) ? "0" : "")+byteArray[i].toString(16);
	return result;
} // fin crypto_bath(byteArray)

// convertit une chaine en un tableau d'octets
function crypto_stba(str) {
	var byteArray=new Array(str.length);
	for (var i=0; i<byteArray.length; i++)
		byteArray[i]=str.charCodeAt(i);
	return byteArray;
} // fin crypto_stba(str)

// convertit une chaine hexa en un tableau d'octets
function crypto_htba(hexstr) {
	if (hexstr.length % 2)
		return;
	if (hexstr.indexOf("0x")==0 || hexstr.indexOf("0X")==0)
		hexstr=hexstr.substring(2);
	var byteArray=new Array(hexstr.length/2);
	for (var i=0; i<hexstr.length; i+=2)
		byteArray[Math.floor(i/2)]=parseInt(hexstr.slice(i,i+2), 16);
	return byteArray;
} // fin crypto_htba(hexstr)

// formate un tableau d'octets en 4 lignes
function crypto_pb(octets) {
	var state=new Array();
	if (!octets || octets.length % 4) return;
	state[0]=new Array();
	state[1]=new Array();
	state[2]=new Array();
	state[3]=new Array();
	for (var j=0; j<octets.length; j+= 4) {
		state[0][j/4]=octets[j];
		state[1][j/4]=octets[j+1];
		state[2][j/4]=octets[j+2];
		state[3][j/4]=octets[j+3];
	}
	return state;
} // fin crypto_pb(octets)

// formate 4 lignes en un tableau d'octets
function crypto_ub(packed) {
	var result=new Array();
	for (var j=0; j<packed.length; j++) {
		result[result.length]=packed[0][j];
		result[result.length]=packed[1][j];
		result[result.length]=packed[2][j];
		result[result.length]=packed[3][j];
	}
	return result;
} // fin crypto_ub(packed)

// adapte la taille d'une chaine a la taille des blocs
function crypto_fpt(plaintext) {
	var bpb=crypto_tblocs/8;
	var i;
	if (typeof plaintext=="string" || plaintext.indexOf) {
		plaintext=plaintext.split("");
		for (i=0; i<plaintext.length; i++)
			plaintext[i]=plaintext[i].charCodeAt(0) & 0xFF;
	}
	for (i=bpb - (plaintext.length % bpb); i>0 && i<bpb; i--)
		plaintext[plaintext.length]=0;
	return plaintext;
} // fin crypto_fpt(plaintext)

// chiffre la chaine passee en parametre avec la cle passee en parametre
function chiffrerAES(donnee, cle) {
	if (!donnee || !cle) return;
	var expKey, i, aBlock;
	var bpb=crypto_tblocs/8;
	var ct=new Array();
	plaintext=crypto_fpt(crypto_stba(donnee));
	expKey=crypto_ke(crypto_stba(cle));
	for (var block=0; block<plaintext.length/bpb; block++) {
		aBlock=plaintext.slice(block*bpb, (block+1)*bpb);
		ct=ct.concat(crypto_encrypt(aBlock,expKey));
	}
	return crypto_bath(ct);
} // fin chiffrerAES(donnee, cle)

// dechiffre la chaine chiffree (cipher) avec la cle passee en parametre
function dechiffrerAES(cipher, cle) {
	if (!cipher || !cle) return;
	var expKey, aBlock, block;
	var bpb=crypto_tblocs/8;
	var pt=new Array();
	ciphertext=crypto_htba(cipher);
	expKey=crypto_ke(crypto_stba(cle));
	for (block=(ciphertext.length/bpb)-1; block>0; block--) {
		aBlock=crypto_decrypt(ciphertext.slice(block*bpb,(block+1)*bpb),expKey);
		pt=aBlock.concat(pt);
	}
	pt=crypto_decrypt(ciphertext.slice(0, bpb), expKey).concat(pt);
	return crypto_bats(pt);
} // fin dechiffrerAES(cipher, cle)

// modifie la taille de la cle pour l'AES
function modifierTailleCleAES(taille) {
	if (parseInt(taille)==128) crypto_tcle=128;
	else if (parseInt(taille)==192) crypto_tcle=192;
	else if (parseInt(taille)==256) crypto_tcle=256;
	return true;
} // fin modifierTailleCleAES(taille)

// retourne la taille de la cle pour l'AES
function obtenirTailleCleAES() {
	return (crypto_tcle);
} // fin obtenirTailleCleAES()
