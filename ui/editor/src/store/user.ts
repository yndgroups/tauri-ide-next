import { Pinia, defineStore } from 'pinia';

interface UserState {
  userInfo: any;
}

export const userStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
  }),
  getters: {
    getUserInfo() {
      return {};
    },
  },
  actions: {
    setUserInfo(info: any | null) {
      this.userInfo = info;
    },
  },
});

export default (store: Pinia) => {
  return userStore(store);
};
