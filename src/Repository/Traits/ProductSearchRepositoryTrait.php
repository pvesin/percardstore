<?php

declare(strict_types=1);

namespace App\Repository\Traits;

use Doctrine\ORM\QueryBuilder;
use Sylius\Component\Channel\Model\ChannelInterface;

/**
 * Trait ProductRepositoryTrait
 * @package App\Repository\Traits
 */
trait ProductSearchRepositoryTrait
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
    ): QueryBuilder
    {
        $qb = $this->createQueryBuilder('o')
            ->innerJoin('o.translations', 'translation', 'WITH', 'translation.locale = :locale')
            ->leftJoin('o.variants', 'variant')
            ->leftJoin('o.channels', 'channel','WITH', 'channel.code = :channelCode')
            ->andWhere('o.enabled = true')
            ->setParameter('channelCode', $channel->getCode())
            ->setParameter('locale', $locale)
            ->orderBy('o.code', 'ASC')
            ->distinct();

        return $qb;
    }

    /**
     * Creates a new QueryBuilder instance that is prepopulated for this entity name.
     *
     * @param string $alias
     * @param string $indexBy The index for the from.
     *
     * @return QueryBuilder
     */
    abstract public function createQueryBuilder($alias, $indexBy = null);
}
