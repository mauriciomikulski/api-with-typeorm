import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { log } from "../utils/LogHelper";
import { LOG_CONSTANTS } from "../configs/constants/LogConstants";

export class ExtractTokenProvider {
  static async extract(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const NAMESPACE = 'ExtractTokenProvider';
    try {
      const token = req.headers.authorization;
      if (token) {
        const tokenParts = token.split(' ');
        if (tokenParts.length === 2) {
          const tokenType = tokenParts[0];
          const tokenValue = tokenParts[1];
          if (tokenType === 'Bearer') {
            jwt.verify(tokenValue, process.env.JWT_SECRET, (error, decoded) => {
              if (error) {
                log(NAMESPACE, error.message, LOG_CONSTANTS.LOG_LEVEL.ERROR, error);
                return res.status(401).json({
                  message: error.message,
                  error: error
                });
              } else {
                res.locals.jwt = decoded;
                next();
              }
            });
          } else {
            return res.status(401).json({
              message: 'Invalid token type'
            });
          }
        } else {
          return res.status(401).json({
            message: 'Invalid token format'
          });
        }
      } else {
        return res.status(401).json({
          message: 'Not authorized'
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Unexpected error.' });
    }
  }

}