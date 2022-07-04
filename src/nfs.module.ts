import { DynamicModule, Module } from '@nestjs/common';
import { InjectionToken } from './application/injection.token';
import { NfsService } from './nfs.service';
import { INFSConfig } from './interface/config.interface';

@Module({})
export class NfsModule {
  static forRootNfsAsync(options: INFSConfig): DynamicModule {
    return {
      module: NfsModule,
      imports: options.imports || [],
      providers: [
        {
          provide: InjectionToken.NFS_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        NfsService,
      ],
      exports: [NfsService],
    };
  }
}
