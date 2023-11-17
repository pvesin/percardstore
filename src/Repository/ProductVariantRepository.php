<?php

declare(strict_types=1);

namespace App\Repository;

use Asdoria\SyliusQuickShoppingPlugin\Repository\Model\ProductVariantRepositoryAwareInterface;
use Asdoria\SyliusQuickShoppingPlugin\Repository\ProductVariantRepositoryTrait;
use Sylius\Bundle\CoreBundle\Doctrine\ORM\ProductVariantRepository as BaseProductVariantRepository;

final class ProductVariantRepository extends BaseProductVariantRepository implements ProductVariantRepositoryAwareInterface
{
    use ProductVariantRepositoryTrait;
}
