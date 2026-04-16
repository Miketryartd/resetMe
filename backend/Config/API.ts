
const getApiUrl = () => {
    
    if (process.env.NODE_ENV === 'production') {
      return process.env.APP_API_URL || 'https://resetme.onrender.com/';
    }
    
   
    return process.env.APP_API_URL || 'http://localhost:3000/api';
  };
  
  export const API_BASE_URL = getApiUrl();