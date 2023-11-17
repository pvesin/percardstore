<?php
declare(strict_types=1);

namespace App\Repository\Model;

use Sylius\Component\Core\Repository\ProductRepositoryInterface as BaseProductRepositoryInterface;
use App\Repository\Model\Aware\ProductSearchRepositoryAwareInterface;

/**
 * Interface ProductRepositoryInterface
 * @package App\Repository\Model
 */
interface ProductRepositoryInterface extends
    BaseProductRepositoryInterface,
    ProductSearchRepositoryAwareInterface
{

}
