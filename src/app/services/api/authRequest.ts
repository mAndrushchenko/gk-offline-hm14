export const authRequest = async (email: string, password: string) => {
  const encode = window.btoa(`${email}:${password}`);
  await fetch('http://localhost:4200', {
    method: 'POST', headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${encode}`
    }
  });
};
