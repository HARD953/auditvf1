import { configHeadersFormDataToken, configHeadersToken, instance } from "../axiosInstance";




//Marques
export const getMarques = async(page)=>{
    try {
        const response = await instance.get(`marque/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addMarque = async(body)=>{
    try {
        const response = await instance.post("marque/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateMarque = async(id,body)=>{
    try {
        console.log("body :::",body)
        const response = await instance.patch(`marque/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteMarque = async(id)=>{
    try {
        const response = await instance.delete(`marque/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}



//Canal
export const getCanals = async(page)=>{
    try {
        const response = await instance.get(`canal/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addCanal = async(body)=>{
    try {
        const response = await instance.post("canal/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateCanal = async(id,body)=>{
    try {
        const response = await instance.patch(`canal/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteCanal = async(id)=>{
    try {
        const response = await instance.delete(`canal/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}




//Site
export const getSites = async(page)=>{
    try {
        const response = await instance.get(`site/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addSite = async(body)=>{
    try {
        const response = await instance.post("site/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateSite = async(id,body)=>{
    try {
        const response = await instance.patch(`site/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteSite = async(id)=>{
    try {
        const response = await instance.delete(`site/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}



//Etat
export const getEtats = async(page)=>{
    try {
        const response = await instance.get(`etat/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addEtat = async(body)=>{
    try {
        const response = await instance.post("etat/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateEtat = async(id,body)=>{
    try {
        const response = await instance.patch(`etat/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteEtat = async(id)=>{
    try {
        const response = await instance.delete(`etat/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}



//Visibilite
export const getVisibilites = async(page)=>{
    try {
        const response = await instance.get(`visibilite/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addVisibilite = async(body)=>{
    try {
        const response = await instance.post("visibilite/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateVisibilite = async(id,body)=>{
    try {
        const response = await instance.patch(`visibilite/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteVisibilite = async(id)=>{
    try {
        const response = await instance.delete(`visibilite/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


//Ville
export const getVilles = async(page)=>{
    try {
        const response = await instance.get(`ville/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addVille = async (body) => {
  try {
    const response = await instance.post(
      "ville/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateVille = async (id, body) => {
  try {
    const response = await instance.patch(
      `ville/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteVille = async (id) => {
  try {
    const response = await instance.delete(
      `ville/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


//Commune
export const getCommunes = async(page)=>{
    try {
        const response = await instance.get(`commune/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addCommune = async(body)=>{
    try {
        const response = await instance.post("commune/",body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const updateCommune = async(id,body)=>{
    try {
        const response = await instance.patch(`commune/${id}/`,body, configHeadersFormDataToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}

export const deleteCommune = async(id)=>{
    try {
        const response = await instance.delete(`commune/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}



//Quariers
export const getQuartiersList = async (page) => {
  try {
    const response = await instance.get(
      `quartier/?page=${page}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const addQuartier = async (body) => {
  try {
    const response = await instance.post(
      "quartier/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateQuartier = async (id, body) => {
  try {
    const response = await instance.patch(
      `quartier/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteQuartier = async(id)=>{
    try {
        const response = await instance.delete(
          `quartier/${id}/`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


//Type de support
export const getTypeSupportParams = async(page)=>{
    try {
        const response = await instance.get(`supports/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addTypeSupport = async (body) => {
  try {
    const response = await instance.post(
      "supports/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateTypeSupport = async (id, body) => {
  try {
    const response = await instance.patch(
      `supports/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteTypeSupport = async (id) => {
  try {
    const response = await instance.delete(
      `supports/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};



//Districs
export const getDistrictsList = async (page) => {
  try {
    const response = await instance.get(
      `district/?page=${page}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const addDistrict = async (body) => {
  try {
    const response = await instance.post(
      "district/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateDistrict = async (id, body) => {
  try {
    const response = await instance.patch(
      `district/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteDistrict = async(id)=>{
    try {
        const response = await instance.delete(
          `district/${id}/`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


//Regions
export const getRegionsList = async(page)=>{
    try {
        const response = await instance.get(
          `region/?page=${page}`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addRegion = async (body) => {
  try {
    const response = await instance.post(
      "region/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateRegion = async (id, body) => {
  try {
    const response = await instance.patch(
      `region/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteRegion = async (id) => {
  try {
    const response = await instance.delete(
      `region/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


//Villages
export const getVillages = async(page)=>{
    try {
        const response = await instance.get(`village/?page=${page}`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw error;
    }
}


export const addVillage = async (body) => {
  try {
    const response = await instance.post(
      "village/",
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};


export const updateVillage = async (id, body) => {
  try {
    const response = await instance.patch(
      `village/${id}/`,
      body,
      configHeadersFormDataToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};

export const deleteVillage = async (id) => {
  try {
    const response = await instance.delete(
      `village/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
};
