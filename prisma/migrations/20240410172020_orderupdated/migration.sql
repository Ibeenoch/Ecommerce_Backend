/*
  Warnings:

  - You are about to drop the column `address` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalItems` on the `order` table. All the data in the column will be lost.
  - Added the required column `productDetails` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `address`,
    DROP COLUMN `productId`,
    DROP COLUMN `totalAmount`,
    DROP COLUMN `totalItems`,
    ADD COLUMN `productDetails` JSON NOT NULL,
    MODIFY `status` ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'DECLINED') NULL DEFAULT 'PENDING';
