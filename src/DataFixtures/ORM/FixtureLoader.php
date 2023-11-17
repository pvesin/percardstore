<?php
declare(strict_types=1);

namespace App\DataFixtures\ORM;

use BitBag\SyliusCmsPlugin\Entity\MediaInterface;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Nelmio\Alice\Loader\NativeLoader;
use Nelmio\Alice\Throwable\LoadingThrowable;
use Sylius\Component\Core\Model\ImageInterface;
use Sylius\Component\Resource\Model\ResourceInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class FixtureLoader
 * @package App\DataFixtures\ORM
 */
class FixtureLoader extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * Get the order of this fixture.
     *
     * @return int
     */
    public function getOrder()
    {
        return 2;
    }

    /**
     * @param ObjectManager $manager
     *
     * @throws LoadingThrowable
     */
    public function load(ObjectManager $manager)
    {
        $dir = __DIR__.'/../../Resources/fixtures/dev/';

        try {
            $loader    = new NativeLoader();
            $objectSet = $loader->loadFile($dir . 'fixtures.yaml');

            /** @var ResourceInterface $object */
            foreach ($objectSet->getObjects() as $object) {
                $this->processImg($object);
                $manager->persist($object);
            }
            $manager->flush();
        } catch(\Exception $e) {
            var_dump($e);exit;
        }
    }

    /**
     * @param ResourceInterface $resource
     */
    protected function processImg(ResourceInterface $resource)
    {
        if (!$resource instanceof ImageInterface && !$resource instanceof MediaInterface) {
            return;
        }

        $path = sprintf( __DIR__.'/../../Resources/fixtures/images/%s', $resource->getPath());

        $resource->setFile(new UploadedFile($path, $resource->getPath()));
        $resource->setPath(null);

        if ($resource instanceof ImageInterface) {
            $this->container->get('sylius.image_uploader')->upload($resource);
            return;
        }

        $this->container->get('bitbag_sylius_cms_plugin.resolver.media_provider')->resolveProvider($resource)->upload($resource);
    }
}
