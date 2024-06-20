import UserService from './services/user.service.js';
import EmailService from './services/email.service.js';
import AuthService from './services/auth.service.js';

const startApp = async () => {
    // Start services
    await UserService.start();
    await EmailService.start();
    await AuthService.start();

    try {
        // Simulate user creation
        const newUser = await UserService.call('user.createUser', {
            username: 'nabendu',
            email: 'nabendu@gmail.com',
        });
        console.log(`New User Created: ${JSON.stringify(newUser)}`);
        const users = await UserService.call('user.getUsers');
        console.log(`All Users: ${JSON.stringify(users)}`);
        // Simulate sending email
        const emailResult = await EmailService.call('email.sendEmail', {
            recipient: newUser.email,
            subject: 'Welcome to our Company!',
            content: 'Thank you for Joining',
        });
        console.log(emailResult);
        // Simulate auth
        const authResult = await AuthService.call('auth.authUser', {
            username: 'admin',
            password: 'password',
        });
        console.log('Auth result:', authResult);
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
    }
}

startApp();