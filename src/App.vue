<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAccountStore } from './stores/accountStore'
import DeleteIcon from './components/icons/DeleteIcon.vue'
import ShowPasswordIcon from './components/icons/ShowPasswordIcon.vue'
import HidePasswordIcon from './components/icons/HidePasswordIcon.vue'
import type { Account } from './types'

const accountStore = useAccountStore()
const passwordVisibility = ref<Record<number, boolean>>({})

const togglePasswordVisibility = (index: number) => {
  passwordVisibility.value[index] = !passwordVisibility.value[index]
}

onMounted(() => {
  accountStore.loadAccounts()
})

const validateAccount = (account: Account) => {
  account.errors = {
    label: '',
    type: '',
    login: '',
    password: '',
  }

  if (!account.login.trim()) {
    account.errors.login = 'Логин обязателен к заполнению'
  }

  if (account.type === 'Локальная' && !account.password?.trim()) {
    account.errors.password = 'Пароль обязателен к заполнению'
  }

  if (
    !account.errors.label &&
    !account.errors.type &&
    !account.errors.login &&
    !account.errors.password
  ) {
    accountStore.saveAccount(account)
  }
}

const handleTypeChange = (account: Account) => {
  if (account.type === 'LDAP') {
    account.password = null
  } else {
    account.password = ''
  }
  validateAccount(account)
}
</script>

<template>
  <div class="container mx-auto p-6 max-w-[950px]">
    <div class="bg-white rounded-lg shadow-md p-6">
      <header class="flex gap-4 items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Учетные записи</h1>
        <button
          @click="accountStore.addAccount()"
          class="bg-blue-500 transition cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xl font-bold"
          aria-label="Добавить учетную запись"
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
              class="text-red-500 transition hover:text-red-700 cursor-pointer"
              aria-label="Удалить учетную запись"
            >
              <DeleteIcon/>
            </button>
          </div>

          <div class="flex gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Метки</label>
              <input
                type="text"
                v-model="account.labelInput"
                @blur="validateAccount(account)"
                maxlength="50"
                placeholder="Введите метки через ;"
                class="w-full px-3 py-2 border rounded-md"
                :class="{ 'border-red-500': account.errors.label }"
              />
              <p v-if="account.errors.label" class="mt-1 text-sm text-red-500">
                {{ account.errors.label }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Тип записи</label>
              <select
                v-model="account.type"
                @change="handleTypeChange(account)"
                class="w-full px-3 py-2 border rounded-md cursor-pointer"
                :class="{ 'border-red-500': account.errors.type }"
              >
                <option value="LDAP">LDAP</option>
                <option value="Локальная">Локальная</option>
              </select>
              <p v-if="account.errors.type" class="mt-1 text-sm text-red-500">
                {{ account.errors.type }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Логин*</label>
              <input
                type="text"
                v-model="account.login"
                @blur="validateAccount(account)"
                maxlength="100"
                placeholder="Введите логин"
                class="w-full px-3 py-2 border rounded-md"
                :class="{ 'border-red-500': account.errors.login }"
              />
              <p v-if="account.errors.login" class="mt-1 text-sm text-red-500">
                {{ account.errors.login }}
              </p>
            </div>

            <div v-if="account.type === 'Локальная'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Пароль*</label>
              <div class="relative">
                <input
                  :type="passwordVisibility[index] ? 'text' : 'password'"
                  v-model="account.password"
                  @blur="validateAccount(account)"
                  maxlength="100"
                  placeholder="Введите пароль"
                  class="w-full px-3 py-2 border rounded-md pr-10"
                  :class="{ 'border-red-500': account.errors.password }"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility(index)"
                  class="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                  aria-label="Показать/скрыть пароль"
                >
                  <ShowPasswordIcon v-if="passwordVisibility[index]" :index="index"/>
                  <HidePasswordIcon v-else :index="index"/>
                </button>
              </div>
              <p v-if="account.errors.password" class="mt-1 text-sm text-red-500">
                {{ account.errors.password }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
