import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'darkmode');
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleMode = () => {
        setIsDarkMode((dark) => !dark);
    };
    return (
        <DarkModeContext.Provider
            value={{
                isDarkMode,
                toggleMode,
            }}
        >
            {children}
        </DarkModeContext.Provider>
    );
}

const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) throw Error('context must be used inside its provider');
    return context;
};

export { DarkModeProvider, useDarkMode };
