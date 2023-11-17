<?php
declare(strict_types=1);

namespace App\Twig;

use BitBag\SyliusCmsPlugin\Entity\MediaInterface;
use BitBag\SyliusCmsPlugin\Repository\MediaRepositoryInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Class MediaExtension
 * @package App\Twig
 */
class MediaExtension extends AbstractExtension
{
    /**
     * @param MediaRepositoryInterface $mediaRepository
     */
    public function __construct(protected MediaRepositoryInterface $mediaRepository)
    {
    }

    /**
     * @return TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('get_media', [$this, 'getMedia']),
            new TwigFunction('get_media_by_id', [$this, 'getMediaById']),
        ];
    }

    /**
     * @param int|null $id
     *
     * @return MediaInterface|null
     */
    public function getMediaById(?int $id): ?MediaInterface
    {
        if (empty($id)) return null;

        /** @var MediaInterface|null $media */
        $media = $this->mediaRepository->find($id);
        return $media;
    }

    /**
     * @param string|null $code
     *
     * @return MediaInterface|null
     */
    public function getMedia(?string $code): ?MediaInterface
    {
        if (empty($code)) return null;

        /** @var MediaInterface|null $media */
        $media = $this->mediaRepository->findOneBy(['code' => $code]);
        return $media;
    }
}
