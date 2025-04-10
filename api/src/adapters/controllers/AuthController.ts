import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { GetUserProfileUseCase } from "../../application/use-cases/GetUserProfileUseCase";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository, process.env.JWT_SECRET as string);
const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      await registerUserUseCase.execute(email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await loginUserUseCase.execute(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
