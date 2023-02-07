import { useState } from 'react';

interface IUserInfo {
  id: number;
  userName: string;
}

const useUser = () => {
  const [username, setUserName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userName: '',
    id: 0,
  });

  return {
    username,
    setUserName,
    userInfo,
    setUserInfo,
  };
};

export default useUser;
