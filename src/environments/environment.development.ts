export interface Environment {
  production: boolean;
  api: string;
}

export const environment: Environment = {
  production: true,
  api: 'http://localhost:8080/api/users',
};
