
import { instance ,configHeadersToken, configHeadersFormDataToken} from '../axiosInstance';


//Connexion de l'utilisateur
export const loginUser = async(userInfo)=>{
    try {
        return  await instance.post("token/",userInfo)
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error?.message);
        throw error;
    }
}

// Deconnexion de l'utilisateur
export const logoutUser = async()=>{
    try {
        const refresh_access = localStorage.getItem('refreshToken-audit-visibility')
        return  await instance.post("logout/blacklist/",{
            refresh_token: refresh_access
        },configHeadersToken())
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error?.message);
        throw error;
    }
}


// recuperation d'un utilisateur
export const getLoginInfos = async(id)=>{
    try {
        const response = await instance.get(`detailadimn/`, configHeadersToken())
        return response?.data?.data|| []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


// recuperation de la liste des utilisateurs entreprises
export const getUtilisateursEntreprises = async(page,pageSize)=>{
    try {
        const response = await instance.get(`uentreprise/`, {
          ...configHeadersToken(),
          params: {
            page,
            pageSize,
          },
        });
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

// recuperation de la liste des utilisateurs recenseurs
export const getUtilisateursRecenseurs = async (page, pageSize) => {
  try {
    const response = await instance.get(`urecenseur/`, {
      ...configHeadersToken(),
      params: {
        page,
        pageSize,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation de la liste des utilisateurs
export const getUtilisateurs = async (page, pageSize) => {
  try {
    const response = await instance.get(`uagent/`, {
      ...configHeadersToken(),
      params: {
        page,
        pageSize,
      },
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

// recuperation d'un utilisateur
export const getUtilisateur = async(id)=>{
    try {
        const response = await instance.get(`users/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


// ajouter un utilisateur
export const addUtilisateur = async(url,body)=>{
    try {
        const response = await instance.post(url,body, configHeadersFormDataToken())
        return response 
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

// mettre a jour un utilisateurs
export const updateUtilisateur = async(id,body)=>{
    try {
        const response = await instance.patch(`users/${id}/`,body, configHeadersFormDataToken())
        return response 
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


// Supprimer un utilisateurs
export const deleteUtilisateur = async(id)=>{
    try {
        const response = await instance.delete(`users/${id}/`, configHeadersFormDataToken())
        return response 
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const getStatAgent = async (id,debut, fin) => {
  try {
    const response = await instance.get(
      `statagentid/${debut}/${fin}/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const addAffectationUtilisateur = async (body) => {
  try {
    const response = await instance.post(
      `affectation/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteAffectationUtilisateur = async (id) => {
  try {
    const response = await instance.delete(
      `affectation/${id}/`,
      configHeadersFormDataToken()
    );
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const updateAffectationUtilisateur = async (id,body) => {
  try {
    const response = await instance.patch(
      `affectation/${id}`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getAffectationUtilisateur = async (id) => {
  try {
    const response = await instance.get(
      `affectation/${id}`,
      configHeadersToken()
    );
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const getAffectationUtilisateurs = async (page,pageSize) => {
  try {
    const response = await instance.get(`affectation/`, {
      ...configHeadersToken(),
      params: {
        page,
        pageSize,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const getAffectationUtilisateurList = async () => {
  try {
    const response = await instance.get(
      `useraffectation/`,
      configHeadersToken()
    );
    return response?.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
