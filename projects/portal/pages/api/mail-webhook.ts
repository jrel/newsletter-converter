import { makeMailWebhook } from '@newsletter-converter/core';
import { adaptNextJsApi } from '../../src/adpaters/nextjs-api';

export default adaptNextJsApi(makeMailWebhook());
