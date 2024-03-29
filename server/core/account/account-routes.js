import { Router } from 'express';
import accountController from './account-controller.js';

const accountRouter = Router();

accountRouter.get('/:id', accountController.getAccoutnSetting);
accountRouter.post('/testConnection', accountController.testConnection);
accountRouter.put('/:id', accountController.setAccoutnSetting);

export default accountRouter;
