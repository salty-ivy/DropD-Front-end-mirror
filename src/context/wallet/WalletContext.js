import * as React from "react";

import { useCallback, useContext, useMemo, useState } from "react";

const UseWalletContext = React.createContext(null);

function useWallet() {
    const walletContext = useContext(UseWalletContext);

    if (walletContext === null) {
        throw new Error(
            "useWallet() can only be used inside of <UseWalletProvider />, " +
            "please declare it at a higher level."
        );
    }

    const { wallet } = walletContext;

    return useMemo(() => {
        return { ...wallet };
    }, [wallet]);
}

function UseWalletProvider({ children }) {
    const walletContext = useContext(UseWalletContext);

    if (walletContext !== null) {
        throw new Error("<UseWalletContext /> has already been declared.");
    }

    const [selectedWallet, setSelectedWallet] = useState();
    const [address, setAddress] = useState();
    const wallet = useMemo(
        () => ({
            selectedWallet,
            setSelectedWallet,
            address,
            setAddress

        }),
        [
            selectedWallet,
            setSelectedWallet,
            address,
            setAddress
        ]
    );

    return (
        <UseWalletContext.Provider
            value={{
                wallet,
            }}
        >
            {children}
        </UseWalletContext.Provider>
    );
}

function UseWalletProviderWrapper(props) {
    return <UseWalletProvider {...props} />;
}

export const withWallet = (Component) => {
    return (props) => {
        const wallet = useWallet();

        return <Component wallet={wallet} {...props} />;
    };
};

export { UseWalletProviderWrapper as UseWalletProvider, useWallet };
