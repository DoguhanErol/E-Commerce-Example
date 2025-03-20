//Eski yapi


// export type UserProfileToken = {
//     refresh: string;
//     access: string;
//     user_id: number;
//     username: string;
//   };
  
  
//   export type UserProfile = {
//     userName: string;
//   };
  

 export type UserInfo = {
   id: number;
   username: string;
   email: string;
 }


// yeni yapi

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access: string;  // Access Token (JWT)
  refresh: string; // Refresh Token
  user: User;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string; // Şifre doğrulama
}


  