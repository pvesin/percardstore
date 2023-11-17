<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\Model\ProductRepositoryInterface;
use BitBag\SyliusWishlistPlugin\Entity\WishlistInterface;
use BitBag\SyliusWishlistPlugin\Repository\WishlistRepositoryInterface;
use BitBag\SyliusWishlistPlugin\Resolver\WishlistsResolverInterface;
use Sylius\Component\Core\Model\ProductInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

/**
 * Class Wishlist
 * @package App\Controller\Wishlist
 *
 * @author  Clément Magnin <cma.asdoria@gmail.com>
 */
class WishlistController
{
    /** @var string */
    public const WISHLIST_STATUS_ADD = 'add';

    /** @var string */
    public const WISHLIST_STATUS_REMOVE = 'remove';

    /**
     * WishlistController constructor.
     *
     * @param Environment                 $twig
     * @param WishlistRepositoryInterface $wishlistRepository
     * @param ProductRepositoryInterface  $productRepository
     * @param WishlistsResolverInterface  $wishlistsResolver
     */
    public function __construct(
        protected Environment $twig,
        protected WishlistRepositoryInterface $wishlistRepository,
        protected ProductRepositoryInterface $productRepository,
        protected WishlistsResolverInterface $wishlistsResolver
    ) {}

    /**
     * @param Request $request
     *
     * @return Response
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function checkWishlist(Request $request): Response
    {
        $productId = $request->get('productId');
        $product   = $this->productRepository->find($productId);

        $status = self::WISHLIST_STATUS_ADD;

        /** @var WishlistInterface $wishlist */
        $wishlists = $this->wishlistsResolver->resolve();
        /** @var WishlistInterface $wishlist */
        $wishlist = array_shift($wishlists);
        if ($wishlist instanceof WishlistInterface && $product instanceof ProductInterface) {
            $status = $this->isInWishlist($wishlist, $product);
        }

        return new Response(
            $this->twig->render(
                '@SyliusShop/Product/wishlist.html.twig',
                [
                    'product' => $product,
                    'status'  => $status,
                ]
            )
        );
    }

    /**
     * @param WishlistInterface $wishlist
     * @param ProductInterface  $product
     *
     * @return string
     */
    public function isInWishlist(WishlistInterface $wishlist, ProductInterface $product): string
    {
        if ($wishlist->getProducts()->contains($product)) {
            return self::WISHLIST_STATUS_REMOVE;
        }

        return self::WISHLIST_STATUS_ADD;
    }


    /**
     * Get a user from the Security Token Storage.
     *
     * @return UserInterface|object|null
     *
     * @throws \LogicException If SecurityBundle is not available
     *
     * @see TokenInterface::getUser()
     */
    protected function getUser()
    {
        if (null === $token = $this->tokenStorage->getToken()) {
            return null;
        }

        if (!\is_object($user = $token->getUser())) {
            // e.g. anonymous authentication
            return null;
        }

        return $user;
    }
}
