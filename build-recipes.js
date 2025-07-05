// Build script to pre-load recipes data for SSG
import { loadRecipesData } from './app/lib/recipes.js';

async function buildRecipesData() {
  console.log('Loading recipes data for Static Site Generation...');
  try {
    await loadRecipesData();
    console.log('Recipes data loaded successfully for SSG!');
  } catch (error) {
    console.error('Error loading recipes data for SSG:', error);
    process.exit(1);
  }
}

buildRecipesData();
