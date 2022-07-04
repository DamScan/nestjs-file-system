import { ModuleMetadata } from '@nestjs/common/interfaces';
import { INFSOptions } from './options.interface';

export interface INFSConfig extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<INFSOptions> | INFSOptions;
  inject?: any[];
}
