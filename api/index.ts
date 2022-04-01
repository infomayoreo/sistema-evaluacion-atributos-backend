import authRoutes from './authenticate/auth.routes';
import usersRoutes from './users/users.routes';
import attributeRouter from './attributes/attribute.routes'
import personsRouter from './persons/persons.router'

const routes = [authRoutes,
    usersRoutes,
    attributeRouter,
    personsRouter];

export {
    routes
}