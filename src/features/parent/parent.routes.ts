import { Router } from 'express';
import parentController from './parent.controller';
import middlewares from '../../middleware';

const {
    createParent   
} = parentController;

const { validateParent } = middlewares;

const parentRouter = Router()

parentRouter.post("/register", validateParent, createParent);

export default parentRouter;




