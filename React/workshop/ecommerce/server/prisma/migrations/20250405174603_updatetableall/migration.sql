/*
  Warnings:

  - You are about to drop the column `titel` on the `product` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentcy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderedById` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_orderedById_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `productoncart` DROP FOREIGN KEY `ProductOnCart_productId_fkey`;

-- DropIndex
DROP INDEX `Order_orderedById_fkey` ON `order`;

-- DropIndex
DROP INDEX `ProductOnCart_cartId_fkey` ON `productoncart`;

-- DropIndex
DROP INDEX `ProductOnCart_productId_fkey` ON `productoncart`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `currentcy` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripePaymentId` VARCHAR(191) NOT NULL,
    MODIFY `orderedById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `titel`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
