
const getApiUrl = () => {
    
    if (process.env.NODE_ENV === 'production') {
      return process.env.APP_API_URL || 'https://your-app-name.vercel.app/api';
    }
    
   
    return process.env.APP_API_URL || 'http://localhost:3000/api';
  };
  
  export const API_BASE_URL = getApiUrl();