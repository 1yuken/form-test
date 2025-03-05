<template>
  <div class="container mx-auto p-6 max-w-[950px]">
    <div class="bg-white rounded-lg shadow-md p-6">
      <header class="flex gap-4 items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Управление учетными записями</h1>
        <button 
          @click="accountStore.addAccount()" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xl font-bold"
        >
          +
        </button>
      </header>

      <div class="mb-4 text-sm text-gray-500">
        <p>Подсказка: Для поля "Метка" введите текстовые метки через знак ";"</p>
      </div>

      <div v-if="accountStore.accounts.length === 0" class="text-center py-8 text-gray-500">
        Нет учетных записей. Нажмите "+" чтобы добавить новую запись.
      </div>

      <div v-else class="space-y-6">
        <div 
          v-for="(account, index) in accountStore.accounts" 
          :key="index"
          class="border rounded-lg p-4 bg-gray-50"
        >
          <div class="flex justify-between mb-4">
            <h3 class="font-medium">Учетная запись #{{ index + 1 }}</h3>
            <button 
              @click="accountStore.removeAccount(index)"
              class="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="flex gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Метка</label>
              <input
                type="text"
                v-model="account.labelInput"
                maxlength="50"
                placeholder="Введите метки через ;"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Тип записи</label>
              <select
                v-model="account.type"
                class="w-full px-3 py-2 border rounded-md"
              >
                <option value="LDAP">LDAP</option>
                <option value="Локальная">Локальная</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Логин *</label>
              <input
                type="text"
                v-model="account.login"
                maxlength="100"
                placeholder="Введите логин"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div v-if="account.type === 'Локальная'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Пароль *</label>
              <input
                type="password"
                v-model="account.password"
                maxlength="100"
                placeholder="Введите пароль"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from './stores/accountStore';

const accountStore = useAccountStore();
</script>