export interface Label {
    text: string;
  }
  
  export interface AccountErrors {
    label: string;
    type: string;
    login: string;
    password: string;
  }
  
  export interface Account {
    labelInput: string;
    labels: Label[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
    errors: AccountErrors;
  }