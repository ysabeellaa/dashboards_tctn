
import { useApiContext } from "../../context/ApiContext";

function Companies() {
  const apiContext = useApiContext();

  if (!apiContext || !apiContext.companies || !apiContext.users || !apiContext.assets) {
    return <div>Carregando...</div>;
  }

  const { companies, users, assets } = apiContext;

  return (
    <div>
      <h1>Empresas</h1>
      {companies.map((company) => (
        <div key={company.id}>
          <h2>{company.name}</h2>
          <h3>Users</h3>
          <ul>
            {users
              .filter((user) => user.companyId === company.id)
              .map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
          </ul>
          <h3>Machines</h3>
          <ul>
            {assets
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

export default Companies;
