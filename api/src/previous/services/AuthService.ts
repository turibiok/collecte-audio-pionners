import Database from "../config/Database";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export class AuthService {

    private static db : any;
    private static JWT_SECRET = process.env.JWT_SECRET as String;

    public static async init() {
        this.db = await Database.getInstance('mysql');
    }


    public static async register(email: string, password: string): Promise<string> {
        const [rows] = await this.db.execute("SELECT id FROM users WHERE email = ?", [email]);
            
        if ((rows as any[]).length > 0 ) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

        return "User registered successfully";
    }



    public static async login(email: string, password: string): Promise<{token: string}> {
        const [rows] = await this.db.execute("SELECT * FROM users WHERE email = ?", [email]);

        const user = (rows as any)[0];

        if (!user){
            throw new Error("Email or password is incorrect");
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Email or password is incorrect");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            }, 
            this.JWT_SECRET as string, { 
                expiresIn: "1h" 
            }
        ); 

        return { token };
    }

    public static async getUserProfile(userId: number): Promise<User> {
        const [rows] = await this.db.execute("SELECT id, email FROM users WHERE id = ?", [userId]);
        const user = (rows as any)[0];

        if (!user) {
            throw new Error("User not found");
        }


        return new User(user.email, "", user.id);
    }

}
