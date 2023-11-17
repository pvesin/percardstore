<?php
declare(strict_types=1);

namespace App\Model\Order;

use Sylius\Component\Core\Model\OrderInterface as BaseOrderInterface;

/**
 * Interface OrderInterface
 * @package App\Model\Order
 */
interface OrderInterface extends BaseOrderInterface
{
    /**
     * @return int
     */
    public function getTotalBaseQuantity(): int;
}
