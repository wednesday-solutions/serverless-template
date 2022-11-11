/**
 *  Create the ORM model for the base entity
 */

import { getSequelize } from '@src/drivers/sequelize';

const TodoModel = getSequelize().define({});

export default TodoModel;
