export const customizeNumerFormat = (valeur) => {
  const value = parseInt(valeur) ?? 0;
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatDateToLiteral = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleDateString("fr-FR", options).replace(" à", " à ");
};

export function capitalizeWords(sentence) {
  if (!sentence) {
    return sentence;
  }
  const wordsLower = sentence?.toLowerCase();
  const words = wordsLower.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}

export function ajouterPrefixeSiNecessaire(imageUrl) {
  const prefixeAttendu = "https://auditapi.up.railway.app/api";
  let image = String(imageUrl);
  if (!!image) {
    if (!image.startsWith(prefixeAttendu)) {
      image = prefixeAttendu + image;
    }
  }

  return image || "";
}

export const getDateEnglishFormatYearMonthDay = (date) => {
  const dateValue = date ?? "";
  return !!dateValue
    ? dateValue
        .toLocaleDateString("fr")
        .replace(/\//g, "-")
        .split("-")
        .reverse()
        .join("-")
    : "";
};

export const getDateAndTimeInFr = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return String(new Date(date).toLocaleString("fr-FR", options));
};

export const reorganizeDataForTable = (data) => {
  const result = [];

  for (const district in data?.districts_aggregations) {
    const regions = data?.districts_aggregations?.[district]?.regions;

    for (const region in regions) {
      const communes = regions?.[region]?.communes;

      for (const commune in communes) {
        const marques = communes?.[commune]?.marques;

        for (const marque in marques) {
          const states = marques?.[marque];

          for (const state in states) {
            const stateData = states?.[state];
            result.push({
              district,
              region,
              commune,
              marque,
              state,
              somme_montant_total_tsp: stateData.somme_montant_total_tsp,
              somme_montant_total_odp: stateData.somme_montant_total_odp,
              somme_montant_total: stateData.somme_montant_total,
              nombre_total: stateData.nombre_total,
            });
          }
        }
      }
    }
  }

  return result;
};
