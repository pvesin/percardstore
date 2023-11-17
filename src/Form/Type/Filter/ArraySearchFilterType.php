<?php
declare(strict_types=1);

namespace App\Form\Type\Filter;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class ArraySearchFilter
 * @package App\Form\Type\Filter
 *
 * @author  Philippe Vesin <pve.asdoria@gmail.com>
 */
class ArraySearchFilterType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver
            ->setDefaults([
                'data_class' => null,
                'required' => false,
                'placeholder' => 'sylius.ui.search',
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent(): string
    {
        return TextType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string
    {
        return 'sylius_grid_filter_array_search';
    }
}
