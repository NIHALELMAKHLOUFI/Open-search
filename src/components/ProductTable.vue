<template>
    <div class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <!-- Titre -->
        <h1 class="text-2xl font-bold mb-4 text-gray-800">Liste des produits</h1>
        
        <!-- Onglets -->
        <div class="flex space-x-4 border-b-2 border-gray-200 pb-2 mb-4">
          <button class="text-purple-700 font-medium px-4 py-2 rounded-t-md border-b-4 border-purple-700">
            Produits
          </button>
          <button class="text-gray-500 font-medium px-4 py-2 hover:text-purple-700">
            Catégories
          </button>
        </div>
        
        <!-- Champ de recherche -->
        <div class="relative mb-4">
          <input
            v-model="search"
            type="text"
            placeholder="Rechercher un produit"
            class="border rounded w-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 absolute right-4 top-3 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
        </div>
  
        <!-- Tableau -->
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr class="bg-gray-200 text-left text-gray-600 uppercase text-sm">
              <th class="py-3 px-6 border-b">Nom</th>
              <th class="py-3 px-6 border-b">Prix</th>
              <th class="py-3 px-6 border-b">Catégorie</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-100"
            >
              <td class="py-3 px-6 border-b">{{ product.title }}</td>
              <td class="py-3 px-6 border-b">{{ product.price }} $</td>
              <td class="py-3 px-6 border-b">{{ product.category }}</td>
            </tr>
          </tbody>
        </table>
  
        <!-- Boutons d'action -->
        <div class="flex justify-end mt-4">
          <button class="bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md mr-2 hover:bg-gray-300">
            Annuler
          </button>
          <button class="bg-purple-700 text-white font-medium px-4 py-2 rounded-md hover:bg-purple-800">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, onMounted } from "vue";
  import { fetchProducts } from "../services/api";
  
  export default defineComponent({
    name: "ProductTable",
    setup() {
      const products = ref([]); // Liste des produits
      const search = ref(""); // Terme de recherche
  
      // Fonction pour charger les produits depuis l'API
      const loadProducts = async () => {
        products.value = await fetchProducts();
      };
  
      // Produits filtrés en fonction de la recherche
      const filteredProducts = computed(() =>
        products.value.filter((product) =>
          product.title.toLowerCase().includes(search.value.toLowerCase())
        )
      );
  
      // Charger les produits une fois que le composant est monté
      onMounted(() => {
        loadProducts();
      });
  
      return {
        products,
        search,
        filteredProducts,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Ajoutez d'autres styles spécifiques ici si nécessaire */
  </style>
  