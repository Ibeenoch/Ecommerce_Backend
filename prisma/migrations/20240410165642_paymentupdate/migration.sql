/*
  Warnings:

  - You are about to drop the column `PaymentProviderId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `paymentprovider` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_PaymentProviderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `PaymentProviderId`,
    DROP COLUMN `fee`,
    ADD COLUMN `paymentDetails` JSON NOT NULL,
    MODIFY `userId` INTEGER NULL,
    MODIFY `orderId` INTEGER NULL;

-- DropTable
DROP TABLE `paymentprovider`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
