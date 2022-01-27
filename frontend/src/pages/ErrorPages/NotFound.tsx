import { VFC } from 'react';
import ErrorPage from './ErrorPage';

const NotFoundPage: VFC = () => {
  return (
    <ErrorPage
      title="404 Non trouvée"
      code={404}
      explanation="La page que vous recherchez n'existe pas ou a été supprimée"
    />
  );
};

export default NotFoundPage;
