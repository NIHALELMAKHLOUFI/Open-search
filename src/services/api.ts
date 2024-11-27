import axios from "axios";

const API_URL = "https://dummyjson.com/products?limit=1000";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products; // Retourne uniquement la liste des produits
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
};
