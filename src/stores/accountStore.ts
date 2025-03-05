import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '@/types';

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([]);

  const addAccount = () => {
    accounts.value.push({
      labelInput: '',
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
      errors: {
        label: '',
        type: '',
        login: '',
        password: ''
      }
    });
  };

  const removeAccount = (index: number) => {
    accounts.value.splice(index, 1);
    saveAccountsToLocalStorage();
  };

  const saveAccount = (account: Account) => {
    if (account.labelInput) {
      const labelTexts = account.labelInput.split(';').filter(label => label.trim() !== '');
      account.labels = labelTexts.map(text => ({ text: text.trim() }));
    } else {
      account.labels = [];
    }

    saveAccountsToLocalStorage();
  };

  const saveAccountsToLocalStorage = () => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value));
  };

  const loadAccounts = () => {
    const savedAccounts = localStorage.getItem('accounts');
    if (savedAccounts) {
      accounts.value = JSON.parse(savedAccounts);
      
      accounts.value.forEach(account => {
        if (!account.errors) {
          account.errors = {
            label: '',
            type: '',
            login: '',
            password: ''
          };
        }
      });
    }
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    saveAccount,
    loadAccounts
  };
});