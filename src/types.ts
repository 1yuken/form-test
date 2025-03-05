export interface Label {
    text: string;
  }
  
  export interface Account {
    labelInput: string;
    labels: Label[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
  }