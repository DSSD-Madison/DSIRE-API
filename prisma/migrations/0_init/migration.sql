-- CreateTable
CREATE TABLE `authority` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,
    `order` INTEGER NULL,
    `code` VARCHAR(255) NULL,
    `website` VARCHAR(255) NULL,
    `enacted` DATETIME(0) NULL,
    `enactedtext` VARCHAR(255) NULL,
    `effective` DATETIME(0) NULL,
    `effectivetext` VARCHAR(255) NULL,
    `expired` DATETIME(0) NULL,
    `expiredtext` VARCHAR(255) NULL,
    `file_key` VARCHAR(255) NULL,
    `file_name` VARCHAR(255) NULL,

    INDEX `fk_authority_program_idx`(`program_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `state_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_utility_state1_idx`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_ts` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_ts` TIMESTAMP(0) NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `organization_name` VARCHAR(45) NULL,
    `web_visible_default` BOOLEAN NOT NULL DEFAULT false,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `website_url` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `state_id` INTEGER UNSIGNED NULL,
    `zip` VARCHAR(255) NULL,

    INDEX `state_id`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `county` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `state_id` INTEGER UNSIGNED NULL,

    INDEX `fk_utility_state1_idx`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `energy_category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `export` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(255) NOT NULL,
    `created_ts` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `type` VARCHAR(8) NOT NULL,
    `size` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `implementing_sector` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parameter` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `parameter_set_id` INTEGER UNSIGNED NOT NULL,
    `source` VARCHAR(45) NULL,
    `qualifier` VARCHAR(45) NULL,
    `amount` DECIMAL(10, 4) NULL,
    `units` VARCHAR(45) NULL,

    INDEX `fk_parameter_parameter_set1_idx`(`parameter_set_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parameter_set` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_parameter_set_program1_idx`(`program_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parameter_set_sector` (
    `sector_id` INTEGER UNSIGNED NOT NULL,
    `set_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_parameter_set_sector_set1`(`set_id`),
    UNIQUE INDEX `sector_id`(`sector_id`, `set_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parameter_set_technology` (
    `technology_id` INTEGER UNSIGNED NOT NULL,
    `set_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_parameter_set_technology_set1`(`set_id`),
    UNIQUE INDEX `technology_id`(`technology_id`, `set_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER UNSIGNED NOT NULL,
    `is_entire_state` BOOLEAN NOT NULL DEFAULT false,
    `implementing_sector_id` INTEGER UNSIGNED NOT NULL,
    `program_category_id` INTEGER UNSIGNED NOT NULL,
    `program_type_id` INTEGER UNSIGNED NOT NULL,
    `created_by_user_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(45) NULL,
    `name` VARCHAR(255) NULL,
    `updated_ts` DATETIME(0) NULL,
    `created_ts` TIMESTAMP(0) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `websiteurl` VARCHAR(255) NULL,
    `administrator` VARCHAR(255) NULL,
    `fundingsource` VARCHAR(255) NULL,
    `budget` VARCHAR(255) NULL,
    `start_date` DATETIME(0) NULL,
    `start_date_text` VARCHAR(255) NULL,
    `end_date` DATETIME(0) NULL,
    `end_date_text` VARCHAR(255) NULL,
    `summary` TEXT NULL,
    `additional_technologies` TEXT NULL,
    `fromSir` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_program_implementing_sector1_idx`(`implementing_sector_id`),
    INDEX `fk_program_program_category1_idx`(`program_category_id`),
    INDEX `fk_program_program_type1_idx`(`program_type_id`),
    INDEX `fk_program_state1_idx`(`state_id`),
    INDEX `fk_program_user1_idx`(`created_by_user_id`),
    INDEX `ix_code`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_city` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `city_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_city_program1_idx`(`program_id`),
    UNIQUE INDEX `city_id`(`city_id`, `program_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_contact` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,
    `contact_id` INTEGER UNSIGNED NOT NULL,
    `webvisible` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_program_contact_contact1_idx`(`contact_id`),
    INDEX `fk_program_contact_program1_idx`(`program_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_county` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `county_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_county_program1_idx`(`program_id`),
    UNIQUE INDEX `county_id`(`county_id`, `program_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_detail` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `value` TEXT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,
    `template_id` INTEGER UNSIGNED NULL,

    INDEX `fk_program_detail_program1`(`program_id`),
    INDEX `fk_program_detail_template1`(`template_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_detail_template` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER UNSIGNED NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `display_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `fk_program_detail_type1`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_memo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,
    `added_by_user` INTEGER UNSIGNED NOT NULL,
    `added` DATETIME(0) NULL,
    `memo` TEXT NULL,

    INDEX `fk_program_memo_program1_idx`(`program_id`),
    INDEX `fk_program_memo_user1_idx`(`added_by_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_sector` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `sector_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_sector_program1_idx`(`program_id`),
    INDEX `fk_program_sector_sector1_idx`(`sector_id`),
    PRIMARY KEY (`program_id`, `sector_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_technology` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `technology_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_technology_program1_idx`(`program_id`),
    INDEX `fk_program_technology_technology1_idx`(`technology_id`),
    PRIMARY KEY (`program_id`, `technology_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `program_category_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_type_program_category1_idx`(`program_category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_utility` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `utility_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_program_utility_program1_idx`(`program_id`),
    INDEX `fk_program_utility_utility1_idx`(`utility_id`),
    PRIMARY KEY (`program_id`, `utility_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_zipcode` (
    `program_id` INTEGER UNSIGNED NOT NULL,
    `zipcode_id` INTEGER UNSIGNED NOT NULL,

    INDEX `program_id`(`program_id`),
    INDEX `zipcode_id`(`zipcode_id`),
    PRIMARY KEY (`program_id`, `zipcode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `search_log` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `searchdate` DATETIME(0) NULL,
    `ip` VARCHAR(45) NULL,
    `filtertype` VARCHAR(45) NULL,
    `text` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sector` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `fieldname` VARCHAR(45) NULL,
    `is_selectable` BOOLEAN NOT NULL DEFAULT true,
    `parent_id` INTEGER UNSIGNED NULL,

    INDEX `parent_id`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `abbreviation` CHAR(2) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `is_territory` BOOLEAN NOT NULL DEFAULT false,

    INDEX `abbreviation`(`abbreviation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state_info_content` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER UNSIGNED NOT NULL,
    `introduction` TEXT NULL,
    `history` TEXT NULL,
    `renewable_portfolio_standard` TEXT NULL,
    `organizations` TEXT NULL,
    `programs` TEXT NULL,
    `footnotes` TEXT NULL,

    UNIQUE INDEX `state_id`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription_memo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `program_id` INTEGER UNSIGNED NOT NULL,
    `added_by_user` INTEGER UNSIGNED NOT NULL,
    `added` DATETIME(0) NULL,
    `memo` TEXT NULL,

    INDEX `fk_subscription_memo_program1_idx`(`program_id`),
    INDEX `fk_subscription_memo_user1_idx`(`added_by_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technology` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `technology_category_id` INTEGER UNSIGNED NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,

    INDEX `fk_technology_technology_category1_idx`(`technology_category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technology_category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `energy_category_id` INTEGER UNSIGNED NOT NULL,

    INDEX `energy_category_id`(`energy_category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technology_info_content` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `state_id` INTEGER UNSIGNED NOT NULL,
    `technology_filter` VARCHAR(180) NOT NULL,
    `introduction` TEXT NULL,
    `history` TEXT NULL,
    `technology_details` TEXT NULL,
    `programs` TEXT NULL,
    `footnotes` TEXT NULL,

    UNIQUE INDEX `state_id`(`state_id`, `technology_filter`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(50) NULL,
    `password` VARCHAR(128) NULL,
    `password_token` VARCHAR(128) NULL,
    `first_name` VARCHAR(128) NULL,
    `last_name` VARCHAR(128) NULL,
    `role` VARCHAR(8) NOT NULL DEFAULT 'guest',
    `state` CHAR(8) NULL DEFAULT 'active',
    `created_ts` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_ts` TIMESTAMP(0) NULL,

    INDEX `email`(`email`),
    INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utility` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `state_id` INTEGER UNSIGNED NOT NULL,
    `utility_id` INTEGER NOT NULL,

    INDEX `fk_utility_state1_idx`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utility_zipcode` (
    `utility_id` INTEGER UNSIGNED NOT NULL,
    `zipcode_id` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_utility_zipcode_utility1_idx`(`utility_id`),
    INDEX `fk_utility_zipcode_zipcode1_idx`(`zipcode_id`),
    PRIMARY KEY (`utility_id`, `zipcode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zipcode` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `zipcode` VARCHAR(16) NOT NULL,
    `city_id` INTEGER UNSIGNED NOT NULL,
    `state_id` INTEGER UNSIGNED NOT NULL,
    `county_id` INTEGER UNSIGNED NOT NULL,
    `latitude` DECIMAL(10, 0) NULL,
    `longitude` DECIMAL(10, 0) NULL,

    UNIQUE INDEX `zipcode`(`zipcode`),
    INDEX `fk_zipcode_city1`(`city_id`),
    INDEX `fk_zipcode_county1`(`county_id`),
    INDEX `fk_zipcode_state1`(`state_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authority` ADD CONSTRAINT `fk_authority_program` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `city` ADD CONSTRAINT `fk_city_state1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `contact` ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `county` ADD CONSTRAINT `fk_county_state1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter` ADD CONSTRAINT `fk_parameter_parameter_set1` FOREIGN KEY (`parameter_set_id`) REFERENCES `parameter_set`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter_set` ADD CONSTRAINT `fk_parameter_set_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter_set_sector` ADD CONSTRAINT `fk_parameter_set_sector_sector1` FOREIGN KEY (`sector_id`) REFERENCES `sector`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter_set_sector` ADD CONSTRAINT `fk_parameter_set_sector_set1` FOREIGN KEY (`set_id`) REFERENCES `parameter_set`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter_set_technology` ADD CONSTRAINT `fk_parameter_set_technology_set1` FOREIGN KEY (`set_id`) REFERENCES `parameter_set`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parameter_set_technology` ADD CONSTRAINT `fk_parameter_set_technology_technology1` FOREIGN KEY (`technology_id`) REFERENCES `technology`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `fk_program_implementing_sector1` FOREIGN KEY (`implementing_sector_id`) REFERENCES `implementing_sector`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `fk_program_program_category1` FOREIGN KEY (`program_category_id`) REFERENCES `program_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `fk_program_program_type1` FOREIGN KEY (`program_type_id`) REFERENCES `program_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `fk_program_state1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program` ADD CONSTRAINT `fk_program_user1` FOREIGN KEY (`created_by_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_city` ADD CONSTRAINT `fk_program_city_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_city` ADD CONSTRAINT `program_city_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `program_contact` ADD CONSTRAINT `fk_program_contact_contact1` FOREIGN KEY (`contact_id`) REFERENCES `contact`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_contact` ADD CONSTRAINT `fk_program_contact_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_county` ADD CONSTRAINT `fk_program_county_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_county` ADD CONSTRAINT `program_county_ibfk_1` FOREIGN KEY (`county_id`) REFERENCES `county`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `program_detail` ADD CONSTRAINT `fk_program_detail_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_detail` ADD CONSTRAINT `program_detail_ibfk_1` FOREIGN KEY (`template_id`) REFERENCES `program_detail_template`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `program_detail_template` ADD CONSTRAINT `fk_program_detail_type1` FOREIGN KEY (`type_id`) REFERENCES `program_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_memo` ADD CONSTRAINT `fk_program_memo_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_memo` ADD CONSTRAINT `fk_program_memo_user1` FOREIGN KEY (`added_by_user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_sector` ADD CONSTRAINT `fk_program_sector_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_sector` ADD CONSTRAINT `fk_program_sector_sector1` FOREIGN KEY (`sector_id`) REFERENCES `sector`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_technology` ADD CONSTRAINT `fk_program_technology_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_technology` ADD CONSTRAINT `fk_program_technology_technology1` FOREIGN KEY (`technology_id`) REFERENCES `technology`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_type` ADD CONSTRAINT `fk_program_type_program_category1` FOREIGN KEY (`program_category_id`) REFERENCES `program_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_utility` ADD CONSTRAINT `fk_program_utility_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_utility` ADD CONSTRAINT `fk_program_utility_utility1` FOREIGN KEY (`utility_id`) REFERENCES `utility`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_zipcode` ADD CONSTRAINT `program_zipcode_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `program_zipcode` ADD CONSTRAINT `program_zipcode_ibfk_2` FOREIGN KEY (`zipcode_id`) REFERENCES `zipcode`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sector` ADD CONSTRAINT `sector_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `state_info_content` ADD CONSTRAINT `state_info_content_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription_memo` ADD CONSTRAINT `fk_subscription_memo_program1` FOREIGN KEY (`program_id`) REFERENCES `program`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subscription_memo` ADD CONSTRAINT `fk_subscription_memo_user1` FOREIGN KEY (`added_by_user`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `technology` ADD CONSTRAINT `fk_technology_technology_category1` FOREIGN KEY (`technology_category_id`) REFERENCES `technology_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `technology_category` ADD CONSTRAINT `technology_category_ibfk_1` FOREIGN KEY (`energy_category_id`) REFERENCES `energy_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `technology_info_content` ADD CONSTRAINT `technology_info_content_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utility` ADD CONSTRAINT `fk_utility_state1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `utility_zipcode` ADD CONSTRAINT `fk_utility_zipcode_utility1` FOREIGN KEY (`utility_id`) REFERENCES `utility`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `utility_zipcode` ADD CONSTRAINT `fk_utility_zipcode_zipcode1` FOREIGN KEY (`zipcode_id`) REFERENCES `zipcode`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `zipcode` ADD CONSTRAINT `fk_zipcode_city1` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `zipcode` ADD CONSTRAINT `fk_zipcode_county1` FOREIGN KEY (`county_id`) REFERENCES `county`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `zipcode` ADD CONSTRAINT `fk_zipcode_state1` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

