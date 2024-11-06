import { configHeadersToken, instance } from "./axiosInstance";

// Fonction générique pour récupérer des données
const fetchData = async (endpoint, errorMessage) => {
  try {
    const response = await instance.get(endpoint, configHeadersToken());
    return response?.data || [];
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};



// Fonctions spécifiques utilisant fetchData pour chaque type de données

export const getEntreprises = () =>
  fetchData("entreprise/", "Erreur lors de la récupération des entreprises");

export const getEntreprisesFiltre = () =>
  fetchData("fentreprise/", "Erreur lors de la récupération des entreprises");

export const getVillesFiltre = () =>
  fetchData("fville/", "Erreur lors de la récupération des villes");

export const getCommunes = () =>
  fetchData("fcommune/", "Erreur lors de la récupération des communes");

export const getMarques = () =>
  fetchData("fmarque/", "Erreur lors de la récupération des marques");

export const getQuartiers = () =>
  fetchData("fquartier/", "Erreur lors de la récupération des quartiers");

export const getTypeSupports = () =>
  fetchData(
    "fsupports/",
    "Erreur lors de la récupération des types de supports"
  );

export const getCanaux = () =>
  fetchData("fcanal/", "Erreur lors de la récupération des canaux");

export const getEtatSupports = () =>
  fetchData("fetat/", "Erreur lors de la récupération des états de supports");

export const getTypeSites = () =>
  fetchData("fsite/", "Erreur lors de la récupération des types de sites");

export const getVisibilites = () =>
  fetchData("fvisibilite/", "Erreur lors de la récupération des visibilités");

export const getDistricts = () =>
  fetchData("fdistrict/", "Erreur lors de la récupération des districts");

export const getRegions = () =>
  fetchData("fregion/", "Erreur lors de la récupération des régions");
