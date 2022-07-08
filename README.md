<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="NestJS Logo" />
  </a>
</div>

<h3 align="center">NestJs-File-System </h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
<img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation
##### Installation 
> npm install nestjs-file-system

### About nestjs-file-system

*** Pre-release, in development ***

This library uses a peerDependency for the extraction of .zip file, if you want to use this feature you will have to install this dependency.

I'm coding this library for my needs, but I'm open to feature submissions

### Inject module in your nestJs project

NestJs-File-System is build using the NestJs Dynamic modules and Factory providers approach, to configure it import the `NfsModule` module and the `forRootFtpAsync` service.

For example, your `AppModule` should look like this :

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NfsModule } from 'nestjs-file-system';

@Module({
  imports: [
    ConfigModule,
    NfsModule.forRootFtpAsync(),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
```
Then just inject the service just like any local service

For Example:

```typescript
import { Injectable, ServiceUnavailableException, Logger } from '@nestjs/common';
import { NfsModule } from 'nestjs-file-system';

@Injectable()
export class AppService {
    private logger = new Logger('AppService', { timestamp: true });
    constructor(private readonly _nfsService: NfsModule){}

  public listFile(path: string): Dirent[] {
    try {
      return this._nfsService.listFile(path)
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }
}

```

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
