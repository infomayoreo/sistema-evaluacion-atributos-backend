import authRoutes from './authenticate/auth.routes';
import usersRoutes from './users/users.routes';
import attributeRouter from './attributes/attribute.routes'

const routes = [authRoutes,usersRoutes,attributeRouter];

export {
    routes
}