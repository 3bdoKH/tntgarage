const API_BASE_URL = "https://emereld-marketing.online/api";

// Articles API functions
export const articlesAPI = {
  // Get all articles
  getAllArticles: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.published !== undefined)
        queryParams.append("published", params.published);
      if (params.author) queryParams.append("author", params.author);
      if (params.search) queryParams.append("search", params.search);

      const url = `${API_BASE_URL}/articles${
        queryParams.toString() ? "?" + queryParams.toString() : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  // Get single article by ID
  getArticleById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },

  // Create new article
  createArticle: async (articleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  // Update article
  updateArticle: async (id, articleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },

  // Delete article
  deleteArticle: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  // Add section to article
  addSectionToArticle: async (articleId, sectionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleId}/sections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding section to article:", error);
      throw error;
    }
  },
};
