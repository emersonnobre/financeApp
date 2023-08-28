import { createContext, useState } from 'react';

export const AuthContext = createContext({
    authenticate(name, email, token) {},
    logout() {},
    authenticatedUser: '',
    isAuthenticated: false
});

export default function AuthProvider({ children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(true);

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