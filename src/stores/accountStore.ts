import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '../types';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([]);

  const addAccount = () => {
    accounts.value.push({
      labelInput: '',
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    });
  };

  const removeAccount = (index: number) => {
    accounts.value.splice(index, 1);
  };

  return {
    accounts,
    addAccount,
    removeAccount
  };
});