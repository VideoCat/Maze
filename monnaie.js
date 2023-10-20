/* monnaie.js
 * Role : calcule la TVA et les montants HT et TTC, et convertit une devise en Euro
 * Projet : JsLib
 * Auteur : Etienne CHEVILLARD (echevillard@users.sourceforge.net)
 * Version : 1.4
 * Creation : 30/04/2001
 * Mise a jour : 12/12/2007
 */

// --- Variables globales ---

// taux par defaut
var monnaie_taux_TVA=0.196;
var monnaie_taux_Euro=6.55957;

// --- Fonctions ---

// retourne un arrondi a deux decimales du montant specifie
function calculerArrondi(montant) {
  var marr=parseFloat(montant)*100
  marr=Math.round(marr)/100;
  return (parseFloat(marr));
} // fin calculerArrondi(montant)

// calcule le montant HT a partir du montant TTC specifie
function calculerMontantHT(montant) {
  var mres;
  var mttc=parseFloat(montant);
  if (mttc) {
    mres=mttc*(1/(1+monnaie_taux_TVA));
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin calculerMontantHT(montant)

// calcule le montant TTC a partir du montant HT specifie
function calculerMontantTTC(montant) {
  var mres;
  var mht=parseFloat(montant);
  if (mht) {
    mres=mht*(1+monnaie_taux_TVA);
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin calculerMontantTTC(montant)

// calcule la TVA a appliquer sur le montant HT specifie
function calculerTVASurHT(montant) {
  var mres;
  var mht=parseFloat(montant);
  if (mht) {
    mres=mht*monnaie_taux_TVA;
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin calculerTVASurHT(montant)

// calcule la TVA appliquee sur le montant TTC specifie
function calculerTVASurTTC(montant) {
  var mres;
  var mttc=parseFloat(montant);
  if (mttc) {
    mres=mttc*(monnaie_taux_TVA/(1+monnaie_taux_TVA));
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin calculerTVASurTTC(montant)

// convertit en Euro le montant specifie (en devise locale)
function convertirDeviseEnEuro(montant) {
  var mres;
  var mdev=parseFloat(montant);
  if (mdev) {
    mres=mdev*(1/monnaie_taux_Euro);
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin convertirDeviseEnEuro(montant)

// convertit en devise le montant specifie (en Euro)
function convertirEuroEnDevise(montant) {
  var mres;
  var meur=parseFloat(montant);
  if (meur) {
    mres=meur*monnaie_taux_Euro;
    mres=calculerArrondi(mres);
    return (parseFloat(mres));
  } else {
    return (0);
  }
} // fin convertirEuroEnDevise(montant)

// modifie le taux de conversion Euro/devise avec la valeur specifiee
function modifierTauxEuro(taux) {
  var mnouv=parseFloat(taux);
  if (mnouv) {
    monnaie_taux_Euro=mnouv;
    return (true);
  } else {
    return (false);
  }
} // fin modifierTauxEuro(taux)

// modifie le taux de TVA avec la valeur specifiee
function modifierTauxTVA(taux) {
  var mnouv=parseFloat(taux);
  if (mnouv) {
    monnaie_taux_TVA=(mnouv/100);
    return (true);
  } else {
    return (false);
  }
} // fin modifierTauxTVA(taux)

// retourne le taux de conversion Euro/devise
function obtenirTauxEuro() {
  return (parseFloat(monnaie_taux_Euro));
} // fin obtenirTauxEuro()

// retourne le taux de TVA
function obtenirTauxTVA() {
  return (parseFloat(monnaie_taux_TVA*100));
} // fin obtenirTauxTVA()
