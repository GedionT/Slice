import * as Exceptions from '../Exceptions/exceptions';
import Joi from '@hapi/joi';
import at from 'v-at';
import Logger from '../Helpers/Logger';


export default class Contoller {
    constructor(response) {
        this.response = response;
    }
    sendResponse(data) {
        this.response.status(200).json({ data });
    }

    

    handleException(error) {
        switch (error.name) {
          case 'GeneralException':
            this.response.status(501).json({ data: {error:error.message,success:false}});
            break;
          case 'UnauthorizedException':
            this.response.status(401).json({ data: {error:error.message,success:false}});
            break;
          case 'NotFoundException':
            this.response.status(404).json({ data: {error:error.message,success:false}});
            break;
          case 'ConflictException':
            this.response.status(409).json({ data: {error:error.message,success:false}});
            break;
          case 'ValidationException':
            this.response.status(422).json({ data: {error:error.message,success:false}});
            break;
          case 'ForbiddenException':
            this.response.status(403).json({ data: {error:error.message,success:false}});
            break;
          case 'InternalServerErrorException':
            this.response.status(500).json({ data: {error:error.message,success:false}});
            break;
          case 'GraphQLError':
            this.response.status(400).json({ data: {error:error.message,success:false}});
            break;
          case 'InternalServerErrorException':
            this.response.status(500).json({ data: {error:error.message,success:false}});
            break;
          case 'PermissionDeniedException':
            this.response.status(403).json({ data: {error:error.message,success:false}});
            break;
          case 'CatalogValidationError':
            this.response.status(422).json({ data: {error:error.message,success:false}});
            break;
          default:
            this.response.status(501).json({ data: {error:'unable to process request!, please try later',success:false}});
            break;
        }
      }
}