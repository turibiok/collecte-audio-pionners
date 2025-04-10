import UserRepository from "../../domain/respositories/UserRepository";
import User  from "../../domain/entities/User";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(null, email, hashedPassword);
    await this.userRepository.save(newUser);
  }
}
