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
            this.response.status(501).json({ error: error.message });
            break;
          case 'UnauthorizedException':
            this.response.status(401).json({ error: error.message });
            break;
          case 'NotFoundException':
            this.response.status(404).json({ error: error.message });
            break;
          case 'ConflictException':
            this.response.status(409).json({ error: error.message });
            break;
          case 'ValidationException':
            this.response.status(422).json({ error: error.message });
            break;
          case 'ForbiddenException':
            this.response.status(403).json({ error: error.message });
            break;
          case 'InternalServerErrorException':
            this.response.status(500).json({ error: error.message });
            break;
          case 'GraphQLError':
            this.response.status(400).json({ error: error.message });
            break;
          case 'InternalServerErrorException':
            this.response.status(500).json({ error: error.message });
            break;
          case 'PermissionDeniedException':
            this.response.status(403).json({ error: error.message });
            break;
          case 'CatalogValidationError':
            this.response.status(422).json({ error: JSON.parse(error.message) });
            break;
          default:
            this.response.status(501).json({ error: 'unable to process request!, please try later' });
            break;
        }
      }
}