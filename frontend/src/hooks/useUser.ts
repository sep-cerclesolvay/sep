import { User } from 'types/User';

const useUser = (): User | undefined => ({
  id: 1,
  name: 'Admin',
  admin: true,
});

// const useUser = (): User | undefined => undefined;

export default useUser;
