// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

// interface AuthContextType {
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useAuth();
//   const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

//   // isLoggedIn değiştiğinde anında güncelle
//   useEffect(() => {
//     setIsAuthenticated(isLoggedIn);
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthStatus = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthStatus must be used within an AuthProvider");
//   }
//   return context;
// };
