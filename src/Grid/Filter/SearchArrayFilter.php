<?php
declare(strict_types=1);

namespace App\Grid\Filter;

use Sylius\Component\Grid\Data\DataSourceInterface;
use Sylius\Component\Grid\Data\ExpressionBuilderInterface;
use Sylius\Component\Grid\Filtering\FilterInterface;

/**
 * Class SearchArrayFilter
 * @package App\Grid\Filter
 *
 * @author  Philippe Vesin <pve.asdoria@gmail.com>
 */
class SearchArrayFilter implements FilterInterface
{
    const ATTRIBUTES_PREFIX = 'attributes.';

    /**
     * @param DataSourceInterface $dataSource
     * @param string              $name
     * @param mixed               $data
     * @param array               $options
     */
    public function apply(DataSourceInterface $dataSource, string $name, $data, array $options): void
    {
        if (empty($data) || !is_string($data)) {
            return;
        }

        $separator = $options['separator'] ?? ',';
        $fields    = $options['fields'] ?? $name;

        $values = explode($separator, $data);

        $expressionBuilder = $dataSource->getExpressionBuilder();

        $expressionsBase = [];

        foreach ($values as $value) {
            $expressions = [];

            foreach ($fields as $field) {
                $expression = $expressionBuilder->like($field, '%' . $value . '%');

                if ($this->isAttributeField($field)) {
                    $expression = $expressionBuilder->andX(
                        $expression,
                        $this->getFilterableAttributeExpression($expressionBuilder)
                    );
                }

                $expressions[] = $expression;
            }

            $expressionsBase[] = $expressionBuilder->orX(...$expressions);
        }

        $dataSource->restrict($expressionBuilder->andX(...$expressionsBase));
    }

    /**
     * @param $field
     *
     * @return bool
     */
    protected function isAttributeField($field): bool
    {
        return strpos($field, self::ATTRIBUTES_PREFIX) === 0;
    }

    /**
     * @param ExpressionBuilderInterface $expressionBuilder
     *
     * @return mixed
     */
    protected function getFilterableAttributeExpression(ExpressionBuilderInterface $expressionBuilder)
    {
        return $expressionBuilder->equals('attributes.attribute.filterable', true);
    }
}
