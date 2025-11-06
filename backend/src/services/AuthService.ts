import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

export class AuthService {
  private users: User[] = [];
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'marketplace-secret-key-2024';

  public authService = {
    AuthService: {
      AuthPort: {
        Login: async (args: any) => {
          try {
            const { username, password } = args;
            console.log('Login attempt for user:', username);
            
            const user = this.users.find(u => u.username === username);
            if (!user) {
              return { success: false, message: 'Utilisateur non trouvé' };
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
              return { success: false, message: 'Mot de passe incorrect' };
            }

            const token = jwt.sign(
              { userId: user.id, username: user.username },
              this.JWT_SECRET,
              { expiresIn: '24h' }
            );

            return {
              success: true,
              message: 'Connexion réussie',
              token,
              user: { id: user.id, username: user.username, email: user.email }
            };
          } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Erreur serveur' };
          }
        },

        Register: async (args: any) => {
          try {
            const { username, password, email } = args;
            console.log('Registration attempt for user:', username);
            
            const existingUser = this.users.find(u => u.username === username);
            if (existingUser) {
              return { success: false, message: 'Utilisateur déjà existant' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser: User = {
              id: Date.now().toString(),
              username,
              password: hashedPassword,
              email
            };

            this.users.push(newUser);
            console.log('User registered successfully:', username);

            return {
              success: true,
              message: 'Utilisateur créé avec succès',
              user: { id: newUser.id, username: newUser.username, email: newUser.email }
            };
          } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Erreur lors de la création' };
          }
        }
      }
    }
  };
}