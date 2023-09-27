import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../../../../swagger.json';
import authRouter from '../../../../modules/authentication/infra/http/routes/authentication.routes';
import verifyToken from '../../../middlewares/auth.middleware';

const router = Router();

router.get('/health', verifyToken, (_req, _res) => {
  _res.json({ message: 'API is healthy' });
});

// Authentication Endpoints
router.use('/auth', authRouter);

router.get('/swagger', (_req, _res) => {
  _res.json(swaggerDocument);
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
