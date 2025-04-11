// API Root Configuration based on environment
let apiRoot = '';

// Using process.env.BUILD_MODE from cross-env
const buildMode = process.env.BUILD_MODE;

// Development environment (localhost)
if (buildMode === 'dev') {
  apiRoot = 'http://localhost:3000';
  // console.log('🚀 API Root set to Development:', apiRoot);
}

// Production environment 
if (buildMode === 'production') {
  apiRoot = 'https://api.example.com'; // Replace with your production API URL
  // console.log('🚀 API Root set to Production:', apiRoot);
}

// Fallback in case BUILD_MODE is not set
if (!apiRoot) {
  apiRoot = 'http://localhost:3000'; // Default to development
  // console.log('🚀 API Root defaulting to:', apiRoot);
}

export const API_ROOT = apiRoot;