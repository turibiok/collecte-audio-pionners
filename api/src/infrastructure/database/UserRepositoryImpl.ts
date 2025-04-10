import UserRepository from "../../domain/respositories/UserRepository";
import  User from "../../domain/entities/User";
import Database from "./Database";

export class UserRepositoryImpl implements UserRepository {
  private db: any;

  constructor() {
    Database.getInstance("mysql").then((connection) => {
      this.db = connection;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await this.db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return null;
    return new User(rows[0].id, rows[0].email, rows[0].password);
  }

  async save(user: User): Promise<void> {
    await this.db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
      user.email,
      user.password,
    ]);
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await this.db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return new User(rows[0].id, rows[0].email, rows[0].password);
  }
}
