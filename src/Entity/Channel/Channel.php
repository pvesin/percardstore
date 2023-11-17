<?php

declare(strict_types=1);

namespace App\Entity\Channel;

use Asdoria\SyliusCatalogModePlugin\Model\Aware\CatalogModeAwareInterface;
use Asdoria\SyliusCatalogModePlugin\Traits\CatalogModeTrait;
use Doctrine\ORM\Mapping as ORM;
use Sylius\Component\Core\Model\Channel as BaseChannel;

/**
 * @ORM\Entity
 * @ORM\Table(name="sylius_channel")
 */
#[ORM\Entity]
#[ORM\Table(name: 'sylius_channel')]
class Channel extends BaseChannel implements CatalogModeAwareInterface
{
    use CatalogModeTrait;
}
