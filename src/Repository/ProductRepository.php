<?php
declare(strict_types=1);

namespace App\Repository;

use App\Repository\Model\ProductRepositoryInterface;
use App\Repository\Traits\ProductSearchRepositoryTrait;
use Sylius\Bundle\CoreBundle\Doctrine\ORM\ProductRepository as BaseProductRepository;


/**
 * Class ProductRepository
 * @package App\Repository
 */
class ProductRepository extends BaseProductRepository implements ProductRepositoryInterface
{
    use ProductSearchRepositoryTrait;
}
