interface RegisterTypes {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponseTypes {
  username: string;
  jwtToken: string;
  role: string;
  message: string;
}
