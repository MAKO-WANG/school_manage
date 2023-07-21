import { getUserItem } from '@/services';
import { defineStore } from 'pinia';

export type UserInfoType = {
  id: number;
  email: string;
  gender: string;
  mobile: string;
  username: string;
};

type StateTypes = {
  isLogin: boolean;
  access: string;
  userInfo?: UserInfoType;
};

const getInitInfo = () => {
  const localInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  return Object.assign(
    {},
    {
      id: 0,
      email: '',
      gender: '',
      mobile: '',
      username: '',
    },
    localInfo,
  );
};

export const useUserStore = defineStore('user', {
  state: (): StateTypes => {
    return {
      isLogin: localStorage.getItem('token') ? true : false,
      access: '',
      userInfo: getInitInfo(),
    };
  },
  getters: {},
  actions: {
    updateUserInfo(info: UserInfoType) {
      this.userInfo = info;
      localStorage.setItem('userInfo', JSON.stringify(info));
    },
    logout() {
      this.userInfo = {
        id: 0,
        email: '',
        gender: '',
        mobile: '',
        username: '',
      };
      this.access = '';
      this.isLogin = false;
      localStorage.removeItem('token');
    },
    async getUser(id: number) {
      try {
        const res = await getUserItem(id);
        console.log(['res', res]);
      } catch (error) {}
    },
  },
});
