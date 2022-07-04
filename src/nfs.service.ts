import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class NfsService {
  private logger = new Logger('NestJs-File-System', { timestamp: true });
  constructor() {
    this.logger.log('Starting module', 'NfsService initialized');
  }
  /**
   *
   * @param entry
   * @param targetPath
   * @param overWrite
   * @param keepOriginalPermission
   */
  async deflateZip(
    entry: string,
    targetPath: string,
    overWrite?: boolean,
    keepOriginalPermission?: boolean,
  ): Promise<void> {
    try {
      this.logger.debug(`Starting deflate ${entry}`);
      const file2UnZip = new AdmZip(path.resolve(entry));
      file2UnZip.extractAllToAsync(
        targetPath,
        overWrite,
        keepOriginalPermission,
      );
    } catch (e) {
      this.logger.error(`Unable to deflate ${entry}`);
      throw new ServiceUnavailableException(e);
    }
  }
  /**
   *
   * @param entry
   */
  async deleteFile(entry: string): Promise<void> {
    try {
      this.logger.debug(`Deleting ${entry}`);
      fs.unlinkSync(entry);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }

  async listFile(folder: string): Promise<any> {
    try {
      return fs.readdirSync(folder);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }

  async makeDirectory(path: string): Promise<void> {
    try {
      console.log(path)
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, 0o766);
      }
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }
}
