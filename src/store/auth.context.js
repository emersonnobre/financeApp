import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    function authenticate(name, email, token) {
        setAuthenticatedUser({name, email, token});
    }

    function logout() {
        setAuthenticatedUser(null);
    }

    const valuesToExport = {
        authenticate,
        logout,
        authenticatedUser,
        isAuthenticated: !!authenticatedUser,
    };

    return <AuthContext.Provider value={valuesToExport}>
        {children}
    </AuthContext.Provider>;
}