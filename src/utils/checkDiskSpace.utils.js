import checkDiskSpace from 'check-disk-space';
import logger from '../config/winston.congif.js';

const checkDisk = async () => {
  try {
    const diskSpace = await checkDiskSpace('/');

    const freeGB = diskSpace.free / (1024 * 1024 * 1024);
    const totalGB = diskSpace.size / (1024 * 1024 * 1024);
    const freePercent = (freeGB / totalGB) * 100;

    if (freePercent < 10) {
      logger.warn(`Serverda bo'sh disk joyi kam: ${freePercent.toFixed(2)}% qoldi.`);
    } else {
      logger.info(`Disk holati yaxshi: ${freePercent.toFixed(2)}% bo'sh.`);
    }

  } catch (error) {
    logger.error(`Disk holatini tekshirishda xatolik: ${error.message}`);
  }
};

export default checkDisk;
