<?php

declare(strict_types=1);

namespace App\Entity\Order;

use App\Model\Order\OrderInterface;
use Doctrine\ORM\Mapping as ORM;
use Sylius\Component\Core\Model\Order as BaseOrder;

/**
 * @ORM\Entity
 * @ORM\Table(name="sylius_order")
 */
#[ORM\Entity]
#[ORM\Table(name: 'sylius_order')]
class Order extends BaseOrder implements OrderInterface
{
    /**
     * @return int
     */
    public function getTotalBaseQuantity(): int
    {
        $quantity = 0;

        foreach ($this->items as $item) {
            $quantity += $item->getQuantity();
        }

        return $quantity;
    }
}
