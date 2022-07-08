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
   *  Method for deflate zip file ( warning: peerDependencies adm-zip must be )
   * @param entry file to decompress
   * @param targetPath folder in which the files will be decompressed
   * @param overWrite overwrite existing files
   * @param keepOriginalPermission // overide natural permission
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
   * @param entry file or folder to delete
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
  /**
   * @param folder folder where the files should be listed
   * @returns <array of file included in this folder>
   */
  listFile(folder: string): fs.Dirent[] {
    try {
      return fs.readdirSync(path.resolve(folder), {
        withFileTypes: true,
      });
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }
  /**
   * @param path path or folder to create
   */
  async makeDirectory(path: string): Promise<void> {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, 0o766);
      }
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new ServiceUnavailableException(e);
    }
  }
}
