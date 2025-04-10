import UserRepository from "../../domain/respositories/UserRepository";
import User  from "../../domain/entities/User";

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
