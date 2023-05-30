import React, { createContext, useEffect, useState, useContext } from "react";

interface Company {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    companyId: number;
    email: string;
    unitId: number;
}

interface Unit {
    companyId: number;
    id: number;
    name: string;
}

export interface Asset {
    id: number;
    image: string;
    name: string;
    model: string;
    companyId: number;
    unitId: number;
    status: string;
    healthscore: number;
    healthHistory: {
        status: string;
        timestamp: string;
    }[];
    metrics: {
        lastUptimeAt: string;
        totalCollectsUptime: number;
        totalUptime: number;
    };
    specifications: {
        maxTemp: number;
        power: string;
        rpm: number;
    };
    sensors: string[];
}


interface Data {
    companies: Company[];
    users: User[];
    units: Unit[];
    assets: Asset[];
}

export interface ApiContextType extends Data {
    data: Data | null;
    companies: Company[];
    users: User[];
    units: Unit[];
    assets: Asset[];
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ApiContextType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companiesResponse, usersResponse, unitsResponse, assetsResponse] = await Promise.all([
                    fetch("http://localhost:3000/companies"),
                    fetch("http://localhost:3000/users"),
                    fetch("http://localhost:3000/units"),
                    fetch("http://localhost:3000/assets"),
                ]);

                const [companiesData, usersData, unitsData, assetsData] = await Promise.all([
                    companiesResponse.json(),
                    usersResponse.json(),
                    unitsResponse.json(),
                    assetsResponse.json(),
                ]);

                setData({
                    companies: companiesData,
                    users: usersData,
                    units: unitsData,
                    assets: assetsData,
                    data: null,
                });
            } catch (error) {
                console.log("Erro ao buscar os dados da API:", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Carregando...</div>;
    }

    return <ApiContext.Provider value={data}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => useContext(ApiContext);
