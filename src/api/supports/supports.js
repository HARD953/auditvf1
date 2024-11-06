import { configHeadersFormDataToken, configHeadersToken, instance } from "../axiosInstance";

// Fonction générique pour traiter les réponses des requêtes
const handleResponse = (response) => response?.data || [];

// Fonction générique pour gérer les erreurs et journaliser
const handleError = (error) => {
  console.error("Erreur lors de la récupération des données:", error);
  throw error;
};

// Ajout d'un support
export const addSupport = async (body) => {
  try {
    const response = await instance.post(
      "donneescollectees/",
      body,
      configHeadersFormDataToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Mise à jour d'un support
export const updateSupport = async (id, body) => {
  try {
    const response = await instance.patch(
      `donneescollectees/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération d'un support spécifique
export const getSupport = async (id) => {
  try {
    const response = await instance.get(
      `donneescollectees/${id}/`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération de la liste des supports
export const getSupports = async (page) => {
  try {
    const response = await instance.get(
      `donneescollectees/?page=${page}`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Suppression d'un support
export const deleteSupport = async (id) => {
  try {
    const response = await instance.delete(
      `donneescollectees/${id}/`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération des supports avec filtres
export const getSupportsFilters = async (payload, page, pageSize) => {
  try {
    const response = await instance.post(`donneescollectees/`, payload, {
      ...configHeadersFormDataToken(),
      params: { page, pageSize },
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération des données géographiques de collecte entre deux dates
export const getSupportsGeoCollecte = async (debut, fin) => {
  try {
    const response = await instance.get(
      `gcollecte/${debut}/${fin}/`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération des opérateurs de collecte entre deux dates
export const getSupportsOperateurs = async (debut, fin) => {
  try {
    const response = await instance.get(
      `collectem/${debut}/${fin}/`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération des communes de collecte entre deux dates
export const getSupportsCommunes = async (debut, fin) => {
  try {
    const response = await instance.get(
      `collecte/${debut}/${fin}/`,
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Récupération de la localisation des supports
export const getSupportsLocation = async () => {
  try {
    const response = await instance.get(
      "donneescollectees/",
      configHeadersToken()
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Application des filtres d'accueil sur les supports
export const accueilSupportFilter = async (body,page,pageSize=10) => {
  try {
    const response = await instance.post(
      "filtregeneral/",body,
      {...configHeadersFormDataToken(),
        params:{
            page,
            pageSize,
        }
      }
    );
    console.log("response: " + JSON.stringify(response?.data));
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const accueilSupportFilterGeo = async (body, page, pageSize = 10) => {
  try {
    const response = await instance.post(
      "gcollecte/",
      body,
      {
        ...configHeadersFormDataToken(),
        params: {
          page,
          pageSize,
        },
      }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};


export const getSupportsMap = async (body) => {
  try {
    const response = await instance.post("carte/", body, {
      ...configHeadersFormDataToken(),
     
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
