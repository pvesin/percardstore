<?php

declare(strict_types=1);

namespace App\Repository\Model\Aware;

use Doctrine\ORM\QueryBuilder;
use Sylius\Component\Channel\Model\ChannelInterface;

/**
 * Interface ProductSearchAwareInterface
 * @package App\Repository\Model\Aware
 */
interface ProductSearchRepositoryAwareInterface
{
    /**
     * @param ChannelInterface $channel
     * @param string           $locale
     *
     * @return QueryBuilder
     */
    public function createSearchShopListQueryBuilder(
        ChannelInterface $channel,
        string $locale
    ): QueryBuilder;

    /**
     * Creates a new QueryBuilder instance that is prepopulated for this entity name.
     *
     * @param string $alias
     * @param string $indexBy The index for the from.
     *
     * @return QueryBuilder
     */
    public function createQueryBuilder($alias, $indexBy = null);
}
