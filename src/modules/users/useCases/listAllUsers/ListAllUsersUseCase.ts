import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isAdmin = this.isUserAdmin(user_id);

    if (!isAdmin) {
      throw new Error("You do not have permission!");
    }

    const users = this.usersRepository.list();

    return users;
  }

  isUserAdmin(user_id: string): boolean {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    if (!user.admin) {
      return false;
    }

    return true;
  }
}

export { ListAllUsersUseCase };
