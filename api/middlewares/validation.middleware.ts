import { validationResult } from 'express-validator';

export const validate = validations => async (req, res, next) => {
      for(let validation of validations) {
        const result = await validation.run(req);
      }
  
      const errors = validationResult(req);
      if(errors.isEmpty()) {
        return next();
    }
  
    res.status(400).json({ errors: errors.array() });
};
