import UserRepository from "../../domain/respositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository, private jwtSecret: string) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, { expiresIn: "1h" });
    return { token };
  }
}
