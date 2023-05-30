import { useEffect, useState } from "react";

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

interface Asset {
  id: number;
  name: string;
  model: string;
  companyId: number;
}

interface Data {
  companies: Company[];
  users: User[];
  assets: Asset[];
}

function ConsumeAPI() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        fetch("http://localhost:3000/companies"),
        fetch("http://localhost:3000/users"),
        fetch("http://localhost:3000/assets")
      ])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then(([companiesData, usersData, assetsData]) => {
        setData({
          companies: companiesData,
          users: usersData,
          assets: assetsData
        });
      })
      .catch((error) => {
        console.log("Erro ao buscar os dados da API:", error);
      });
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      
      <h1>Company</h1>
      {data.companies.map((company) => (
        <div key={company.id}>
          <h2>{company.name}</h2>
          <h3>Usuários</h3>
          <ul>
            {data.users
              .filter((user) => user.companyId === company.id)
              .map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
          </ul>
          <h3>Máquinas</h3>
          <ul>
            {data.assets
              .filter((asset) => asset.companyId === company.id)
              .map((asset) => (
                <li key={asset.id}>
                  {asset.name} - {asset.model}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ConsumeAPI;
