import { FC } from 'react';
import ErrorPage from './ErrorPage';

const UnauthorizedPage: FC = () => {
  return (
    <ErrorPage
      title="403 Non autorisé"
      code={403}
      explanation="Vous n'avez pas la permission d'accéder à cette page. Si vous êtes hors ligne réessayer en ligne."
    />
  );
};

export default UnauthorizedPage;
