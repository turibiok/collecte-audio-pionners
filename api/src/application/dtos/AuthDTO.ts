import {UserResponseDTO} from "./UserDTO"

export interface LoginDTO {
    email: string;
    password: string;
}
  
export interface AuthResponseDTO {
    token: string;
    user: UserResponseDTO;
}
  