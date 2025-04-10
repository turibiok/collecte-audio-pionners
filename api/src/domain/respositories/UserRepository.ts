import User from "../entities/User";

export default interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
    findById(id: number): Promise<User | null>;
}
  